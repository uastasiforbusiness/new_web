import { ImageResponse } from "next/og";

/**
 * Apple touch icon (180x180 PNG). Served at /apple-icon.
 * Solid dark background, no transparency (iOS rounds corners itself).
 */
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
          background: "#0a0a0a",
          fontSize: 130,
          fontWeight: 700,
          color: "#c9a96e",
          fontFamily: "serif",
        }}
      >
        B
      </div>
    ),
    size
  );
}
