import { useCurrentFrame } from "remotion";

type Props = {
  text?: string;
};

export const LiquidWave: React.FC<Props> = ({ text = "fluid" }) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        fontSize: 260,
        fontWeight: 900,
        display: "flex",
        letterSpacing: -8,
      }}
    >
      {text.split("").map((ch, i) => {
        const y = Math.sin(frame * 0.16 + i * 0.55) * 36;
        const hue = (180 + i * 25 + frame * 1.5) % 360;
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              transform: `translateY(${y}px)`,
              color: `hsl(${hue}, 75%, 65%)`,
              textShadow: `0 0 30px hsl(${hue}, 75%, 65%)`,
            }}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        );
      })}
    </div>
  );
};
