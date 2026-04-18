import { interpolate, spring, useCurrentFrame } from "remotion";

export const ParticleBurst: React.FC = () => {
  const frame = useCurrentFrame();
  const n = 28;
  const coreScale = spring({
    frame,
    fps: 30,
    config: { damping: 8, stiffness: 180 },
  });

  return (
    <div style={{ position: "relative", width: 700, height: 700 }}>
      {Array.from({ length: n }).map((_, i) => {
        const angle = (i / n) * Math.PI * 2;
        const distance =
          spring({
            frame: frame - 2,
            fps: 30,
            config: { damping: 11, stiffness: 70 },
          }) * 300;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        const opacity = interpolate(frame, [0, 10, 70, 90], [0, 1, 1, 0], {
          extrapolateRight: "clamp",
        });
        const hue = (i / n) * 280 + 200;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: `hsl(${hue}, 85%, 65%)`,
              boxShadow: `0 0 22px hsl(${hue}, 85%, 65%)`,
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              opacity,
            }}
          />
        );
      })}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 70,
          height: 70,
          marginLeft: -35,
          marginTop: -35,
          borderRadius: "50%",
          background: "white",
          boxShadow: "0 0 80px white, 0 0 140px #e0af40",
          transform: `scale(${coreScale})`,
        }}
      />
    </div>
  );
};
