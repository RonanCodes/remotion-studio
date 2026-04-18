# Showcase

A 9:16 effects reel showcasing 12 Remotion techniques — the bundled flagship project for [remotion-studio](../../..).

Composes the reusable primitives from `src/components/effects/` into a single 38.5s video (1080x1920 @ 30 fps).

## Render

```bash
npx remotion render Showcase out/showcase.mp4
```

## Effects (all from `src/components/effects/`)

1. `SlantedTerminal` — CSS perspective + rotateX/Y
2. `GlitchText` — layered text with RGB offsets
3. `MatrixRain` — deterministic drop columns
4. `ParticleBurst` — spring-driven radial burst
5. `Card3DFlip` — `preserve-3d` + `backfaceVisibility`
6. `LiquidWave` — sine math per character
7. `ShineSweep` — linear-gradient translate on a mask
8. `ChromaticAberration` — `mix-blend-mode: screen` RGB split
9. `ParallaxDepth` — seeded pseudo-random layers
10. `SpringCounter` — `spring()` odometer
11. `SVGTurbulence` — `feTurbulence` + `feDisplacementMap`
12. `FilmGrain` — animated turbulence overlay
