# AmazeWow

AmazeWow is an independent Astro application stored inside the `bungus` repository. It does not import files, styles, scripts, or dependencies from the legacy Hangman page.

## Local development

```sh
cd amazewow-astro
npm install
npm run dev
```

## Build

```sh
npm run build
```

Astro writes the production build to `amazewow-astro/dist`.

## Publish into the existing GitHub Pages site

```sh
npm run publish:pages
```

That command builds the app and replaces the repository's `/AmazeWow` folder with the generated static output. The existing root application is not modified.

The configured public path is:

```text
https://magicaleb.github.io/bungus/AmazeWow/
```
