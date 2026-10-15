import { ImageResponse } from "next/og";
export const alt =
  "NEAT — Intelligent Design Systems. Design freely. Build intelligently.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 60,
          width: "100%",
          height: "100%",
          background: "#f0eee7",
          color: "#20211e",
          border: "1px solid #c9c7bd",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 24,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>ARCHITECTURAL INTELLIGENCE / 001</span>
          <span>NEAT.</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 94,
            lineHeight: 1,
            letterSpacing: -5,
          }}
        >
          DESIGN FREELY.
          <br />
          BUILD INTELLIGENTLY.
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
          }}
        >
          <span>INTELLIGENT DESIGN SYSTEMS</span>
          <span style={{ color: "#b63c27" }}>YOUR DESIGN. YOUR CONTROL.</span>
        </div>
      </div>
    ),
    size,
  );
}
