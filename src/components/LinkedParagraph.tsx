import Link from "next/link";

/**
 * Renders a paragraph of plain text, and if it contains `anchor` verbatim,
 * wraps that phrase in a Link to `href`. Used to turn one natural sentence
 * in a blog post into a real in-content link to the related service page,
 * rather than only linking from a separate "related articles" box.
 */
export default function LinkedParagraph({
  text,
  anchor,
  href,
  applyLink,
}: {
  text: string;
  anchor: string;
  href: string;
  /** Whether this specific paragraph should have the anchor phrase linked. */
  applyLink: boolean;
}) {
  if (!applyLink) return <p>{text}</p>;

  const index = text.indexOf(anchor);
  if (index === -1) return <p>{text}</p>;

  const before = text.slice(0, index);
  const after = text.slice(index + anchor.length);

  return (
    <p>
      {before}
      <Link href={href} className="font-semibold text-teal-700 underline underline-offset-2 hover:text-teal-800">
        {anchor}
      </Link>
      {after}
    </p>
  );
}
