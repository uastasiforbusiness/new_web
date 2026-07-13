// One-off: duotone luxury treatment for intro image.
// Maps grayscale -> shadow #080808 to highlight champagne #e8d5af (project palette).
import sharp from 'sharp';
import fs from 'fs';

const SRC = 'C:/Users/gabri/Downloads/gemini-3-pro-image-preview-2k (nano-banana-pro)_a_devuelveme_esta_imge (1).png';

const SHADOW = [8, 8, 8];
const HIGHLIGHT = [232, 213, 175];

// Build 256-entry LUT (r,g,b triples)
const lut = new Uint8Array(256 * 3);
for (let i = 0; i < 256; i++) {
  const tt = Math.pow(i / 255, 1.15);
  lut[i * 3]     = Math.round(SHADOW[0] * (1 - tt) + HIGHLIGHT[0] * tt);
  lut[i * 3 + 1] = Math.round(SHADOW[1] * (1 - tt) + HIGHLIGHT[1] * tt);
  lut[i * 3 + 2] = Math.round(SHADOW[2] * (1 - tt) + HIGHLIGHT[2] * tt);
}

async function process(width, outPath) {
  // Stage 1: resize + flatten + normalise + grayscale -> PNG buffer (3 channels R=G=B)
  const pngBuf = await sharp(SRC)
    .resize({ width, withoutEnlargement: true })
    .flatten({ background: { r: 10, g: 10, b: 10 } })
    .normalise()
    .greyscale()
    .png()
    .toBuffer();

  // Get true dimensions of the processed image
  const meta = await sharp(pngBuf).metadata();
  const { width: w, height: h } = meta;

  // Stage 2: to raw RGB buffer
  const raw = await sharp(pngBuf).raw().toBuffer();

  // Stage 3: apply duotone LUT
  for (let i = 0; i < raw.length; i += 3) {
    const g = raw[i];
    raw[i]     = lut[g * 3];
    raw[i + 1] = lut[g * 3 + 1];
    raw[i + 2] = lut[g * 3 + 2];
  }

  // Stage 4: pack back and write WebP
  await sharp(raw, { raw: { width: w, height: h, channels: 3 } })
    .webp({ quality: 80, effort: 6 })
    .toFile(outPath);

  return Math.round(fs.statSync(outPath).size / 1024);
}

const mob = await process(900, 'public/images/intro-ferrari-mobile.webp');
const desk = await process(1600, 'public/images/intro-ferrari.webp');
console.log(`mobile  900px: ${mob} KB`);
console.log(`desktop 1600px: ${desk} KB`);
