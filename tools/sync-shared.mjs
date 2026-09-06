/* Copy the shared tree files into this repo.   node tools/sync-shared.mjs
   The source is ../../labs-shared/tree/ (tree.js, tree-draw.js, the silhouettes); the
   Classification Lab copies the same files with its own build. Edit them there, then sync
   here and rebuild the lab, so the two pages draw the same tree. Runs the silhouette
   inliner afterwards, since a changed silhouette must reach index.html too. */
import { readFileSync, writeFileSync, copyFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = resolve(REPO, '../../labs-shared/tree');
if (!existsSync(SRC)) { console.error('labs-shared/tree not found at ' + SRC); process.exit(1); }
for (const f of ['tree.js', 'tree-draw.js']) copyFileSync(resolve(SRC, f), resolve(REPO, 'js', f));
mkdirSync(resolve(REPO, 'assets/silhouettes'), { recursive: true });
for (const f of readdirSync(resolve(SRC, 'silhouettes'))) copyFileSync(resolve(SRC, 'silhouettes', f), resolve(REPO, 'assets/silhouettes', f));
execFileSync('python3', [resolve(REPO, 'tools/inline-silhouettes.py')], { stdio: 'inherit' });
console.log('synced tree.js, tree-draw.js and the silhouettes from labs-shared/tree');
