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

// V2 timing — more breathing room per effect
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
 * Lives alongside TransitionSeries in the same AbsoluteFill.
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

/**
 * Compute absolute frame offsets for each transition point.
 * With TransitionSeries, each transition overlaps the preceding sequence,
 * so accumulated start = sum of sequence durations - sum of preceding transitions.
 */
const computeTransitionFrames = (): number[] => {
  const frames: number[] = [];
  // After intro: frame = INTRO_FRAMES - TRANSITION_FRAMES (transition overlaps)
  let cursor = INTRO_FRAMES - TRANSITION_FRAMES;
  frames.push(cursor); // intro → first effect transition

  for (let i = 0; i < EFFECTS.length; i++) {
    cursor += EFFECT_FRAMES - TRANSITION_FRAMES;
    frames.push(cursor);
  }
  return frames;
};

const TRANSITION_POINTS = computeTransitionFrames();

export const ShowcaseV2: React.FC = () => {
  const { durationInFrames } = useVideoConfig();
  const total = EFFECTS.length;

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

      {/* ── Background music ── */}
      <Audio
        src={staticFile("audio/music/music-neon-waves.mp3")}
        volume={(f) =>
          f < 45
            ? f / 45 // 1.5s fade in
            : f > durationInFrames - 90
              ? Math.max(0, (durationInFrames - f) / 90) // 3s fade out
              : 0.3
        }
      />

      {/* ── SFX: Intro impact ── */}
      <SFX
        src="audio/generated/showcase-v2-impact.mp3"
        at={10}
        volume={0.6}
        duration={60}
      />

      {/* ── SFX: Transition whooshes ── */}
      {TRANSITION_POINTS.slice(0, -1).map((frame, i) => (
        <SFX
          key={`whoosh-${i}`}
          src="audio/generated/showcase-v2-whoosh.mp3"
          at={frame}
          volume={0.35}
          duration={45}
        />
      ))}

      {/* ── SFX: Outro chime ── */}
      <SFX
        src="audio/generated/showcase-v2-chime.mp3"
        at={TRANSITION_POINTS[TRANSITION_POINTS.length - 1] + 15}
        volume={0.5}
        duration={60}
      />
    </AbsoluteFill>
  );
};
