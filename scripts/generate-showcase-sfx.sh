#!/usr/bin/env bash
# Generate all 12 showcase SFX via ElevenLabs.
# Idempotent — skips files that already exist unless --force.

set -euo pipefail

FORCE="${1:-}"
OUT_DIR="$(dirname "$0")/../public/audio/generated/showcase-v4"
mkdir -p "$OUT_DIR"

# Load key
if [[ -z "${ELEVENLABS_API_KEY:-}" ]]; then
  # shellcheck source=/dev/null
  . "$HOME/.claude/.env"
fi

gen() {
  local name="$1" prompt="$2" duration="$3" influence="${4:-0.4}"
  local out="$OUT_DIR/$name.mp3"
  if [[ -f "$out" && "$FORCE" != "--force" ]]; then
    echo "skip $name (exists)"
    return
  fi
  local body
  body=$(jq -n --arg t "$prompt" --argjson d "$duration" --argjson i "$influence" \
    '{text: $t, duration_seconds: $d, prompt_influence: $i, model_id: "eleven_text_to_sound_v2"}')
  local code
  code=$(curl -sS -w "%{http_code}" -o "$out.tmp" \
    -X POST "https://api.elevenlabs.io/v1/sound-generation?output_format=mp3_44100_128" \
    -H "xi-api-key: $ELEVENLABS_API_KEY" \
    -H "Content-Type: application/json" \
    -d "$body")
  if [[ "$code" != "200" ]]; then
    echo "FAIL $name ($code): $(cat "$out.tmp")" >&2
    rm -f "$out.tmp"
    return 1
  fi
  mv "$out.tmp" "$out"
  echo "ok   $name ($(wc -c < "$out") bytes)"
}

# Generate in parallel — throttle to 4 concurrent (ElevenLabs free-tier limit)
MAX_CONCURRENT=4
throttle() {
  while [[ $(jobs -r | wc -l) -ge $MAX_CONCURRENT ]]; do
    sleep 0.2
  done
}

specs=(
  "01-typing|crisp mechanical keyboard clacking, tech ambient, quick burst|1.5"
  "02-glitch|short digital glitch stutter, lo-fi corruption, punchy distortion|1.0"
  "03-matrix|soft digital rain, synth pad, atmospheric tech hum|2.0"
  "04-burst|magical chime burst, rising shimmer, short and energetic|1.8"
  "05-flip|card whoosh and soft thump, tactile, quick|1.5"
  "06-liquid|gentle water bubble ripple, soft smooth, underwater feel|1.8"
  "07-shine|metallic sparkle sweep, luxury brand shimmer, short|1.5"
  "08-chromatic|warm synth pad swell, psychedelic ambient, dreamy|2.0"
  "09-parallax|cinematic ambient drone, subtle bass hum, spacious|2.0"
  "10-counter|digital counter ticking up rapidly then stopping with a soft ding|1.8"
  "11-warp|analog tape warp whoosh, rising tension, sci-fi|1.8"
  "12-grain|vintage film projector whirring hum, subtle clicks and pops|2.2"
)

for spec in "${specs[@]}"; do
  IFS='|' read -r name prompt duration <<< "$spec"
  throttle
  gen "$name" "$prompt" "$duration" &
done

wait
echo ""
echo "all done — files in $OUT_DIR"
ls -la "$OUT_DIR"
