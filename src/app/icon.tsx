import { ImageResponse } from "next/og";

/**
 * Dynamic favicon (192x192 / 512x512 PNG).
 * Generates /icon at build/runtime, used by metadata.icons and the manifest.
 * Dark background + gold "B" monogram matching the brand.
 */
export const size = { width: 512, height: 512 };
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
          background: "#0a0a0a",
          fontSize: 360,
          fontWeight: 700,
          color: "#c9a96e",
          letterSpacing: "-0.05em",
          fontFamily: "serif",
        }}
      >
        B
      </div>
    ),
    size
  );
}
