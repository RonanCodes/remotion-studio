import { useCurrentFrame } from "remotion";

type Props = {
  text?: string;
};

export const FilmGrain: React.FC<Props> = ({ text = "Cinematic" }) => {
  const frame = useCurrentFrame();
  const seed = frame % 12;
  const driftX = Math.sin(frame * 0.04) * 40;

  return (
    <div
      style={{
        position: "relative",
        width: 760,
        height: 760,
        overflow: "hidden",
        borderRadius: 24,
        background: `radial-gradient(circle at ${50 + driftX / 4}% 45%, #e0af40 0%, #8a1a4a 45%, #1a0a2e 100%)`,
        boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
      }}
    >
      <svg
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          inset: 0,
          mixBlendMode: "overlay",
          opacity: 0.9,
        }}
      >
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            seed={seed}
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 50%, transparent 25%, rgba(0,0,0,0.85) 95%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 50,
          left: 0,
          right: 0,
          textAlign: "center",
          color: "#ffffff",
          fontSize: 42,
          letterSpacing: 10,
          fontWeight: 300,
          textTransform: "uppercase",
        }}
      >
        {text}
      </div>
    </div>
  );
};
