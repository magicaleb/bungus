import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://magicaleb.github.io',
  base: '/bungus/AmazeWow',
  output: 'static',
  build: {
    assets: 'assets'
  }
});
