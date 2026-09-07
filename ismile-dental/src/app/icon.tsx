import { ImageResponse } from "next/og";

// Code-generated app icon (App Router `icon` metadata convention). Generated
// from JSX rather than shipped as a binary PNG so there is no image asset to
// transcribe, corrupt or lose in a deploy — the same reason the wordmark in
// components/Logo.tsx is inline SVG.

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
          background: "#06282d",
          borderRadius: 40,
        }}
      >
        <span
          style={{
            fontSize: 118,
            fontWeight: 800,
            color: "#35a8b2",
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
