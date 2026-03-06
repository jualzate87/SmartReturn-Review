#!/usr/bin/env node

/**
 * Fetches the latest IDS design tokens CSS from the DDMS CDN
 * and writes it to src/styles/intuit.css.
 *
 * Usage:
 *   node scripts/sync-tokens.mjs              # uses default version
 *   node scripts/sync-tokens.mjs 25.32.0      # uses specific version
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEFAULT_VERSION = '25.32.0';
const BASE_URL = 'https://uxfabric.intuitcdn.net/components/design-systems/tokens/ddms3.0/prod';
const OUTPUT_PATH = resolve(__dirname, '..', 'src', 'styles', 'intuit.css');

async function syncTokens() {
  const version = process.argv[2] || DEFAULT_VERSION;
  const url = `${BASE_URL}/${version}/css/intuit.css`;

  console.log(`Fetching IDS tokens v${version} from DDMS CDN...`);
  console.log(`  ${url}`);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const css = await response.text();

    mkdirSync(dirname(OUTPUT_PATH), { recursive: true });

    const header = `/* IDS Design Tokens - synced from DDMS CDN v${version} */\n/* Run "npm run sync-tokens" or "npm run sync-tokens <version>" to update */\n\n`;
    writeFileSync(OUTPUT_PATH, header + css, 'utf-8');

    console.log(`  Written to src/styles/intuit.css (${(css.length / 1024).toFixed(1)} KB)`);
  } catch (error) {
    if (process.env.npm_lifecycle_event === 'postinstall') {
      console.warn(`  Warning: Could not fetch tokens (${error.message}). Using existing intuit.css.`);
    } else {
      console.error(`  Error: ${error.message}`);
      process.exit(1);
    }
  }
}

syncTokens();
