# Remotion Studio

Multi-project workspace for programmatic video production with [Remotion](https://www.remotion.dev/) — React-powered videos rendered to MP4.

## Quick Start

```bash
npm install
npm run dev          # Open Remotion Studio (preview + hot reload)
```

List available compositions and render one:

```bash
npm run compositions              # see what's registered
npx remotion render <id> out/<id>.mp4
```

## How It Works

Each project lives in its own folder under `src/projects/` — either bundled in this repo or cloned in as a separate git repo. `src/Root.tsx` auto-discovers every `src/projects/*/register.tsx` at build time — drop a project in, it appears in the studio.

```
src/
├── Root.tsx                  # Auto-discovers projects via register.tsx
├── projects/
│   └── showcase/             # Bundled — 12-effect flagship reel
├── components/
│   ├── effects/              # 12 reusable effect primitives
│   └── *.tsx                 # Typewriter, Terminal, etc.
└── styles/                   # Shared design tokens

public/
├── audio/                    # SFX + music collection (100+ sounds)
└── assets/                   # Logos, icons
```

## Bundled Showcase

Render the flagship effects reel (9:16, 38s) — showcases all 12 primitives in `src/components/effects/`:

```bash
npx remotion render Showcase out/showcase.mp4
```

## Reusable Effects

Import any primitive from `src/components/effects/` into your own project:

```tsx
import { GlitchText, MatrixRain, Card3DFlip } from "@/components/effects";
```

Available: `SlantedTerminal`, `GlitchText`, `MatrixRain`, `ParticleBurst`, `Card3DFlip`, `LiquidWave`, `ShineSweep`, `ChromaticAberration`, `ParallaxDepth`, `SpringCounter`, `SVGTurbulence`, `FilmGrain`.

## Adding Your Own Project

Clone or scaffold a new project into `src/projects/` — see [`src/projects/README.md`](src/projects/README.md). Anything outside the bundled `showcase` folder is gitignored, so your project can be its own independent repo.

Example:

| Repo | Description |
|------|-------------|
| [remotion-studio-llm-wiki](https://github.com/RonanCodes/remotion-studio-llm-wiki) | Marketing promos and app demos for [LLM Wiki](https://github.com/RonanCodes/llm-wiki) |

## Tech Stack

- [Remotion](https://www.remotion.dev/) v4 — React-based programmatic video
- [TransitionSeries](https://www.remotion.dev/docs/transitions) — scene transitions (wipe, slide, fade)
- [@remotion/media](https://www.remotion.dev/docs/media) — audio with frame-level volume control
- [Remotion Agent Skills](https://github.com/remotion-dev/skills) — 39 rule files for AI-assisted video creation

## SFX Library

Professional sound effects collection in `public/audio/`. Categories:

| Prefix | Use Case |
|--------|----------|
| `pro-typing-*` | Keyboard / terminal sounds |
| `pro-node-*` | Graph node appearance |
| `pro-appear-*` | UI element reveals |
| `pro-impact-*` | Bass drops, hits |
| `pro-transition-*` | Whooshes, sweeps |
| `pro-notify-*` | Bells, dings |
| `chime-*` | Clean chimes |

See `public/audio/SFX-CATALOG.md` for the full inventory with descriptions and durations.

## License

UNLICENSED — private project.
