// src/app/(marketing)/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Acuarius Optical";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b1220",
          color: "#ffffff",
          fontSize: 64,
          fontWeight: 700,
          letterSpacing: -1,
        }}
      >
        Acuarius Optical
      </div>
    ),
    size
  );
}
