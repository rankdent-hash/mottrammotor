import Link from "next/link";
import Prose from "@/components/Prose";
import Placeholder from "@/components/Placeholder";
import {
  isPlaceholder,
  type ExplainerBlock,
  type Table as TableData,
} from "@/lib/content/types";

/**
 * The free-form block renderer shared by the explainer, comparison and risk
 * sections. Keeping one implementation means a heading level or a table style
 * is fixed once for all 22 pages.
 */
export function Blocks({ blocks }: { blocks: ExplainerBlock[] }) {
  return (
    <div className="prose-body max-w-3xl space-y-5 text-ink-800">
      {blocks.map((block, i) => {
        switch (block.kind) {
          case "h3":
            return (
              <h3 key={i} className="pt-3 text-xl font-semibold text-ink-900">
                {block.text}
              </h3>
            );
          case "definition":
            // The sentence an AI answer engine will lift. Given weight so a
            // reader scanning the page finds it too.
            return (
              <p
                key={i}
                className="border-l-4 border-ink-400 bg-ink-50 py-3 pl-4 pr-4 text-lg font-medium text-ink-900"
              >
                {block.text}
              </p>
            );
          case "p":
            return (
              <p key={i}>
                <Prose parts={block.text} />
              </p>
            );
          case "note":
            return (
              <p key={i} className="rounded-lg bg-sand-100 p-4 text-sm text-ink-800">
                <Prose parts={block.text} />
              </p>
            );
          case "list":
            return (
              <ul key={i} className="space-y-2.5">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3">
                    <span
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-400"
                      aria-hidden="true"
                    />
                    <span>
                      <Prose parts={item} />
                    </span>
                  </li>
                ))}
              </ul>
            );
          case "table":
            return <Table key={i} table={block.table} />;
          case "link":
            return (
              <p key={i}>
                <Link
                  href={block.link.href}
                  className="font-semibold text-ink-700 underline underline-offset-4 hover:text-clay-700"
                >
                  {block.link.label}
                </Link>
              </p>
            );
        }
      })}
    </div>
  );
}

/** Tables carry cost and comparison data, so they must scroll rather than squash. */
export function Table({ table }: { table: TableData }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-ink-100">
      <table className="w-full min-w-[30rem] text-left text-sm">
        <thead className="border-b border-ink-100 bg-ink-50">
          <tr>
            {table.headers.map((header) => (
              <th key={header} scope="col" className="px-5 py-3 font-semibold text-ink-900">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-100 bg-white">
          {table.rows.map((row, i) => (
            <tr key={i}>
              {row.cells.map((cell, j) =>
                j === 0 ? (
                  <th key={j} scope="row" className="px-5 py-3 font-medium text-ink-900">
                    {isPlaceholder(cell) ? <Placeholder data={cell} /> : cell}
                  </th>
                ) : (
                  <td key={j} className="px-5 py-3 text-ink-800">
                    {isPlaceholder(cell) ? <Placeholder data={cell} /> : cell}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Consistent section shell: heading, optional tint, consistent rhythm. */
export function SectionShell({
  h2,
  tint,
  children,
  id,
}: {
  h2?: string;
  tint?: "sand" | "ink" | "dark";
  children: React.ReactNode;
  id?: string;
}) {
  const bg =
    tint === "sand"
      ? "bg-sand-50 border-y border-sand-200"
      : tint === "ink"
        ? "bg-ink-50 border-y border-ink-100"
        : tint === "dark"
          ? "bg-ink-900 text-white"
          : "";

  return (
    <section id={id} className={bg}>
      <div className="container-page py-14 sm:py-18">
        {h2 && (
          <h2
            className={`max-w-3xl text-2xl font-bold tracking-tight sm:text-3xl ${
              tint === "dark" ? "text-white" : "text-ink-900"
            }`}
          >
            {h2}
          </h2>
        )}
        <div className={h2 ? "mt-7" : ""}>{children}</div>
      </div>
    </section>
  );
}
