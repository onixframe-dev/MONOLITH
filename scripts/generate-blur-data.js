/**
 * Generates blur-data preview strings for all images in public/images.
 *
 * Usage:  npm run generate:blur
 *
 * Output: src/lib/blur-data.ts  (auto-generated, safe to commit)
 *
 * This script is idempotent: it regenerates every time and never
 * modifies the original source images. The blur previews are tiny
 * (~20px) WebP data URIs used as Next.js Image placeholders.
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMG_DIR = path.join(__dirname, '..', 'public', 'images');
const PATH_PUBLIC = path.join(__dirname, '..', 'public');
const OUTPUT = path.join(__dirname, '..', 'src', 'lib', 'blur-data.ts');

function walk(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walk(fullPath));
    } else if (entry.isFile() && /\.(webp|jpg|jpeg|png|avif)$/i.test(entry.name)) {
      results.push(fullPath);
    }
  }
  return results;
}

async function generate() {
  const files = walk(IMG_DIR);
  const entries = {};

  for (const file of files) {
        const relPath = '/' + path.relative(PATH_PUBLIC, file).replace(/\\/g, '/');
    const buffer = await sharp(file)
      .resize(20, 20, { fit: 'inside' })
      .webp({ quality: 20 })
      .toBuffer();
    entries[relPath] = `data:image/webp;base64,${buffer.toString('base64')}`;
  }

  const content = `// AUTO-GENERATED FILE — DO NOT EDIT MANUALLY\n// Run "npm run generate:blur" to regenerate.\n\nexport const blurData: Record<string, string> = ${JSON.stringify(entries, null, 2)};\n`;

  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, content, 'utf8');
  console.log(`✓ Generated ${OUTPUT} — ${Object.keys(entries).length} blur entries`);
}

generate().catch((err) => {
  console.error('✗ Blur-data generation failed:', err);
  process.exit(1);
});
