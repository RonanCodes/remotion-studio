import { useCurrentFrame } from "remotion";

type Props = {
  text?: string;
};

export const GlitchText: React.FC<Props> = ({ text = "BROKEN" }) => {
  const frame = useCurrentFrame();
  const redOffset = Math.sin(frame * 0.35) * 6;
  const cyanOffset = Math.cos(frame * 0.35) * 6;
  const glitchActive = Math.floor(frame / 8) % 5 === 0;
  const jitterX = glitchActive ? Math.round(Math.sin(frame * 9.1) * 18) : 0;

  const style = (color: string, dx: number, dy = 0): React.CSSProperties => ({
    position: "absolute",
    inset: 0,
    color,
    transform: `translate(${dx}px, ${dy}px)`,
    mixBlendMode: "screen",
  });

  return (
    <div
      style={{
        position: "relative",
        fontSize: 200,
        fontWeight: 900,
        letterSpacing: -6,
        width: 700,
        height: 220,
        transform: `translateX(${jitterX}px)`,
      }}
    >
      <div style={style("#ff2a6d", redOffset, 0)}>{text}</div>
      <div style={style("#2affe0", -cyanOffset, cyanOffset)}>{text}</div>
      <div style={{ position: "absolute", inset: 0, color: "#ffffff" }}>
        {text}
      </div>
    </div>
  );
};
