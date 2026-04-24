---
name: video-script
description: Write a structured video script with scene-by-scene breakdown, timing, narration, and visual direction. Use when user wants to plan a video, write a script, create a storyboard, plan scenes, or prepare for video production.
argument-hint: <project-or-topic> [--promo | --demo]
allowed-tools: Read Write Edit Glob Grep
---

# Video Script & Storyboard

Write a structured video script with scene-by-scene breakdown, timing, narration text, and visual direction. Outputs a `video-script.json` ready for the video production pipeline.

## Usage

```
/video-script my-app --promo     # 60-90s promotional video
/video-script my-app --demo      # 2-3min walkthrough/demo
/video-script my-app             # Defaults to --promo
```

## Step 1: Research the Project

Before interviewing, scan the project to understand what it does:

- Read README.md, CLAUDE.md, package.json
- Identify the core value proposition
- Note key features, screenshots, or demo-worthy flows
- Check for existing marketing copy or taglines

## Step 2: Interview (via AskUserQuestion)

Ask these questions one at a time, adapting follow-ups based on answers:

1. **Target platform** — "Where will this primarily be posted? (LinkedIn, X/Twitter, YouTube Shorts, Instagram Reels, TikTok, YouTube landscape, multi-platform)" — this determines aspect ratio, see **Platform & Aspect Ratio Reference** below
2. **Audience** — "Who is the target viewer? (developers, designers, PMs, general tech audience)"
3. **Value prop** — "In one sentence, what problem does this solve and why should someone care?"
4. **Hero feature** — "What's the single most impressive thing to show? The 'aha' moment?"
5. **Supporting features** — "Name 2-3 other features worth highlighting (we'll pick max 3)."
6. **Tone** — "What tone? (confident-technical, friendly-casual, cinematic-epic, minimal-clean)"
7. **CTA** — "What should the viewer do after watching? (visit site, star repo, try it, sign up)"
8. **Existing assets** — "Any screenshots, terminal recordings, or diagrams we can use?"

### Platform & Aspect Ratio Reference

Pick the resolution based on where the video primarily lives. Post to multiple platforms with a compromise ratio (1:1 or 4:5) unless the user commits to per-platform renders.

| Platform | Best ratio | Pixels | Why |
|----------|-----------|--------|-----|
| **LinkedIn (mobile feed)** | **4:5 portrait** | **1080×1350** | LinkedIn's feed isn't vertical-native like TikTok; 9:16 is supported but underperforms. 4:5 maximises mobile screen space without cropping. 1:1 is a safer universal fallback |
| LinkedIn (desktop-first) | 1:1 square | 1080×1080 | Top performer across desktop + mobile feed |
| X / Twitter | 16:9 or 1:1 | 1920×1080 or 1080×1080 | 16:9 plays inline best; 1:1 gets more feed space on mobile |
| YouTube (landscape) | 16:9 | 1920×1080 | Standard YouTube home |
| YouTube Shorts | 9:16 | 1080×1920 | Vertical-native |
| Instagram Reels | 9:16 | 1080×1920 | Vertical-native |
| Instagram feed | 4:5 or 1:1 | 1080×1350 or 1080×1080 | 4:5 is the tallest allowed in feed |
| TikTok | 9:16 | 1080×1920 | Vertical-native |
| Multi-platform (one render) | 1:1 | 1080×1080 | Universal — no cropping anywhere, but gives up mobile screen space on LI/IG |

**LinkedIn-specific gotchas:**
- LinkedIn doesn't crop 9:16; it just displays smaller in the feed — users see less of the video without tapping
- Videos autoplay muted: on-screen text and captions are mandatory
- 4:5 is the sweet spot for LinkedIn mobile, where most views happen

If the user says "LinkedIn" without specifying mobile vs desktop, default to **4:5 (1080×1350)** and confirm.

For `--demo` mode, also ask:

8. **Walkthrough flow** — "What's the step-by-step flow to demonstrate? (e.g., install -> configure -> use -> result)"
9. **Starting state** — "What does the user see before they start? (empty project, existing codebase, fresh terminal)"

## Step 3: Write the Script

### --promo Mode (60-90s total, 5-8 scenes)

Follow this proven structure:

