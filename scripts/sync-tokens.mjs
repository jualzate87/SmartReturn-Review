#!/usr/bin/env node

/**
 * Fetches IDS design tokens CSS from the DDMS CDN
 * and writes them to src/styles/.
 *
 * Usage:
 *   node scripts/sync-tokens.mjs                          # fetches default theme (intuit)
 *   node scripts/sync-tokens.mjs 25.32.0                  # specific version, default theme
 *   node scripts/sync-tokens.mjs 25.32.0 intuitaccountantsuite  # specific version + theme
 *   node scripts/sync-tokens.mjs --all                    # fetches all themes
 *   node scripts/sync-tokens.mjs 25.32.0 --all            # specific version, all themes
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEFAULT_VERSION = '25.32.0';
const BASE_URL = 'https://uxfabric.intuitcdn.net/components/design-systems/tokens/ddms3.0/prod';
const STYLES_DIR = resolve(__dirname, '..', 'src', 'styles');

const THEMES = {
  intuit: 'intuit.css',
  intuitaccountantsuite: 'intuitaccountantsuite.css',
  intuitenterprisesuite: 'intuitenterprisesuite.css',
  gbsgexperimental: 'gbsgexperimental.css',
};

async function fetchTheme(version, themeName) {
  const cssFile = THEMES[themeName];
  if (!cssFile) {
    throw new Error(`Unknown theme "${themeName}". Available: ${Object.keys(THEMES).join(', ')}`);
  }

  const url = `${BASE_URL}/${version}/css/${cssFile}`;
  const outputPath = resolve(STYLES_DIR, cssFile);

  console.log(`  Fetching ${themeName} tokens...`);
  console.log(`    ${url}`);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText} for ${themeName}`);
  }

  const css = await response.text();

  mkdirSync(dirname(outputPath), { recursive: true });

  const header = `/* IDS Design Tokens (${themeName}) - synced from DDMS CDN v${version} */\n/* Run "npm run sync-tokens" to update */\n\n`;
  writeFileSync(outputPath, header + css, 'utf-8');

  console.log(`    Written to src/styles/${cssFile} (${(css.length / 1024).toFixed(1)} KB)`);
}

async function syncTokens() {
  const args = process.argv.slice(2);
  const fetchAll = args.includes('--all');
  const positionalArgs = args.filter(a => !a.startsWith('--'));

  const version = positionalArgs[0] || DEFAULT_VERSION;
  const themeName = positionalArgs[1] || 'intuit';

  console.log(`Fetching IDS tokens v${version} from DDMS CDN...`);

  try {
    if (fetchAll) {
      for (const name of Object.keys(THEMES)) {
        try {
          await fetchTheme(version, name);
        } catch (err) {
          console.warn(`    Warning: Could not fetch ${name} (${err.message}). Skipping.`);
        }
      }
    } else {
      await fetchTheme(version, themeName);
    }

    console.log('Done.');
  } catch (error) {
    if (process.env.npm_lifecycle_event === 'postinstall') {
      console.warn(`  Warning: Could not fetch tokens (${error.message}). Using existing CSS.`);
    } else {
      console.error(`  Error: ${error.message}`);
      process.exit(1);
    }
  }
}

syncTokens();
