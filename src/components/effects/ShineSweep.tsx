import { interpolate, useCurrentFrame } from "remotion";

type Props = {
  text?: string;
};

export const ShineSweep: React.FC<Props> = ({ text = "SHINE" }) => {
  const frame = useCurrentFrame();
  const pos = interpolate(frame, [0, 70], [-30, 130], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        fontSize: 220,
        fontWeight: 900,
        letterSpacing: -8,
        background: `linear-gradient(100deg, #2d4a5a 0%, #2d4a5a ${pos - 10}%, #ffffff ${pos}%, #2d4a5a ${pos + 10}%, #2d4a5a 100%)`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
      }}
    >
      {text}
    </div>
  );
};
