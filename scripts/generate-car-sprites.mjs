import sharp from 'sharp';

const SIZES = [
  { suffix: '', scale: 1, quality: 85 },
  { suffix: '_mobile', scale: 0.5, quality: 80 },
];

const CARS = [
  {
    name: 'ferrari_bianca_360',
    dir: 'ferrari_bianca_360',
    frames: 5,
  },
  {
    name: 'ferrari_rossa_360',
    dir: 'ferrari_rossa_360',
    frames: 9,
  },
];

async function generateSprite(car, suffix, scale, quality) {
  const INPUT_DIR = `public/images/${car.dir}`;
  const OUTPUT_PATH = `public/images/${car.dir.replace('_360', '_sprite')}${suffix}.webp`;

  // ─── Leer dimensiones de los frames ───
  const frames = [];
  for (let i = 0; i < car.frames; i++) {
    const padded = String(i + 1).padStart(3, '0');
    const padded2 = String(i + 1).padStart(2, '0');
    let file;
    try {
      const m1 = await sharp(`${INPUT_DIR}/frame_${padded}.webp`).metadata();
      file = `frame_${padded}.webp`;
      frames.push({ file, width: m1.width, height: m1.height });
    } catch {
      const m2 = await sharp(`${INPUT_DIR}/frame_${padded2}.webp`).metadata();
      file = `frame_${padded2}.webp`;
      frames.push({ file, width: m2.width, height: m2.height });
    }
  }

  // ─── Slot size escalado ───
  const SLOT_W = Math.round(Math.max(...frames.map((f) => f.width)) * scale);
  const SLOT_H = Math.round(Math.max(...frames.map((f) => f.height)) * scale);
  const TOTAL_W = SLOT_W * frames.length;

  console.log(`  ${suffix || 'full'}: ${TOTAL_W}x${SLOT_H} (slot: ${SLOT_W}x${SLOT_H})`);

  // ─── Crear canvas base ───
  const canvas = sharp({
    create: {
      width: TOTAL_W,
      height: SLOT_H,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  });

  // ─── Componer cada frame en su slot ───
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
    .webp({ quality, alphaQuality: 90 })
    .toFile(OUTPUT_PATH);

  const stats = await sharp(OUTPUT_PATH).metadata();
  console.log(`  ✅ ${OUTPUT_PATH} (${(stats.size / 1024).toFixed(0)} KB)`);

  return { slotW: SLOT_W, slotH: SLOT_H, frames: car.frames };
}

for (const car of CARS) {
  console.log(`\n🚗 ${car.name} (${car.frames} frames)`);
  for (const size of SIZES) {
    await generateSprite(car, size.suffix, size.scale, size.quality);
  }
}

console.log('\n✅ Todos los sprite sheets responsive generados');
