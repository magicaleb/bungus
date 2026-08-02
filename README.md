# Bungus – Hangman PWA

A progressive web app (PWA) for playing Hangman, optimised for iPhone.

## Taking Screenshots

A [Playwright](https://playwright.dev/) script is included so you can capture screenshots of the app at any time without opening a browser manually.

### Prerequisites

```bash
npm install          # install dependencies
npx playwright install chromium   # download the Chromium browser
```

### Basic usage

```bash
node screenshot.js [url] [device] [output]
```

| Argument | Default | Description |
|---|---|---|
| `url` | `https://magicaleb.github.io/bungus/` | The page to screenshot |
| `device` | `iPhone 12` | Playwright device to emulate |
| `output` | `screenshot.png` | File path for the saved image |

### Examples

```bash
# Screenshot the live site as an iPhone 12 (default)
node screenshot.js

# Screenshot a local dev server
node screenshot.js http://localhost:8080/hangman.html

# Use a different device
node screenshot.js https://magicaleb.github.io/bungus/ "iPhone SE"

# Save to a custom path
node screenshot.js https://magicaleb.github.io/bungus/ "iPhone 14 Pro" screenshots/iphone14.png
```

Or via the npm script shortcut:

```bash
npm run screenshot
```

### Supported devices

Playwright supports a wide range of device presets. Some useful ones:

- `iPhone 12` / `iPhone 14` / `iPhone 14 Pro` / `iPhone SE`
- `Pixel 5` / `Galaxy S9+`
- `iPad Pro 11`

See the full list in the [Playwright device registry](https://playwright.dev/docs/emulation#devices).
