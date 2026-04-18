import { spring, useCurrentFrame } from "remotion";

type Props = {
  target?: number;
  label?: string;
};

export const SpringCounter: React.FC<Props> = ({
  target = 99999,
  label = "Users Online",
}) => {
  const frame = useCurrentFrame();
  const progress = spring({
    frame,
    fps: 30,
    config: { damping: 18, stiffness: 90 },
    durationInFrames: 50,
  });
  const value = Math.floor(progress * target);

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontSize: 260,
          fontWeight: 900,
          fontFamily: "'JetBrains Mono', monospace",
          color: "#7dcea0",
          letterSpacing: -4,
          textShadow:
            "0 0 40px rgba(125,206,160,0.6), 0 0 100px rgba(125,206,160,0.3)",
          lineHeight: 1,
        }}
      >
        {value.toLocaleString()}
      </div>
      <div
        style={{
          marginTop: 30,
          fontSize: 40,
          color: "#6a6a8a",
          letterSpacing: 8,
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
    </div>
  );
};
