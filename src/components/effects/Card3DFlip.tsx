import { interpolate, spring, useCurrentFrame } from "remotion";

export const Card3DFlip: React.FC = () => {
  const frame = useCurrentFrame();
  const rotateY = interpolate(frame, [0, 70], [0, 360], {
    extrapolateRight: "clamp",
  });
  const lift = spring({
    frame,
    fps: 30,
    config: { damping: 14, stiffness: 90 },
  });

  return (
    <div style={{ perspective: 1400, width: 460, height: 640 }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transform: `translateY(${-30 * lift}px) rotateY(${rotateY}deg)`,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            background: "linear-gradient(135deg, #5bbcd6 0%, #7dcea0 100%)",
            borderRadius: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 180,
            fontWeight: 900,
            color: "white",
            boxShadow: "0 30px 80px rgba(91,188,214,0.5)",
          }}
        >
          ◆
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            background: "linear-gradient(135deg, #e0af40 0%, #ff2a6d 100%)",
            borderRadius: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 180,
            fontWeight: 900,
            color: "white",
            transform: "rotateY(180deg)",
            boxShadow: "0 30px 80px rgba(255,42,109,0.5)",
          }}
        >
          ●
        </div>
      </div>
    </div>
  );
};
