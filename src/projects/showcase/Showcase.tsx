import React from "react";
import { AbsoluteFill, Audio, staticFile, useVideoConfig } from "remotion";
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

const INTRO_FRAMES = 120;
const EFFECT_FRAMES = 90;
const OUTRO_FRAMES = 150;
const TRANSITION_FRAMES = 15;

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

export const Showcase: React.FC = () => {
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

      <Audio
        src={staticFile("audio/music/music-synthwave-tech.mp3")}
        volume={(f) =>
          f < 30
            ? f / 30
            : f > durationInFrames - 60
              ? Math.max(0, (durationInFrames - f) / 60)
              : 0.35
        }
      />
    </AbsoluteFill>
  );
};