| Scene | Purpose | Duration | Notes |
|-------|---------|----------|-------|
| Hook | Grab attention, state the problem | 3-4s | Lead with PROBLEM, not product name |
| Problem | Show the pain point vividly | 4-6s | "You've been there..." — relatable frustration |
| Solution Reveal | Introduce the product as the answer | 6-8s | First time product name appears on screen |
| Hero Feature | Demonstrate the #1 feature | 8-12s | Longest scene — this is the money shot |
| Feature 2 | Second supporting feature | 5-7s | Quick, punchy |
| Feature 3 | Third supporting feature (optional) | 5-7s | Only if genuinely impressive, otherwise skip |
| Social Proof | Stats, stars, testimonials (optional) | 3-5s | Skip if none available |
| CTA | Clear call to action | 4-6s | URL on screen, simple imperative verb |

### --demo Mode (2-3min total, 6-12 scenes)

Follow this structure:

| Scene | Purpose | Duration | Notes |
|-------|---------|----------|-------|
| Intro | What we're building/doing today | 5-8s | Set context, show end result preview |
| Setup | Prerequisites, installation | 10-15s | Terminal commands, fast-paced |
| Step 1-N | Each step in the walkthrough | 15-30s each | One concept per scene |
| Result | Show the final output | 10-15s | The payoff — linger here |
| Recap | Quick summary of what we covered | 5-8s | Bullet points on screen |
| Outro | Where to learn more | 4-6s | Links, docs, community |

## Step 4: Generate video-script.json

Save to `video-script.json` in the current project root (or Remotion project root if one exists):

```json
{
  "meta": {
    "title": "Project Name — Tagline",
    "mode": "promo",
    "totalDuration": 75,
    "fps": 30,
    "resolution": { "width": 1920, "height": 1080 },
    "tone": "confident-technical",
    "cta": { "text": "Star on GitHub", "url": "https://github.com/..." }
  },
  "scenes": [
    {
      "id": "hook",
      "name": "Hook",
      "duration": 4,
      "narration": "Text that would be spoken or shown as subtitles",
      "onScreenText": {
        "headline": "Large text shown on screen",
        "subtitle": "Smaller supporting text"
      },
      "visual": {
        "type": "text-only | terminal | screenshot | diagram | code | split-screen",
        "description": "Detailed description of what the viewer sees",
        "assets": ["asset-filename.png"],
        "background": "gradient-dark | solid-dark | screenshot-blur"
      },
      "animation": {
        "entrance": "fade-in | slide-left | scale-up | typewriter",
        "emphasis": "ken-burns | pulse | highlight",
        "exit": "fade-out | slide-left"
      },
      "transition": "fade | slide | wipe | cut"
    }
  ]
}
```

## Step 5: Review with User

Present the script as a formatted table:

```
Scene     | Duration | On-Screen Text          | Visual
----------|----------|-------------------------|------------------
Hook      | 4s       | "Ever lost context..."  | Dark gradient, text
Problem   | 5s       | "50 files. No map."     | Terminal chaos
Solution  | 8s       | "LLM Wiki"              | Product reveal
...
```

Ask: "Does this flow work? Any scenes to add, remove, or reorder?"

Iterate until approved.

## Script Writing Rules

1. **Lead with problem, not product.** The product name should not appear until the Solution Reveal scene.
2. **Micro-payoffs every 10-15s.** Something new, surprising, or satisfying must happen at regular intervals.
3. **Design for muted viewing.** On-screen text is the primary channel — narration is supplementary. Every key message must be readable without audio.
4. **3-5 features maximum.** More dilutes impact. Pick the most visually impressive ones.
5. **Mobile safe zones.** All critical text/visuals must fit within: 150px from top, 170px from bottom, 60px from sides (at 1920x1080). Scale proportionally for other ratios. LinkedIn + Instagram overlay username/caption on the bottom — reserve 180–240px at the bottom for portrait ratios.
6. **Show, don't tell.** Prefer terminal recordings, UI screenshots, and live output over abstract descriptions.
7. **End with one clear CTA.** Not three. One verb, one URL.
8. **Time budget is strict.** Promo: 60-90s. Demo: 2-3min. Cut ruthlessly to stay in bounds.
