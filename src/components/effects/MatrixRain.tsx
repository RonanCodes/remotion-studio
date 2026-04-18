import { useCurrentFrame } from "remotion";

export const MatrixRain: React.FC = () => {
  const frame = useCurrentFrame();
  const chars = "01{}[]();<>ABCXYZλΣΦΨΩ▓▒░";
  const cols = 22;

  return (
    <div
      style={{
        position: "relative",
        width: 820,
        height: 900,
        overflow: "hidden",
        background: "#050512",
        border: "1px solid #1a1a2e",
        borderRadius: 12,
      }}
    >
      {Array.from({ length: cols }).map((_, col) => {
        const speed = 0.6 + ((col * 71) % 100) / 100;
        const stagger = (col * 47) % 100;
        const y = ((frame * speed + stagger) % 140) - 20;
        const column = Array.from({ length: 18 })
          .map((_, i) => chars[(frame + col * 11 + i * 3) % chars.length])
          .join("\n");
        return (
          <div
            key={col}
            style={{
              position: "absolute",
              left: `${(col / cols) * 100}%`,
              top: `${y}%`,
              fontFamily: "monospace",
              fontSize: 26,
              lineHeight: 1.3,
              whiteSpace: "pre",
              color: "#7dcea0",
              textShadow: "0 0 10px rgba(125,206,160,0.9), 0 0 2px #ffffff",
            }}
          >
            {column}
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(125,206,160,0.15), transparent 60%)",
        }}
      />
    </div>
  );
};
