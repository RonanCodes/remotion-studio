import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useVideoConfig,
} from "remotion";
import {
  TransitionSeries,
  linearTiming,
  springTiming,
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";

import { EffectFrame } from "./components/EffectFrame";
import { EFFECTS, Intro, Outro } from "./scenes";

loadInter();
loadMono();

// V3 timing — same as V2
const INTRO_FRAMES = 150;
const EFFECT_FRAMES = 120;
const OUTRO_FRAMES = 180;
const TRANSITION_FRAMES = 20;

const pickTransition = (i: number) => {
  const variants = [
    fade(),
    slide({ direction: "from-right" }),
    wipe({ direction: "from-bottom-right" }),
    slide({ direction: "from-bottom" }),
    wipe({ direction: "from-top-left" }),
    slide({ direction: "from-left" }),
    fade(),
  ];
  return variants[i % variants.length];
};

/**
 * SFX helper — places a sound at a specific absolute frame.
 */
const SFX: React.FC<{
  src: string;
  at: number;
  volume?: number;
  duration?: number;
}> = ({ src, at, volume = 0.5, duration = 90 }) => (
  <Sequence from={at} durationInFrames={duration}>
    <Audio src={staticFile(src)} volume={volume} />
  </Sequence>
);

/** Per-effect SFX — each effect gets its own unique sound */
const EFFECT_SFX = [
  "audio/generated/showcase-v3-terminal.mp3",
  "audio/generated/showcase-v3-glitch.mp3",
  "audio/generated/showcase-v3-matrix.mp3",
  "audio/generated/showcase-v3-burst.mp3",
  "audio/generated/showcase-v3-flip.mp3",
  "audio/generated/showcase-v3-liquid.mp3",
  "audio/generated/showcase-v3-shine.mp3",
  "audio/generated/showcase-v3-chroma.mp3",
  "audio/generated/showcase-v3-depth.mp3",
  "audio/generated/showcase-v3-counter.mp3",
  "audio/generated/showcase-v3-turbulence.mp3",
  "audio/generated/showcase-v3-grain.mp3",
];

/**
 * Compute the absolute frame where each effect sequence starts.
 * With TransitionSeries, each transition overlaps the preceding sequence,
 * so the effective start of effect i is:
 *   INTRO_FRAMES - TRANSITION_FRAMES + i * (EFFECT_FRAMES - TRANSITION_FRAMES)
 */
const computeEffectStartFrames = (): number[] => {
  const frames: number[] = [];
  let cursor = INTRO_FRAMES - TRANSITION_FRAMES;
  for (let i = 0; i < EFFECTS.length; i++) {
    frames.push(cursor);
    cursor += EFFECT_FRAMES - TRANSITION_FRAMES;
  }
  return frames;
};
const EFFECT_STARTS = computeEffectStartFrames();

export const ShowcaseV3: React.FC = () => {
  const { durationInFrames } = useVideoConfig();
  const total = EFFECTS.length;

  // Last transition point for outro chime placement
  const lastTransitionPoint = EFFECT_STARTS[EFFECT_STARTS.length - 1] + EFFECT_FRAMES - TRANSITION_FRAMES;

  return (
    <AbsoluteFill style={{ background: "#0a0a14" }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={INTRO_FRAMES}>
          <Intro />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-bottom" })}
          timing={springTiming({
            config: { damping: 200 },
            durationInFrames: TRANSITION_FRAMES,
          })}
        />

        {EFFECTS.map((effect, i) => {
          const Effect = effect.Component;
          return (
            <React.Fragment key={effect.title}>
              <TransitionSeries.Sequence durationInFrames={EFFECT_FRAMES}>
                <EffectFrame
                  title={effect.title}
                  codeSnippet={effect.code}
                  index={i + 1}
                  total={total}
                >
                  <Effect />
                </EffectFrame>
              </TransitionSeries.Sequence>
              <TransitionSeries.Transition
                presentation={pickTransition(i)}
                timing={linearTiming({
                  durationInFrames: TRANSITION_FRAMES,
                })}
              />
            </React.Fragment>
          );
        })}

        <TransitionSeries.Sequence durationInFrames={OUTRO_FRAMES}>
          <Outro />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {/* ── Background music (slightly quieter to let SFX breathe) ── */}
      <Audio
        src={staticFile("audio/music/music-neon-waves.mp3")}
        volume={(f) =>
          f < 45
            ? f / 45 // 1.5s fade in
            : f > durationInFrames - 90
              ? Math.max(0, (durationInFrames - f) / 90) // 3s fade out
              : 0.25
        }
      />

      {/* ── Ambient: Intro hit ── */}
      <SFX
        src="audio/generated/showcase-v3-intro-hit.mp3"
        at={10}
        volume={0.6}
        duration={75}
      />

      {/* ── Ambient: Tension riser (builds before first effect) ── */}
      <SFX
        src="audio/generated/showcase-v3-rise.mp3"
        at={60}
        volume={0.3}
        duration={90}
      />

      {/* ── Per-effect SFX: unique sound for each effect ── */}
      {EFFECT_STARTS.map((frame, i) => (
        <SFX
          key={`effect-sfx-${i}`}
          src={EFFECT_SFX[i]}
          at={frame + 5}
          volume={0.45}
          duration={60}
        />
      ))}

      {/* ── Ambient: Outro chime ── */}
      <SFX
        src="audio/generated/showcase-v3-outro-chime.mp3"
        at={lastTransitionPoint + 20}
        volume={0.5}
        duration={60}
      />
    </AbsoluteFill>
  );
};
