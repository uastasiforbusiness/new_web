import sharp from 'sharp';
import { readdirSync } from 'fs';

const INPUT_DIR = 'public/images/yacht_360';

const SIZES = [
  { suffix: '', scale: 1, quality: 85 },
  { suffix: '_mobile', scale: 0.5, quality: 80 },
];

const frameFiles = ['frame_001.webp', 'frame_002.webp', 'frame_003.webp', 'frame_004.webp', 'frame_005.webp'];

const frames = await Promise.all(
  frameFiles.map(async (file) => {
    const meta = await sharp(`${INPUT_DIR}/${file}`).metadata();
    return { file, width: meta.width, height: meta.height };
  })
);

console.log('📐 Original frame dimensions:');
frames.forEach((f) => console.log(`  ${f.file}: ${f.width}x${f.height}`));

for (const size of SIZES) {
  const OUTPUT_PATH = `public/images/yacht_360_sprite${size.suffix}.webp`;

  const SLOT_W = Math.round(Math.max(...frames.map((f) => f.width)) * size.scale);
  const SLOT_H = Math.round(Math.max(...frames.map((f) => f.height)) * size.scale);
  const TOTAL_W = SLOT_W * frames.length;

  console.log(`\n🧩 ${size.suffix || 'full'}: ${TOTAL_W}x${SLOT_H} (slot: ${SLOT_W}x${SLOT_H})`);

  const canvas = sharp({
    create: {
      width: TOTAL_W,
      height: SLOT_H,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  });

  const composites = await Promise.all(
    frames.map(async (frame, i) => {
      const left = i * SLOT_W;
      const resized = await sharp(`${INPUT_DIR}/${frame.file}`)
        .resize({
          width: SLOT_W,
          height: SLOT_H,
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .toBuffer();
      return { input: resized, left, top: 0 };
    })
  );

  await canvas
    .composite(composites)
    .webp({ quality: size.quality, alphaQuality: 90 })
    .toFile(OUTPUT_PATH);

  const stats = await sharp(OUTPUT_PATH).metadata();
  console.log(`  ✅ ${OUTPUT_PATH} (${(stats.size / 1024).toFixed(0)} KB)`);
}

console.log('\n✅ Todos los sprite sheets responsive del yate generados');
