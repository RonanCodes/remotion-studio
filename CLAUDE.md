# Remotion Studio

Multi-project Remotion workspace for programmatic video production.

## Project Structure

```
remotion-studio/
├── src/
│   ├── Root.tsx                  # Auto-discovers src/projects/*/register.tsx
│   ├── projects/
│   │   └── showcase/             # Bundled flagship reel (tracked)
│   ├── components/
│   │   ├── effects/              # 12 reusable effect primitives
│   │   └── *.tsx                 # Typewriter, Terminal, FeatureRow, WordReveal
│   └── styles/                   # Shared design tokens
├── public/
│   ├── audio/                    # Shared SFX + music collection
│   └── assets/                   # Logos, icons
├── out/                          # Rendered videos (gitignored), subfolders per project
│   ├── showcase/                 # Showcase effects reel renders
│   └── llm-wiki/                 # LLM Wiki promo/marketing renders
└── .claude/skills/               # Official Remotion skills + custom video production skills
```

## Adding a New Project

The bundled `src/projects/showcase/` is tracked. Everything else under `src/projects/*` is gitignored — add projects as independent git repos cloned into the folder.

1. Clone (or create) a project repo at `src/projects/<project-name>/`
2. Ensure it has a `register.tsx` exporting a `Register` component that wraps its `<Composition>` entries in a `<Folder name="<project-name>">`
3. That's it — auto-discovery picks it up on next `npm run dev`

See `src/projects/README.md` for clone commands and a starter `register.tsx` template.

## Reusable Effects

`src/components/effects/` ships 12 ready-to-use animated primitives that any project (bundled or external) can import:

```tsx
import { GlitchText, MatrixRain, Card3DFlip } from "../../components/effects";
```

Available: `SlantedTerminal`, `GlitchText`, `MatrixRain`, `ParticleBurst`, `Card3DFlip`, `LiquidWave`, `ShineSweep`, `ChromaticAberration`, `ParallaxDepth`, `SpringCounter`, `SVGTurbulence`, `FilmGrain`. The bundled showcase project composes all 12.

## Skills

### Official Remotion Skills
Installed at `.claude/skills/remotion-best-practices/` (from `remotion-dev/skills`).
39 rule files cover: animations, audio, 3D, transitions, captions, SFX, charts, etc.
Always reference "use remotion best practices" when prompting for video work.

### Custom Video Production Skills
Our own skills for the full video production pipeline:

| Skill | Purpose |
|-------|---------|
| `remotion-video` | Build Remotion compositions from a script |
| `video-render` | Render compositions with optimal settings |
| `video-review` | QA compositions before rendering |
| `video-assets` | Generate visual assets (mockups, diagrams, screenshots) |
| `video-script` | Write scene-by-scene scripts with timing and direction |
| `video-copy` | Write on-screen text and narration for scenes |
| `project-retrospective` | Capture a timestamped retro when the user validates a render. Auto-triggers on "perfect", "that's great", "slaps", etc. Writes to `src/projects/<name>/retrospectives/YYYY-MM-DD-HHMM--<composition>.md`. |

## Conventions

### Versioning
Always keep previous versions when iterating. Create a new file (PromoV10, PromoV11, etc.) — never overwrite. When a version is confirmed good, copy the render with a suffix: `promo-v9-slaps.mp4`.

### Retrospectives
Each project has a `retrospectives/` folder (`src/projects/<name>/retrospectives/`) that accumulates timestamped retros — one per validated render. A retro captures spec, scene structure, music + SFX choices, copy decisions, liked/disliked sounds, and process lessons. Use these on the next iteration or project to avoid re-learning. Trigger the `project-retrospective` skill when the user signs off on a render.

### Animation Primitives
- Use `useCurrentFrame()` and `interpolate()` for all animations — never CSS transitions
- Use `spring()` for physics-based motion
- Spring presets: SNAPPY (damping:15, stiffness:200), GENTLE (damping:20, stiffness:80), BOUNCY (damping:8, stiffness:150)
- Always clamp interpolations: `extrapolateLeft: "clamp", extrapolateRight: "clamp"`

### Transitions
- Use `TransitionSeries` for scene transitions — not raw `Sequence` stitching
- Prefer `wipe()` or `slide()` for text-heavy scenes — `fade()` causes text overlap
- Transition duration: 20-30 frames depending on pacing

### Light Mode Hybrid
- Light backgrounds (#F9FAFB) for messaging/text scenes
- Dark terminals stay dark (#1a1a1a) — terminals never go light
- Design tokens in `src/styles/colors.ts`

### SFX Workflow
Use the `SFX` helper component pattern for placing sounds at specific frames:
```tsx
const SFX: React.FC<{
  src: string; at: number; volume?: number; duration?: number;
}> = ({ src, at, volume = 0.5, duration = 90 }) => (
  <Sequence from={at} durationInFrames={duration}>
    <Audio src={staticFile(src)} volume={volume} />
  </Sequence>
);
```
SFX sit alongside `<TransitionSeries>` in the same `<AbsoluteFill>`.

### SFX Collection
Professional SFX library in `public/audio/`. See `public/audio/SFX-CATALOG.md` for full inventory.
Categories: pro-typing-*, pro-node-*, pro-appear-*, pro-impact-*, pro-transition-*, pro-notify-*, chime-*.

### Audio
- Use `<Audio>` from `@remotion/media`, not native HTML audio
- Volume callback `(f) => number` for fade-in/fade-out
- `startFrom` prop is unreliable for skipping intros — trim the MP3 with ffmpeg instead
- Avoid VBR MP3s (causes drift) — use CBR

### Images
- Always use `<Img>` from `remotion`, never native `<img>` — it pauses rendering until decoded

### Ken Burns Effect
- `interpolate` scale 1→1.1 inside `overflow:hidden` container
- Scale 1→1.3 is too aggressive — keep it gentle

### Rendering
- Quick check: `npx remotion still [composition-id] --scale=0.25 --frame=30`
- Full render: `npm run render -- [composition-id] out/<project>/filename.mp4 --log=error`
  - Wrapper inserts a `--YYYY-MM-DD-HHMM` stamp before the extension so successive renders don't overwrite previous ones (e.g. `promo-v5-portrait--2026-04-21-1705.mp4`).
  - Use `npm run render:raw` to bypass the wrapper when you want to overwrite a specific file.
- For transparent video: render to ProRes with alpha channel
