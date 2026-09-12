// Shared source scanner for the compliance guards.
//
// Two things make this less noisy than a plain grep:
//
//  1. Comments are stripped before matching. A guard's job is to police text
//     that ships. A comment explaining *why* a claim was dropped necessarily
//     quotes the claim, and flagging that would train everyone to ignore the
//     guard — which is how a real breach gets through.
//  2. An `allow-<rule id>` comment on a line is an explicit, reviewed
//     exemption. Checked before comments are stripped, so the marker survives.
import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const SCAN_DIRS = ["src"];
const SKIP = new Set(["node_modules", ".next", ".git"]);

export async function sourceFiles() {
  const out = [];
  for (const dir of SCAN_DIRS) await walk(join(ROOT, dir), out);
  return out.sort();
}

async function walk(dir, out) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    if (SKIP.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, out);
    else if (/\.(ts|tsx|css)$/.test(entry.name)) out.push(full);
  }
}

/**
 * Strips comments line by line, tracking block-comment state across lines.
 * `//` inside a URL (`https://`) is not a comment.
 */
function stripComments(lines) {
  let inBlock = false;
  return lines.map((line) => {
    let out = "";
    let i = 0;
    while (i < line.length) {
      if (inBlock) {
        const end = line.indexOf("*/", i);
        if (end === -1) return out;
        inBlock = false;
        i = end + 2;
        continue;
      }
      if (line.startsWith("/*", i)) {
        inBlock = true;
        i += 2;
        continue;
      }
      if (line.startsWith("//", i) && line[i - 1] !== ":") return out;
      out += line[i];
      i += 1;
    }
    return out;
  });
}

export async function scan(rules) {
  const hits = [];

  for (const file of await sourceFiles()) {
    const rel = relative(ROOT, file);
    const raw = (await readFile(file, "utf8")).split("\n");
    const code = stripComments(raw);

    code.forEach((line, i) => {
      if (!line.trim()) return;
      for (const rule of rules) {
        // Exemption markers live in the comment, so check the raw line.
        if (raw[i].includes(`allow-${rule.id}`)) continue;

        const matched = rule.test ? rule.test(line) : rule.pattern.test(line);
        if (rule.pattern) rule.pattern.lastIndex = 0;
        if (matched) hits.push({ file: rel, line: i + 1, rule, text: raw[i].trim() });
      }
    });
  }
  return hits;
}

export function report(title, hits, guidance) {
  if (hits.length === 0) {
    console.log(`✓ ${title}: clean`);
    return 0;
  }
  console.error(`\n✗ ${title}: ${hits.length} problem(s)\n`);
  const byRule = new Map();
  for (const hit of hits) {
    if (!byRule.has(hit.rule.id)) byRule.set(hit.rule.id, []);
    byRule.get(hit.rule.id).push(hit);
  }
  for (const [id, group] of byRule) {
    console.error(`  ${id} — ${group[0].rule.why}`);
    for (const hit of group) {
      const text = hit.text.length > 100 ? hit.text.slice(0, 97) + "…" : hit.text;
      console.error(`    ${hit.file}:${hit.line}  ${text}`);
    }
    console.error("");
  }
  if (guidance) console.error(guidance);
  return 1;
}
