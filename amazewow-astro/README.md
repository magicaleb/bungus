# AmazeWow — The Thought Index

A standalone Astro application for an original digital mentalism effect. It is intentionally isolated from the legacy `bungus` Hangman page and shares no runtime code, styles, or dependencies with it.

## The effect

1. The performer generates a six-digit session in the hidden Signal Studio.
2. A participant opens AmazeWow on their own phone and enters that session.
3. They freely search or browse 256 thoughts and lock in any one.
4. Their phone displays a five-digit resonance number that changes with every session.
5. The performer decodes the number to receive the exact thought plus a progressive reveal ladder.

The participant's choice never leaves their device. There is no server, database, account, analytics, camera, microphone, or cross-device transmission. A keyed local permutation turns the selected catalog index into a session-specific number; the performer console reverses it.

## Performer access

- Open the app with `?mode=performer`, or
- Hold the AmazeWow wordmark for about one second, or
- Tap the wordmark five times, or
- Press `Shift + P` on a keyboard.

The performer console includes a clear decoder and a stealth focus-meter keypad. In the focus meter, enter the participant's resonance, press `=`, then double-tap the display to peek the thought for a few seconds.

## Development

```bash
npm install
npm run dev
npm run check
npm run build
```

## Publish to the existing GitHub Pages folder

```bash
npm run publish:pages
```

That command replaces only the repository-level `/AmazeWow/` folder with the latest static build.

## Performance notes

- Have the participant type the session and make the choice themselves.
- Look away while they browse and lock the thought.
- Ask only for the resonance number; do not touch their phone.
- Reveal progressively using the cue, category, first letter, length, and final title.
- The app is an entertainment tool. Do not present it as medical, neurological, or scientific measurement.
