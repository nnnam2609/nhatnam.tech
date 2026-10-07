// Optional asset export, using Sharp already supplied by Astro.
// SVG masters are self-contained: Inter glyphs are paths, with no font downloads.
import { readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';
import { brand } from '../src/data/brand.ts';

const root = new URL('../public/', import.meta.url);
const mark = `<path fill="${brand.paper}" d="${brand.markPath}"/>`;
const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><rect width="32" height="32" fill="${brand.accent}"/><g transform="translate(2 2) scale(.875)">${mark}</g></svg>`;
const apple = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180"><rect width="180" height="180" fill="${brand.accent}"/><g transform="translate(30 30) scale(3.75)">${mark}</g></svg>`;

await writeFile(new URL('og-image.png', root), await sharp(await readFile(new URL('og-image.svg', root))).png().toBuffer());
await writeFile(new URL('apple-touch-icon.png', root), await sharp(Buffer.from(apple)).png().toBuffer());

// ICO contains standard PNG entries at each browser fallback size.
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(size => sharp(Buffer.from(icon)).resize(size, size).png().toBuffer()));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
images.forEach((bytes, i) => {
  const entry = 6 + i * 16;
  header[entry] = header[entry + 1] = sizes[i];
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(bytes.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += bytes.length;
});
await writeFile(new URL('favicon.ico', root), Buffer.concat([header, ...images]));
console.log('Exported OG image, Apple touch icon, and 16/32/48px ICO.');
