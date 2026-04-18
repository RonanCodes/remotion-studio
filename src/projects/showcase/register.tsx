import { Composition, Folder } from "remotion";
import { Showcase } from "./Showcase";
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
    </Folder>
  );
};
