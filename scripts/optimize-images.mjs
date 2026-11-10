import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import sharp from 'sharp';

function parseArg(name, fallback) {
  const arg = process.argv.find((a) => a.startsWith(`--${name}=`));
  if (!arg) return fallback;
  const value = arg.split('=')[1];
  return value ?? fallback;
}

const maxKb = Number.parseInt(parseArg('maxKb', '200'), 10);
const maxWidth = Number.parseInt(parseArg('maxWidth', '1200'), 10);
const size = Number.parseInt(parseArg('size', ''), 10);
const fit = String(parseArg('fit', 'cover'));
const foldersArg = parseArg('folders', 'public/uploads');
const folders = foldersArg.split(',').map((s) => s.trim()).filter(Boolean);

const MAX_BYTES = Number.isFinite(maxKb) ? maxKb * 1024 : 200 * 1024;
const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png']);

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const out = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

function toWebpPath(inputFile) {
  const ext = path.extname(inputFile);
  return inputFile.slice(0, -ext.length) + '.webp';
}

async function ensureWebpUnderSize(inputFile) {
  const webpFile = toWebpPath(inputFile);

  const input = sharp(inputFile, { failOn: 'none' });
  const meta = await input.metadata();

  const resizeWidth = meta.width && meta.width > maxWidth ? maxWidth : null;

  let quality = 78;
  let lastSize = 0;
  while (quality >= 45) {
    const resizeOptions = Number.isFinite(size) && size > 0
      ? { width: size, height: size, fit: fit === 'contain' ? 'contain' : 'cover', withoutEnlargement: true }
      : (resizeWidth ? { width: resizeWidth, withoutEnlargement: true } : undefined);

    const buf = await sharp(inputFile, { failOn: 'none' })
      .rotate()
      .resize(resizeOptions)
      .webp({ quality, effort: 4 })
      .toBuffer();

    lastSize = buf.length;

    if (buf.length <= MAX_BYTES) {
      fs.writeFileSync(webpFile, buf);
      return { ok: true, inputFile, webpFile, bytes: buf.length, quality };
    }

    quality -= 6;
  }

  // Fallback: write best-effort output anyway.
  const buf = await sharp(inputFile, { failOn: 'none' })
    .rotate()
    .resize(
      Number.isFinite(size) && size > 0
        ? { width: size, height: size, fit: fit === 'contain' ? 'contain' : 'cover', withoutEnlargement: true }
        : (resizeWidth ? { width: resizeWidth, withoutEnlargement: true } : undefined)
    )
    .webp({ quality: 45, effort: 4 })
    .toBuffer();
  fs.writeFileSync(webpFile, buf);
  return { ok: false, inputFile, webpFile, bytes: buf.length, quality: 45 };
}

async function main() {
  const root = process.cwd();

  const inputs = folders.flatMap((f) => walk(path.join(root, f)))
    .filter((file) => IMAGE_EXTS.has(path.extname(file).toLowerCase()));

  if (!inputs.length) {
    console.log('No .jpg/.jpeg/.png images found in:', folders.join(', '));
    return;
  }

  console.log(`Optimizing ${inputs.length} images to WebP (target <= ${maxKb}KB, maxWidth=${maxWidth})...`);
  if (Number.isFinite(size) && size > 0) {
    console.log(`Square size enabled: ${size}x${size} (fit=${fit})`);
  }

  let okCount = 0;
  let warnCount = 0;

  for (const file of inputs) {
    try {
      const res = await ensureWebpUnderSize(file);
      const relIn = path.relative(root, res.inputFile);
      const relOut = path.relative(root, res.webpFile);
      const kb = Math.round(res.bytes / 1024);
      if (res.ok) {
        okCount += 1;
        console.log(`✓ ${relIn} -> ${relOut} (${kb}KB, q=${res.quality})`);
      } else {
        warnCount += 1;
        console.log(`! ${relIn} -> ${relOut} (${kb}KB, q=${res.quality}) still above target`);
      }
    } catch (e) {
      warnCount += 1;
      console.log(`! Failed: ${path.relative(root, file)} (${e?.message || e})`);
    }
  }

  console.log(`Done. ok=${okCount}, warnings=${warnCount}`);
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
