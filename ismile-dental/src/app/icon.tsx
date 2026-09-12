import { ImageResponse } from "next/og";

// Generated from JSX rather than shipped as a binary PNG — no image asset to
// corrupt or lose in a deploy, and no placeholder artwork pretending to be a
// real logo.

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
          background: "#0c3236",
          borderRadius: 40,
        }}
      >
        <span
          style={{
            fontSize: 116,
            fontWeight: 800,
            color: "#4fb3ba",
            fontFamily: "Arial, Helvetica, sans-serif",
            letterSpacing: -4,
          }}
        >
          iS
        </span>
      </div>
    ),
    { ...size }
  );
}
