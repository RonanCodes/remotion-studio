# Remotion Studio

Multi-project workspace for programmatic video production with [Remotion](https://www.remotion.dev/) — React-powered videos rendered to MP4.

## Quick Start

```bash
npm install
npm run dev          # Open Remotion Studio (preview + hot reload)
```

Render a composition:

```bash
npx remotion render PromoV9 out/promo-v9.mp4
```

## How It Works

Each project gets its own folder under `src/projects/`. Compositions are grouped by `<Folder>` in Remotion Studio. Shared components, styles, and a professional SFX library are available across all projects.

```
src/
├── Root.tsx                  # All compositions, organized by Folder
├── projects/
│   └── llm-wiki/             # LLM Wiki promo videos (15 compositions)
├── components/               # Shared (Typewriter, Terminal, etc.)
└── styles/                   # Shared design tokens

public/
├── audio/                    # SFX + music collection (100+ sounds)
└── assets/                   # Logos, screenshots, icons
```

## Projects

| Project | Compositions | Description |
|---------|-------------|-------------|
| llm-wiki | 15 | Marketing promos and app demos for [LLM Wiki](https://github.com/RonanCodes/llm-wiki) |

## Adding a New Project

1. Create `src/projects/<project-name>/`
2. Build your compositions as React components
3. Register them in `Root.tsx` inside a `<Folder name="<project-name>">` block
4. Project-specific assets go in `public/assets/<project-name>/`

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
