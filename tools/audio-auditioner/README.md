# Audio Auditioner

Keyboard-driven audio picker. Preview a set of candidate sounds against the project's background music, pick one, integrate it.

## Run

```
npm run audition
```

Opens http://localhost:4321/ (auto-opens on macOS).

## Keys

- `Space` — play next candidate (stops the previous)
- `↑` / `↓` — move selection without playing
- `Enter` — replay current
- `B` — toggle background music (loops at configured volume)
- `S` — stop candidate
- `M` — mark chosen (logs to the page + dev console)

## Config

`audition.local.json` in this directory (git-ignored via `*.local.*`). Regenerated each time the auditioner is used — see the `audio-auditioner` skill.

Schema:

```json
{
  "title": "What are we picking?",
  "context": "Where it plays / why we're auditioning",
  "bgMusic": {
    "src": "/audio/music/<track>.mp3",
    "volume": 0.36,
    "startAt": 95
  },
  "candidates": [
    { "src": "/audio/sfx/.../file.mp3", "name": "short label", "desc": "why it's in the running" }
  ]
}
```

Audio paths are URLs served by `serve.mjs`: `/audio/*` maps to `public/audio/*`.
