# Hangman

A classic Hangman word-guessing game built as a Progressive Web App (PWA).

## How to Play

1. A random word is chosen — you see blanks and a category hint.
2. Click a letter (or press a key on your keyboard) to guess.
3. Each wrong guess adds a body part to the hangman.
4. You have **6 wrong guesses** before the game ends.
5. Reveal all letters before the hangman is complete to win!

## Features

- 🎮 30+ words across multiple categories
- ⌨️ Physical keyboard support
- 📱 Mobile-friendly, responsive layout
- 📊 Win/loss score tracking
- 💾 PWA — installable on any device

## Running Locally

Since it's a static site, just open `index.html` in your browser — no build step required.

For the best experience (PWA install, service worker), serve it over HTTP:

```bash
npx serve .
# or
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Files

| File | Description |
|------|-------------|
| `index.html` | Game markup |
| `style.css` | Styles and layout |
| `script.js` | Game logic and word bank |
| `manifest.json` | PWA manifest |

## License

Personal use only.
