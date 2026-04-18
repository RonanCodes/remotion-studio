import { interpolate, useCurrentFrame } from "remotion";

const dot = (c: string): React.CSSProperties => ({
  width: 14,
  height: 14,
  borderRadius: 7,
  background: c,
});

export const SlantedTerminal: React.FC = () => {
  const frame = useCurrentFrame();
  const text =
    "$ npx remotion render\nBundling code  [████████] 100%\nRendering     [████████] 100%\n✓ Done in 12s";
  const chars = Math.floor(
    interpolate(frame, [0, 70], [0, text.length], {
      extrapolateRight: "clamp",
    }),
  );
  const displayed = text.slice(0, chars);
  const cursor = frame % 30 < 20 ? "▌" : " ";

  return (
    <div style={{ perspective: "1600px" }}>
      <div
        style={{
          width: 820,
          height: 500,
          background: "#161625",
          border: "1px solid #3a3a5e",
          borderRadius: 16,
          transform: "rotateX(18deg) rotateY(-12deg) rotateZ(2deg)",
          boxShadow:
            "0 40px 100px rgba(91,188,214,0.3), 0 10px 40px rgba(0,0,0,0.8)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: 46,
            background: "#1f1f35",
            display: "flex",
            alignItems: "center",
            padding: "0 18px",
            gap: 10,
          }}
        >
          <div style={dot("#ff5f56")} />
          <div style={dot("#ffbd2e")} />
          <div style={dot("#27c93f")} />
        </div>
        <div
          style={{
            padding: 32,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 24,
            color: "#7dcea0",
            whiteSpace: "pre-wrap",
            lineHeight: 1.5,
          }}
        >
          {displayed}
          {cursor}
        </div>
      </div>
    </div>
  );
};
