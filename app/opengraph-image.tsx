import { ImageResponse } from "next/og";

export const alt = "Vinoth Kumar S — DevOps Engineer | AWS · Docker · Kubernetes · CI/CD";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const tags = ["AWS", "Docker", "Kubernetes", "CI/CD", "Observability", "DevSecOps"];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#09090b",
          padding: "72px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -180,
            left: 240,
            width: 700,
            height: 400,
            borderRadius: "50%",
            background: "rgba(34,211,238,0.10)",
            filter: "blur(90px)",
            display: "flex",
          }}
        />

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 68,
              height: 68,
              borderRadius: 16,
              border: "1px solid rgba(34,211,238,0.35)",
              background: "linear-gradient(135deg, rgba(34,211,238,0.15), rgba(52,211,153,0.15))",
              color: "#67e8f9",
              fontSize: 28,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            VK
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#fafafa", fontSize: 26, fontWeight: 600 }}>
              Vinoth Kumar S
            </span>
            <span style={{ color: "#22d3ee", fontSize: 20 }}>DevOps Engineer</span>
          </div>
        </div>

        {/* Middle */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#71717a", fontSize: 24, fontFamily: "monospace" }}>
            $ whoami — infrastructure · automation · reliability
          </div>
          <div style={{ marginTop: 16, color: "#fafafa", fontSize: 76, fontWeight: 700 }}>
            DevOps Engineer
          </div>
          <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 12 }}>
            {tags.map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  padding: "8px 20px",
                  borderRadius: 10,
                  border: "1px solid #27272a",
                  background: "rgba(255,255,255,0.03)",
                  color: "#d4d4d8",
                  fontSize: 22,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 44, height: 3, background: "#22d3ee", borderRadius: 2 }} />
          <span style={{ color: "#a1a1aa", fontSize: 22 }}>
            Cloud Infrastructure · CI/CD · Observability · DevSecOps
          </span>
        </div>
      </div>
    ),
    size,
  );
}
