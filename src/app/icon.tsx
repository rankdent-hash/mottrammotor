import { ImageResponse } from "next/og";

// Code-generated app icon (App Router `icon` metadata convention).
//
// Deliberately generated from JSX/CSS at build time rather than shipped as a
// static binary PNG: a hand-authored binary icon.png repeatedly failed to
// survive Vercel's file-upload deploy path ("unable to decode image data" /
// truncated file), even though the source file itself was verified correct.
// Generating the icon from code removes that entire class of failure — there
// is no binary asset to transcribe or transfer, just source text.

export const size = { width: 192, height: 192 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a1b30",
          borderRadius: 40,
        }}
      >
        <span
          style={{
            fontSize: 122,
            fontWeight: 800,
            color: "#f5991e",
            fontFamily: "Arial, Helvetica, sans-serif",
            letterSpacing: -2,
          }}
        >
          M
        </span>
      </div>
    ),
    { ...size }
  );
}
