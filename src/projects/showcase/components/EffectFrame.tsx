import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";

type Props = {
  title: string;
  codeSnippet: string;
  index: number;
  total: number;
  children: React.ReactNode;
};

export const EffectFrame: React.FC<Props> = ({
  title,
  codeSnippet,
  index,
  total,
  children,
}) => {
  const frame = useCurrentFrame();

  const titleSpring = spring({
    frame,
    fps: 30,
    config: { damping: 15, stiffness: 180 },
  });
  const titleY = interpolate(titleSpring, [0, 1], [40, 0]);
  const titleOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });

  const codeOpacity = interpolate(frame, [14, 24], [0, 1], {
    extrapolateRight: "clamp",
  });
  const codeY = interpolate(frame, [14, 24], [30, 0], {
    extrapolateRight: "clamp",
  });

  const barProgress = index / total;

  return (
    <AbsoluteFill
      style={{
        background: "#0a0a14",
        color: "#e0e0e0",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Top progress bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          background: "#1a1a2e",
        }}
      >
        <div
          style={{
            width: `${barProgress * 100}%`,
            height: "100%",
            background: "linear-gradient(90deg, #5bbcd6, #7dcea0)",
          }}
        />
      </div>

      {/* Counter pill */}
      <div
        style={{
          position: "absolute",
          top: 36,
          right: 60,
          fontSize: 28,
          color: "#6a6a8a",
          fontFamily: "monospace",
          letterSpacing: 2,
        }}
      >
        {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>

      {/* Title block */}
      <div
        style={{
          position: "absolute",
          top: 120,
          left: 60,
          right: 60,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div
          style={{
            fontSize: 30,
            color: "#5bbcd6",
            letterSpacing: 8,
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          Effect · {String(index).padStart(2, "0")}
        </div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 900,
            marginTop: 14,
            lineHeight: 1,
            color: "#ffffff",
            letterSpacing: -3,
          }}
        >
          {title}
        </div>
      </div>

      {/* Demo area */}
      <div
        style={{
          position: "absolute",
          top: 380,
          bottom: 520,
          left: 60,
          right: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </div>

      {/* Code snippet */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: 60,
          right: 60,
          opacity: codeOpacity,
          transform: `translateY(${codeY}px)`,
        }}
      >
        <div
          style={{
            fontSize: 18,
            color: "#6a6a8a",
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 16,
            fontWeight: 600,
          }}
        >
          Code
        </div>
        <div
          style={{
            background: "#0e0e1c",
            border: "1px solid #22223a",
            borderRadius: 16,
            padding: 32,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            fontSize: 28,
            lineHeight: 1.5,
            color: "#cfcfe4",
            whiteSpace: "pre",
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
          }}
        >
          {codeSnippet}
        </div>
      </div>
    </AbsoluteFill>
  );
};
