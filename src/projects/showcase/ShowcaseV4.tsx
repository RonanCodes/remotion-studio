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
import { EFFECTS, IntroV2, OutroV2 } from "./scenes";

loadInter();
loadMono();

// V4 — tighter pacing from v3 feedback: shorter effects, cleaner intro,
// volume-tuned per-effect SFX (broken too loud, fluid too quiet in v3).
const INTRO_FRAMES = 60;
const EFFECT_FRAMES = 60;
const OUTRO_FRAMES = 75;
const TRANSITION_FRAMES = 10;

const SFX_DIR = "audio/generated/showcase-v4";

// [file, volume] — volumes tuned per v3 feedback
const SFX_SPEC: ReadonlyArray<readonly [string, number]> = [
  ["01-typing.mp3", 0.6],
  ["02-glitch.mp3", 0.28],
  ["03-matrix.mp3", 0.4],
  ["04-burst.mp3", 0.55],
  ["05-flip.mp3", 0.5],
  ["06-liquid.mp3", 0.75],
  ["07-shine.mp3", 0.5],
  ["08-chromatic.mp3", 0.4],
  ["09-parallax.mp3", 0.4],
  ["10-counter.mp3", 0.55],
  ["11-warp.mp3", 0.35],
  ["12-grain.mp3", 0.5],
];

const SFX: React.FC<{
  src: string;
  at: number;
  volume: number;
  duration?: number;
}> = ({ src, at, volume, duration = 60 }) => (
  <Sequence from={at} durationInFrames={duration}>
    <Audio src={staticFile(src)} volume={volume} />
  </Sequence>
);

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

const effectStart = (n: number) =>
  INTRO_FRAMES - TRANSITION_FRAMES + n * (EFFECT_FRAMES - TRANSITION_FRAMES);

export const ShowcaseV4: React.FC = () => {
  const { durationInFrames } = useVideoConfig();
  const total = EFFECTS.length;

  return (
    <AbsoluteFill style={{ background: "#0a0a14" }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={INTRO_FRAMES}>
          <IntroV2 />
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
          <OutroV2 />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {SFX_SPEC.map(([file, volume], i) => (
        <SFX
          key={file}
          src={`${SFX_DIR}/${file}`}
          at={effectStart(i)}
          volume={volume}
        />
      ))}

      <Audio
        src={staticFile("audio/music-synthwave-tech.mp3")}
        volume={(f) =>
          f < 20
            ? (f / 20) * 0.22
            : f > durationInFrames - 40
              ? Math.max(0, ((durationInFrames - f) / 40) * 0.22)
              : 0.22
        }
      />
    </AbsoluteFill>
  );
};
