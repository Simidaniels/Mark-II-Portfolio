import { ImageResponse } from "next/og";

export const alt = "MARK II — Daniel Adepitan, Software Developer in Lagos, Nigeria";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Generated social card — void lab with orbital core and amber signal. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background:
            "radial-gradient(85% 90% at 72% 30%, rgba(245,197,24,0.16) 0%, rgba(6,7,10,0) 55%), #06070a",
          color: "#ece9e2",
          fontFamily: "monospace",
          overflow: "hidden",
        }}
      >
        {/* Orbital ornament */}
        <div
          style={{
            position: "absolute",
            right: 60,
            top: 130,
            width: 320,
            height: 320,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ width: 300, height: 96, border: "2px solid rgba(245,197,24,0.65)", borderRadius: "50%", transform: "rotate(-16deg)", display: "flex" }} />
          <div style={{ position: "absolute", width: 150, height: 150, border: "1.5px solid rgba(236,233,226,0.35)", transform: "rotate(45deg)", display: "flex" }} />
          <div style={{ position: "absolute", width: 70, height: 70, background: "#f5c518", borderRadius: 8, transform: "rotate(45deg)", display: "flex" }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", padding: "64px 72px", maxWidth: 760 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22, letterSpacing: 6, color: "#f5c518", textTransform: "uppercase" }}>
            <div style={{ width: 44, height: 2, background: "#f5c518", display: "flex" }} />
            MARK II — The Digital Laboratory
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 36,
              fontSize: 78,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -2,
              textTransform: "uppercase",
              fontFamily: "sans-serif",
            }}
          >
            <span>I build digital</span>
            <span style={{ color: "#f5c518" }}>experiences</span>
            <span style={{ color: "rgba(236,233,226,0.4)" }}>beyond the ordinary.</span>
          </div>
          <div style={{ marginTop: 40, fontSize: 21, letterSpacing: 3, color: "#b9bcc2", textTransform: "uppercase", display: "flex", gap: 28 }}>
            <span>Daniel Adepitan</span>
            <span style={{ color: "#f5c518" }}>·</span>
            <span>Software Developer</span>
            <span style={{ color: "#f5c518" }}>·</span>
            <span>Lagos, NG</span>
          </div>
        </div>
      </div>
    ),
    size
  );
}
