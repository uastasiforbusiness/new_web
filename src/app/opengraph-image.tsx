import { ImageResponse } from "next/og";
import { SITE } from "@/lib/seo";

/**
 * Dynamic OpenGraph / Twitter card image (1200x630).
 * Served at /opengraph-image and referenced from metadata.
 * Dark luxury background with gold accent — no external assets needed.
 */
export const alt = "B LEADER — Luxury Car & Yacht Rental in Puglia, Italy";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 50% 40%, #1a1a1a 0%, #0a0a0a 70%)",
          position: "relative",
        }}
      >
        {/* Top kicker */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 30,
            fontSize: 22,
            letterSpacing: 12,
            color: "#c9a96e",
            textTransform: "uppercase",
          }}
        >
          <span style={{ display: "flex" }}>✦</span>
          <span style={{ display: "flex" }}>Experience Luxury</span>
          <span style={{ display: "flex" }}>✦</span>
        </div>

        {/* Brand */}
        <div
          style={{
            display: "flex",
            fontSize: 150,
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: -4,
            marginBottom: 24,
            fontFamily: "serif",
          }}
        >
          {SITE.name}
        </div>

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            fontSize: 40,
            color: "#c9a96e",
            fontStyle: "italic",
            marginBottom: 40,
            fontFamily: "serif",
          }}
        >
          Luxury Car &amp; Yacht Rental in Puglia
        </div>

        {/* Bottom keywords bar */}
        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#888888",
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          Ferrari · Maserati · Mercedes · Yacht Charter
        </div>

        {/* Gold frame */}
        <div
          style={{
            position: "absolute",
            inset: 30,
            border: "1px solid rgba(201,169,110,0.3)",
            display: "flex",
            borderRadius: 4,
          }}
        />
      </div>
    ),
    size
  );
}
