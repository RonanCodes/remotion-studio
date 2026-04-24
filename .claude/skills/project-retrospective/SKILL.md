---
name: project-retrospective
description: Capture a timestamped retrospective of the current Remotion composition (spec, scenes, music, SFX, copy, user-validated decisions, liked/disliked sounds, process lessons). Triggered when the user validates a render ("perfect", "that's great", "slaps", "looks good", "this is nice", "ship it"). Also invocable manually via /project-retrospective.
argument-hint: [composition-id] [--label <short-label>]
allowed-tools: Bash(*) Read Write Edit Glob Grep
---

# Project Retrospective

Write a timestamped retrospective for a Remotion composition so future iterations and future projects can build on what worked. Accumulates over time — each retro is a frozen snapshot of one validated version.

## When to trigger

**Automatically** when the user says any of these after reviewing a render:
- "perfect" / "that's perfect"
- "that's really good" / "really nice"
- "slaps" / "this slaps"
- "looks good" / "ship it"
- "this is nice" (referring to the video overall, not a single sound)
- Any variation that reads as "I'm happy, let's lock this in"

Do *not* trigger on narrow positive feedback about a single asset ("this sound is nice") — only when the user is signing off on the composition overall.

**Manually** when the user runs `/project-retrospective`.

Ask the user to confirm before writing if you're not sure whether it's a sign-off vs. a narrow comment — a retro is a low-cost operation but clutter hurts.

## Output location

```
src/projects/<project-name>/retrospectives/YYYY-MM-DD-HHMM--<composition-id>.md
```

- Timestamp uses local time (e.g., `2026-04-21-1752`) so retros sort chronologically.
- `<composition-id>` is the exact Remotion composition ID (e.g., `ConnectionsPromoV5Portrait`).
- If multiple retros land in the same minute for the same composition, append a short label from `--label` or a hyphen + counter.

## What to capture

Use this template. Omit sections that don't apply; don't invent content.

```markdown
# Retrospective — <Composition ID>

**Date:** YYYY-MM-DD HH:MM
**Render:** <path to the MP4 the user validated>
**Status:** ✓ validated by user

## Spec
- Dimensions: <width×height>
- Duration: <frames> frames @ <fps>fps (<seconds>s)
- Target platform: <LinkedIn / X / YouTube Shorts / etc.>

## Scenes
<numbered list — scene name, duration in frames, one-line description of what happens>

## Music
<path + role (full track / background / intro-only)>

## SFX (by scene)
<scene: files + timing anchors — keep concise, this is the record of what worked>

## Copy
<key on-screen text, especially anything reworded during iteration>

## User-validated decisions
<bullet list of specific edits the user explicitly approved — format, timing, layout, copy choices>

## Liked sounds (reinforced this round)
<files the user flagged positively — cross-reference with memory/audio-preferences.md>

## Disliked sounds (rejected this round)
<files the user flagged negatively — these should already live in public/audio/disliked/>

## Process lessons
<what slowed us down or caused re-work — e.g., "rendered MP4 before edit saved, wasted a cycle">

## Deferred / next steps
<work that was postponed — e.g., "extract shared primitives into shared/"; prevents loss of context for the next session>
```

## Steps

1. Identify the project directory from the current working context or from the composition ID.
2. Read the composition file to extract: dimensions, fps, duration, scene structure (`<Sequence>` / `<TransitionSeries>`), music `<Audio src>`, SFX usages.
3. Check `git log` for recent commits on the project to pick up anything that was already recorded but not in your conversation context.
4. Check `MEMORY.md` for relevant user preferences (audio, tone, etc.) and cross-reference — don't duplicate but do call out which memories were reinforced this round.
5. Write the retro file with today's timestamp.
6. Confirm to the user: "Saved retrospective to `src/projects/<name>/retrospectives/<file>.md`."

## Tips

- **Be specific, not generic.** "User preferred silence over a winner chime in scene 4" beats "user liked fewer SFX."
- **Record the *why* when you have it.** If the user rejected a sound, note what family it was in ("generic success ding") so the pattern is visible across retros.
- **Link to git commit if one exists.** If the validated version was committed, include the SHA — makes it easy to resurrect later.
- **Don't rewrite history.** If you're iterating, write a NEW retro rather than editing an old one. Prior retros are the paper trail.

## Using retros on future projects

When starting a new Remotion project, skim the latest retro from the most recent bundled project (or the same project if it's a sequel). Look for:
- Liked/disliked SFX (seed initial picks)
- Copy patterns the user rejected (avoid rerunning the same pushback)
- Process lessons (don't repeat the same mistakes)

This skill is a write-path; a future companion skill can handle read/apply.
