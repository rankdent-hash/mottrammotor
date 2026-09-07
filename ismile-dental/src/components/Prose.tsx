import { Fragment } from "react";
import Placeholder from "@/components/Placeholder";
import { isPlaceholder, type Prose as ProseData } from "@/lib/content/types";

/**
 * Renders one run of copy that may be interrupted by a placeholder mid-
 * sentence — which is common, because most gaps in this pack sit inside a
 * sentence rather than replacing a whole paragraph.
 *
 * Bold runs are written in the copy as **markers**; they carry real emphasis
 * (the phone number, a town name) so they are honoured rather than stripped.
 */
export default function Prose({ parts }: { parts: ProseData }) {
  return (
    <>
      {parts.map((part, i) =>
        isPlaceholder(part) ? (
          <Placeholder key={i} data={part} />
        ) : (
          <Fragment key={i}>{emphasise(part)}</Fragment>
        )
      )}
    </>
  );
}

function emphasise(text: string) {
  const segments = text.split(/(\*\*[^*]+\*\*)/g);
  return segments.map((segment, i) =>
    segment.startsWith("**") && segment.endsWith("**") ? (
      <strong key={i} className="font-semibold">
        {segment.slice(2, -2)}
      </strong>
    ) : (
      <Fragment key={i}>{segment}</Fragment>
    )
  );
}
