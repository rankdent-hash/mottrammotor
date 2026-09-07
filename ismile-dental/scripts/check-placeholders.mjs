#!/usr/bin/env node
// Lists every unresolved [PLACEHOLDER] and [BUILD] marker, grouped by file.
//
// This is a PRE-LAUNCH gate, not a build gate: markers are supposed to be
// visible during the build so the client can see exactly what is outstanding.
// The final checklist item in build-plan.md §5 is that none may ship visible.
import { readFile } from "node:fs/promises";
import { relative } from "node:path";
import { sourceFiles } from "./_scan.mjs";

const ROOT = new URL("..", import.meta.url).pathname;
const MARKER = /\[(PLACEHOLDER|BUILD|COMPLIANCE)(:|\s|\])/;

const found = [];
for (const file of await sourceFiles()) {
  const rel = relative(ROOT, file);
  if (rel.startsWith("scripts/")) continue;
  const lines = (await readFile(file, "utf8")).split("\n");
  lines.forEach((line, i) => {
    if (MARKER.test(line)) found.push({ rel, line: i + 1, text: line.trim() });
  });
}

if (found.length === 0) {
  console.log("✓ No unresolved placeholders. Ready for the rest of the pre-launch checklist.");
  process.exit(0);
}

const byFile = new Map();
for (const hit of found) {
  if (!byFile.has(hit.rel)) byFile.set(hit.rel, []);
  byFile.get(hit.rel).push(hit);
}

console.log(`${found.length} unresolved marker(s) across ${byFile.size} file(s).\n`);
for (const [file, hits] of [...byFile].sort()) {
  console.log(`  ${file}`);
  for (const hit of hits) {
    console.log(`    :${hit.line}  ${hit.text.slice(0, 120)}`);
  }
  console.log("");
}
console.log("These are deliberate. Do not fill them with plausible guesses —");
console.log("a visible gap is better than a wrong price or an invented opening time.");
console.log("The client-facing list of what is needed is in build-plan.md §3.");
process.exit(1);
