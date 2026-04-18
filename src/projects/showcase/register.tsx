import { Composition, Folder } from "remotion";
import { Showcase } from "./Showcase";
import { ShowcaseV2 } from "./ShowcaseV2";
import { ShowcaseV3 } from "./ShowcaseV3";
import { EFFECTS } from "./scenes";

// Duration math must match Showcase.tsx timings
const INTRO_FRAMES = 120;
const EFFECT_FRAMES = 90;
const OUTRO_FRAMES = 150;
const TRANSITION_FRAMES = 15;
// 14 sequences, 13 transitions overlap
const SEQUENCE_TOTAL =
  INTRO_FRAMES + EFFECTS.length * EFFECT_FRAMES + OUTRO_FRAMES;
const TOTAL_FRAMES = SEQUENCE_TOTAL - 13 * TRANSITION_FRAMES;

// V2 timing — more breathing room
const V2_INTRO = 150;
const V2_EFFECT = 120;
const V2_OUTRO = 180;
const V2_TRANSITION = 20;
const V2_SEQUENCE_TOTAL =
  V2_INTRO + EFFECTS.length * V2_EFFECT + V2_OUTRO;
const V2_TOTAL = V2_SEQUENCE_TOTAL - 13 * V2_TRANSITION;

// V3 uses same timing as V2
const V3_TOTAL = V2_TOTAL;

export const Register: React.FC = () => {
  return (
    <Folder name="showcase">
      <Composition
        id="Showcase"
        component={Showcase}
        durationInFrames={TOTAL_FRAMES}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="ShowcaseV2"
        component={ShowcaseV2}
        durationInFrames={V2_TOTAL}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="ShowcaseV3"
        component={ShowcaseV3}
        durationInFrames={V3_TOTAL}
        fps={30}
        width={1080}
        height={1920}
      />
    </Folder>
  );
};
