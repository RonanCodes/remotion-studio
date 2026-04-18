import { useCurrentFrame } from "remotion";

export const ChromaticAberration: React.FC = () => {
  const frame = useCurrentFrame();
  const offset = Math.sin(frame * 0.12) * 12;
  const rotate = frame * 1.5;

  const orb = (color: string, dx: number, dy: number): React.CSSProperties => ({
    position: "absolute",
    left: "50%",
    top: "50%",
    width: 440,
    height: 440,
    marginLeft: -220,
    marginTop: -220,
    borderRadius: "50%",
    background: color,
    mixBlendMode: "screen",
    transform: `translate(${dx}px, ${dy}px) rotate(${rotate}deg)`,
    filter: "blur(2px)",
  });

  return (
    <div style={{ position: "relative", width: 620, height: 620 }}>
      <div style={orb("#ff0044", -offset, 0)} />
      <div style={orb("#44ff88", offset * 0.8, offset)} />
      <div style={orb("#0088ff", offset, -offset * 0.6)} />
    </div>
  );
};
