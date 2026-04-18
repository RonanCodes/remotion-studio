import { interpolate, useCurrentFrame } from "remotion";

type Props = {
  text?: string;
};

export const SVGTurbulence: React.FC<Props> = ({ text = "WARP" }) => {
  const frame = useCurrentFrame();
  const seed = Math.floor(frame / 2);
  const scale = interpolate(frame, [0, 40, 70], [0, 90, 110], {
    extrapolateRight: "clamp",
  });

  return (
    <svg width={700} height={500} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="warpFilter" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.025"
            numOctaves="2"
            seed={seed}
          />
          <feDisplacementMap in="SourceGraphic" scale={scale} />
        </filter>
        <linearGradient id="warpFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e0af40" />
          <stop offset="100%" stopColor="#ff2a6d" />
        </linearGradient>
      </defs>
      <text
        x="350"
        y="310"
        fontFamily="Inter, sans-serif"
        fontSize="220"
        fontWeight="900"
        fill="url(#warpFill)"
        textAnchor="middle"
        filter="url(#warpFilter)"
      >
        {text}
      </text>
    </svg>
  );
};
