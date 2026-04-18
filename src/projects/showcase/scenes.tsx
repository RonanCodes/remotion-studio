import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
} from "remotion";

import {
  SlantedTerminal,
  GlitchText,
  MatrixRain,
  ParticleBurst,
  Card3DFlip,
  LiquidWave,
  ShineSweep,
  ChromaticAberration,
  ParallaxDepth,
  SpringCounter,
  SVGTurbulence,
  FilmGrain,
} from "../../components/effects";

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const titleSpring = spring({
    frame,
    fps: 30,
    config: { damping: 14, stiffness: 110 },
  });
  const titleY = interpolate(titleSpring, [0, 1], [120, 0]);
  const kickerOpacity = interpolate(frame, [4, 18], [0, 1], {
    extrapolateRight: "clamp",
  });
  const barScale = spring({
    frame: frame - 12,
    fps: 30,
    config: { damping: 10, stiffness: 200 },
  });
  const subOpacity = interpolate(frame, [28, 44], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "#0a0a14",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontSize: 42,
            color: "#5bbcd6",
            letterSpacing: 12,
            textTransform: "uppercase",
            fontWeight: 600,
            opacity: kickerOpacity,
          }}
        >
          Remotion
        </div>
        <div
          style={{
            fontSize: 180,
            fontWeight: 900,
            letterSpacing: -8,
            lineHeight: 0.95,
            color: "white",
            marginTop: 24,
            transform: `translateY(${titleY}px)`,
          }}
        >
          EFFECTS
          <br />
          REEL
        </div>
      </div>
      <div
        style={{
          marginTop: 64,
          width: 280 * barScale,
          height: 6,
          background: "linear-gradient(90deg, #e0af40, #ff2a6d)",
          borderRadius: 3,
        }}
      />
      <div
        style={{
          marginTop: 48,
          fontSize: 36,
          color: "#8a8a9e",
          textAlign: "center",
          opacity: subOpacity,
          letterSpacing: 2,
        }}
      >
        12 techniques · 35 seconds · pure React
      </div>
    </AbsoluteFill>
  );
};

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = Math.sin(frame * 0.12) * 0.04 + 1;
  const logoSpring = spring({
    frame,
    fps: 30,
    config: { damping: 12, stiffness: 120 },
  });
  const logoScale = interpolate(logoSpring, [0, 1], [0.6, 1]);
  const showLine = interpolate(frame, [22, 38], [0, 1], {
    extrapolateRight: "clamp",
  });
  const showUrl = interpolate(frame, [36, 56], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "#0a0a14",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <div
        style={{
          fontSize: 46,
          color: "#8a8a9e",
          letterSpacing: 8,
          fontWeight: 500,
          textAlign: "center",
          textTransform: "uppercase",
          opacity: showLine,
        }}
      >
        Built with
      </div>
      <div
        style={{
          fontSize: 220,
          fontWeight: 900,
          letterSpacing: -8,
          marginTop: 16,
          textAlign: "center",
          transform: `scale(${logoScale * pulse})`,
          background:
            "linear-gradient(135deg, #5bbcd6 0%, #e0af40 50%, #ff2a6d 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          lineHeight: 1,
        }}
      >
        Remotion
      </div>
      <div
        style={{
          marginTop: 100,
          fontSize: 34,
          fontFamily: "'JetBrains Mono', monospace",
          color: "#7dcea0",
          opacity: showUrl,
          textAlign: "center",
        }}
      >
        github.com/RonanCodes/remotion-studio
      </div>
      <div
        style={{
          marginTop: 16,
          fontSize: 24,
          color: "#6a6a8a",
          opacity: showUrl,
          textAlign: "center",
          letterSpacing: 4,
        }}
      >
        Clone · Study · Remix
      </div>
    </AbsoluteFill>
  );
};

export const IntroV2: React.FC = () => {
  const frame = useCurrentFrame();
  const scale = spring({
    frame,
    fps: 30,
    config: { damping: 18, stiffness: 120, overshootClamping: true },
    durationInFrames: 40,
  });
  const titleOpacity = interpolate(frame, [0, 14], [0, 1], {
    extrapolateRight: "clamp",
  });
  const subOpacity = interpolate(frame, [24, 44], [0, 1], {
    extrapolateRight: "clamp",
  });
  const barWidth = interpolate(frame, [20, 50], [0, 260], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "#0a0a14",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <div
        style={{
          fontSize: 180,
          fontWeight: 900,
          letterSpacing: -8,
          lineHeight: 0.95,
          color: "white",
          textAlign: "center",
          transform: `scale(${0.85 + scale * 0.15})`,
          opacity: titleOpacity,
        }}
      >
        EFFECTS
        <br />
        REEL
      </div>
      <div
        style={{
          marginTop: 48,
          width: barWidth,
          height: 6,
          background: "linear-gradient(90deg, #e0af40, #ff2a6d)",
          borderRadius: 3,
        }}
      />
      <div
        style={{
          marginTop: 40,
          fontSize: 34,
          color: "#8a8a9e",
          textAlign: "center",
          opacity: subOpacity,
          letterSpacing: 2,
        }}
      >
        12 techniques · pure React
      </div>
    </AbsoluteFill>
  );
};

