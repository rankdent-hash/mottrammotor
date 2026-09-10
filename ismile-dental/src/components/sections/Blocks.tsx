import Link from "next/link";
import { Navigation } from "lucide-react";
import Prose from "@/components/Prose";
import Placeholder from "@/components/Placeholder";
import { practice } from "@/lib/practice";
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
          case "address":
            return (
              <address
                key={i}
                className="not-italic rounded-lg bg-ink-50 p-4 text-base leading-relaxed text-ink-900"
              >
                <span className="font-semibold">{practice.name}</span>
                <br />
                {practice.address.building}
                <br />
                {practice.address.street}
                <br />
                {practice.address.locality}
                <br />
                {practice.address.region} {practice.address.postcode}
              </address>
            );
          case "map":
            return <MapEmbed key={i} />;
        }
      })}
    </div>
  );
}

/**
 * A no-API-key Google Maps embed, centred on the practice's own address —
 * the same string as everywhere else on the site, so the pin can never
 * silently drift from the Google Business Profile. "Get directions" opens
 * the user's own maps app/tab rather than navigating them away from the
 * site they're already reading.
 */
function MapEmbed() {
  const query = encodeURIComponent(practice.addressLine);
  return (
    <div className="overflow-hidden rounded-xl border border-ink-100">
      <iframe
        title={`Map showing ${practice.name}`}
        src={`https://www.google.com/maps?q=${query}&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-80 w-full sm:h-96"
      />
      <div className="flex items-center justify-between gap-3 bg-white p-4">
        <p className="text-sm text-ink-700">{practice.addressLine}</p>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${query}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-clay-600 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-clay-700"
        >
          <Navigation className="h-4 w-4" aria-hidden="true" />
          Get directions
        </a>
      </div>
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
    <section id={id} className={`scroll-mt-20 lg:scroll-mt-32 ${bg}`}>
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
