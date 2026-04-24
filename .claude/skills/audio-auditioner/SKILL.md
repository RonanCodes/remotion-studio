---
name: audio-auditioner
description: When picking or replacing an SFX/music cue, curate a shortlist, write it to tools/audio-auditioner/audition.local.json, and tell the user to run `npm run audition`. They preview candidates with keyboard (space = next), optionally over the project's BG music, then tell you which one to wire in.
---

# Audio auditioner

A keyboard-driven audio preview tool for picking SFX. You curate candidates, the user auditions them, you wire the pick back into the composition.

## When to use

- User asks to "try different sounds" / "hear some options" / "pick a better X"
- A recently-added SFX feels off and you want them to choose from alternatives
- Any role where the "right" sound is subjective (chimes, dings, impact flavor, whoosh vibe)

Don't use this for sounds that are already well-established in `memory/audio-preferences.md` for that exact role unless the user has rejected those.

## How it works

1. **Curate the shortlist** (6–10 varied options is the sweet spot)
   - Walk the relevant subfolder: `ls public/audio/sfx/<category>/`
   - Pick across vibes: warm/crisp, short/long, traditional/modern
   - Skip anything in `public/audio/disliked/` and anything the user already rejected for this role
   - Prefer `public/audio/sfx/*` over `public/audio/generated/*` unless the brief asks for generated

2. **Write the config** to `tools/audio-auditioner/audition.local.json` (git-ignored):

   ```json
   {
     "title": "What are we picking",
     "context": "Where it plays / why we're re-auditioning",
     "bgMusic": {
       "src": "/audio/music/<track-used-in-comp>.mp3",
       "volume": 0.36,
       "startAt": 60
     },
     "candidates": [
       { "src": "/audio/sfx/.../file.mp3", "name": "short-label", "desc": "one line on the vibe" }
     ]
   }
   ```

   - `src` paths start with `/audio/...` — served by `serve.mjs` from `public/audio/*`
   - Include `bgMusic` whenever the chosen sound has to sit in a mix. Use the same track + volume the composition uses; set `startAt` to a busy section of the music so the user hears the candidate against a realistic bed, not the quiet intro

3. **Tell the user** to run `npm run audition`. The server auto-opens the browser on macOS. Keyboard:
   - `Space` — play next (stops previous)
   - `↑/↓` — move selection
   - `Enter` — replay current
   - `B` — toggle BG music (loops)
   - `M` — mark chosen (prints to page + console)

4. **Wait for their pick**, then swap the chosen `src` into the composition. Update `memory/audio-preferences.md` if a new sound is now preferred for that role, or if the old pick should be demoted.

## Curation tips

- **Group by role, not by folder.** If auditioning an end-of-video chime, include candidates from `sfx/notify/`, `sfx/chime/`, and maybe `sfx/impact/` — don't silo by directory.
- **Describe the vibe, not the filename.** "Warm, round bell — feels friendly" beats "bell sound". The `desc` is what the user reads while the audio loads.
- **Seed with one known-good** if there is one — gives the user a baseline. Note it in the desc: "(current pick, seeded for comparison)".
- **Don't present duplicates.** Two sounds that would feel identical in a promo are noise. Trim.

## Files

- `tools/audio-auditioner/index.html` — UI (committed)
- `tools/audio-auditioner/serve.mjs` — tiny Node server (committed)
- `tools/audio-auditioner/audition.local.json` — per-session candidates (git-ignored via `*.local.*`)
- `tools/audio-auditioner/README.md` — user-facing docs
- `npm run audition` — launches the server on :4321