export const OutroV2: React.FC = () => {
  const frame = useCurrentFrame();
  const logoScale = spring({
    frame,
    fps: 30,
    config: { damping: 14, stiffness: 120, overshootClamping: true },
    durationInFrames: 30,
  });
  const showLine = interpolate(frame, [14, 26], [0, 1], {
    extrapolateRight: "clamp",
  });
  const showUrl = interpolate(frame, [28, 44], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "#0a0a14",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <div
        style={{
          fontSize: 46,
          color: "#8a8a9e",
          letterSpacing: 8,
          fontWeight: 500,
          textAlign: "center",
          textTransform: "uppercase",
          opacity: showLine,
        }}
      >
        Built with
      </div>
      <div
        style={{
          fontSize: 220,
          fontWeight: 900,
          letterSpacing: -8,
          marginTop: 16,
          textAlign: "center",
          transform: `scale(${0.7 + logoScale * 0.3})`,
          background:
            "linear-gradient(135deg, #5bbcd6 0%, #e0af40 50%, #ff2a6d 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          lineHeight: 1,
        }}
      >
        Remotion
      </div>
      <div
        style={{
          marginTop: 80,
          fontSize: 32,
          fontFamily: "'JetBrains Mono', monospace",
          color: "#7dcea0",
          opacity: showUrl,
          textAlign: "center",
        }}
      >
        github.com/RonanCodes/remotion-studio
      </div>
    </AbsoluteFill>
  );
};

export type Effect = {
  title: string;
  code: string;
  Component: React.FC;
};

export const EFFECTS: Effect[] = [
  {
    title: "Slanted Terminal",
    code: `transform: perspective(1600px)
  rotateX(18deg) rotateY(-12deg);`,
    Component: SlantedTerminal,
  },
  {
    title: "Glitch Text",
    code: `// RGB split on sin/cos(frame)
color: #ff2a6d;  mix-blend-mode: screen;
transform: translate(\${offset}px, 0);`,
    Component: GlitchText,
  },
  {
    title: "Matrix Rain",
    code: `const y = (frame * speed + stagger)
  % containerHeight;`,
    Component: MatrixRain,
  },
  {
    title: "Particle Burst",
    code: `const d = spring({frame, fps}) * 300;
x = cos(i/n * TAU) * d;
y = sin(i/n * TAU) * d;`,
    Component: ParticleBurst,
  },
  {
    title: "3D Card Flip",
    code: `transform-style: preserve-3d;
transform: rotateY(\${frame * 6}deg);`,
    Component: Card3DFlip,
  },
  {
    title: "Liquid Wave",
    code: `transform: translateY(
  sin(frame * 0.16 + i * 0.55) * 36
);`,
    Component: LiquidWave,
  },
  {
    title: "Shine Sweep",
    code: `background: linear-gradient(100deg,
  base, base, #fff \${pos}%, base, base
);  // -webkit-background-clip: text`,
    Component: ShineSweep,
  },
  {
    title: "Chromatic Orbs",
    code: `mix-blend-mode: screen;
transform: translate(\${offset}px, 0)
  rotate(\${frame * 1.5}deg);`,
    Component: ChromaticAberration,
  },
  {
    title: "Parallax Depth",
    code: `const x = (seedX + frame * depth * 4)
  % (width + 120);
filter: blur(\${(1 - depth) * 3}px);`,
    Component: ParallaxDepth,
  },
  {
    title: "Spring Counter",
    code: `const t = spring({frame, fps,
  config: {damping: 11, stiffness: 70}});
value = Math.floor(t * 99999);`,
    Component: SpringCounter,
  },
  {
    title: "Turbulence Warp",
    code: `<feTurbulence baseFrequency="0.02"
  seed={Math.floor(frame / 2)}/>
<feDisplacementMap scale={frame * 2}/>`,
    Component: SVGTurbulence,
  },
  {
    title: "Film Grain",
    code: `<feTurbulence baseFrequency="0.9"
  seed={frame % 12}/>
mix-blend-mode: overlay;`,
    Component: FilmGrain,
  },
];
