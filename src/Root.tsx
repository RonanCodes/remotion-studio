import { Composition, Folder } from "remotion";
import { MarketingPromo } from "./projects/llm-wiki/MarketingPromo";
import { AppDemo } from "./projects/llm-wiki/AppDemo";
import { PromoA } from "./projects/llm-wiki/PromoA";
import { PromoB } from "./projects/llm-wiki/PromoB";
import { PromoC } from "./projects/llm-wiki/PromoC";
import { PromoV2Dark } from "./projects/llm-wiki/PromoV2Dark";
import { PromoV2 } from "./projects/llm-wiki/PromoV2";
import { PromoV3 } from "./projects/llm-wiki/PromoV3";
import { PromoV3Synth } from "./projects/llm-wiki/PromoV3Synth";
import { PromoV4 } from "./projects/llm-wiki/PromoV4";
import { PromoV5 } from "./projects/llm-wiki/PromoV5";
import { PromoV6 } from "./projects/llm-wiki/PromoV6";
import { PromoV7 } from "./projects/llm-wiki/PromoV7";
import { PromoV8 } from "./projects/llm-wiki/PromoV8";
import { PromoV9 } from "./projects/llm-wiki/PromoV9";
import { PromoV10 } from "./projects/llm-wiki/PromoV10";
import { KineticPitch } from "./projects/llm-wiki/KineticPitch";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="llm-wiki">
        <Composition
          id="KineticPitch"
          component={KineticPitch}
          durationInFrames={940} // ~31s at 30fps
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="PromoV10"
          component={PromoV10}
          durationInFrames={1680} // 56s at 30fps
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="PromoV9"
          component={PromoV9}
          durationInFrames={1560} // 52s at 30fps
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="PromoV8"
          component={PromoV8}
          durationInFrames={1560} // 52s at 30fps
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="PromoV7"
          component={PromoV7}
          durationInFrames={1560} // 52s at 30fps
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="PromoV6"
          component={PromoV6}
          durationInFrames={1560} // 52s at 30fps
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="PromoV5"
          component={PromoV5}
          durationInFrames={1560} // 52s at 30fps
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="PromoV4"
          component={PromoV4}
          durationInFrames={1560} // 52s at 30fps
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="PromoV3Synth"
          component={PromoV3Synth}
          durationInFrames={1590} // 53s at 30fps
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="PromoV3"
          component={PromoV3}
          durationInFrames={1590} // 53s at 30fps
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="PromoV2Dark"
          component={PromoV2Dark}
          durationInFrames={1800} // 60s at 30fps
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="PromoV2"
          component={PromoV2}
          durationInFrames={1800} // 60s at 30fps
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="PromoC"
          component={PromoC}
          durationInFrames={1800} // 60s at 30fps
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="PromoB"
          component={PromoB}
          durationInFrames={1800} // 60s at 30fps
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="PromoA"
          component={PromoA}
          durationInFrames={1800} // 60s at 30fps
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="AppDemo"
          component={AppDemo}
          durationInFrames={2700} // 90s at 30fps
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="MarketingPromo"
          component={MarketingPromo}
          durationInFrames={900} // 30s at 30fps
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>
    </>
  );
};
