import { useCurrentFrame } from "remotion";

export const ParallaxDepth: React.FC = () => {
  const frame = useCurrentFrame();

  const star = (
    depth: number,
    seedX: number,
    seedY: number,
    glyph: string,
  ) => {
    const baseX = (seedX * 71) % 1080;
    const x = ((baseX + frame * depth * 4) % 1200) - 60;
    const y = (seedY * 53) % 900;
    const size = 20 + depth * 70;
    return (
      <div
        key={`${seedX}-${seedY}-${glyph}`}
        style={{
          position: "absolute",
          left: x,
          top: y,
          fontSize: size,
          color: `hsl(${200 + depth * 60}, 70%, ${50 + depth * 20}%)`,
          opacity: 0.2 + depth * 0.6,
          filter: `blur(${(1 - depth) * 3}px)`,
        }}
      >
        {glyph}
      </div>
    );
  };

  return (
    <div
      style={{
        position: "relative",
        width: 900,
        height: 900,
        overflow: "hidden",
        borderRadius: 20,
        background: "radial-gradient(circle at 30% 30%, #1a1a3e, #050510)",
      }}
    >
      {Array.from({ length: 14 }).map((_, i) =>
        star(0.25, i * 37 + 7, i * 23 + 3, "◆"),
      )}
      {Array.from({ length: 8 }).map((_, i) =>
        star(0.55, i * 41 + 13, i * 29 + 11, "●"),
      )}
      {Array.from({ length: 4 }).map((_, i) =>
        star(1.0, i * 67 + 5, i * 19 + 1, "■"),
      )}
    </div>
  );
};
