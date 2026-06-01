// One-time image optimization for the brand guide.
// Originals are 24–36 MP camera files; the page displays them in frames a few
// hundred px wide. Resize the long edge to 1600px max (2x for the largest frame)
// and compress. Run from the project root: `node optimize-images.mjs`.
import sharp from 'sharp';
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const DIR = path.join('public', 'assets');
const MAX_EDGE = 1600;

const files = await readdir(DIR);
for (const name of files) {
  const file = path.join(DIR, name);
  const ext = path.extname(name).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;

  const before = (await stat(file)).size;
  const img = sharp(file, { failOn: 'none' });
  const meta = await img.metadata();
  const longEdge = Math.max(meta.width, meta.height);

  let pipeline = img.rotate(); // respect EXIF orientation
  if (longEdge > MAX_EDGE) {
    pipeline = pipeline.resize({
      width: meta.width >= meta.height ? MAX_EDGE : null,
      height: meta.height > meta.width ? MAX_EDGE : null,
      withoutEnlargement: true,
    });
  }

  if (ext === '.png') {
    pipeline = pipeline.png({ compressionLevel: 9, palette: true, quality: 90 });
  } else {
    pipeline = pipeline.jpeg({ quality: 80, mozjpeg: true });
  }

  const buf = await pipeline.toBuffer();
  await sharp(buf).toFile(file + '.tmp');
  const { rename } = await import('node:fs/promises');
  await rename(file + '.tmp', file);

  const after = (await stat(file)).size;
  console.log(
    `${name.padEnd(26)} ${(before / 1024 / 1024).toFixed(1)}MB -> ${(after / 1024).toFixed(0)}KB`
  );
}
