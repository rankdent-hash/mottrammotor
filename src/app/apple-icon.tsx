import { ImageResponse } from "next/og";

// Code-generated Apple touch icon — see icon.tsx for why this is generated
// from JSX rather than shipped as a static binary PNG.

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
        }}
      >
        <span
          style={{
            fontSize: 114,
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
