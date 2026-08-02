// screenshot.js - Capture app screenshots emulating an iPhone screen
// Usage: node screenshot.js [url] [device]
// Example: node screenshot.js https://magicaleb.github.io/bungus/ "iPhone 12"

const { chromium, devices } = require('playwright');

const url = process.argv[2] || 'https://magicaleb.github.io/bungus/';
const deviceName = process.argv[3] || 'iPhone 12';
const outputPath = process.argv[4] || 'screenshot.png';

(async () => {
  const device = devices[deviceName];
  if (!device) {
    console.error(`Unknown device: "${deviceName}"`);
    console.error('Available devices include: iPhone 12, iPhone 14, iPhone SE, Pixel 5, ...');
    console.error('See the full list at: https://playwright.dev/docs/emulation#devices');
    process.exit(1);
  }

  const browser = await chromium.launch({
    args: ['--no-sandbox', '--disable-dev-shm-usage']
  });
  const context = await browser.newContext({ ...device });
  const page = await context.newPage();

  console.log(`Navigating to ${url} as ${deviceName}...`);
  await page.goto(url, { waitUntil: 'networkidle' });

  await page.screenshot({ path: outputPath, fullPage: false });
  console.log(`Screenshot saved to ${outputPath}`);

  await browser.close();
})();
