import { cp, mkdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const buildDirectory = fileURLToPath(new URL('../dist/', import.meta.url));
const pagesDirectory = fileURLToPath(new URL('../../AmazeWow/', import.meta.url));

await rm(pagesDirectory, { recursive: true, force: true });
await mkdir(pagesDirectory, { recursive: true });
await cp(buildDirectory, pagesDirectory, { recursive: true });

console.log('Published the Astro build to /AmazeWow.');
