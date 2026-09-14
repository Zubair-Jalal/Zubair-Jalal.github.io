#!/usr/bin/env node
// Prepares image assets for the static export:
//   1. Generates responsive WebP variants for the portrait and project
//      screenshots (this is a static export with images.unoptimized: true,
//      so Next can't do this automatically at request time).
//   2. Generates a dedicated Open Graph / social-card image.
//
// Re-run this whenever an image under public/images/ is added or replaced:
//   npm run build-images

import sharp from "sharp";
import { readdirSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const publicDir = path.join(root, "public");

const VARIANT_SUFFIX = /-(\d+)\.webp$/i;
const SOURCE_EXT = /\.(png|jpe?g)$/i;

async function generateVariants(filePath, widths) {
  const dir = path.dirname(filePath);
  const base = path.basename(filePath).replace(SOURCE_EXT, "");

  for (const width of widths) {
    const outPath = path.join(dir, `${base}-${width}.webp`);
    await sharp(filePath)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(outPath);
    console.log(`  ${path.relative(root, outPath)}`);
  }
}

async function buildPortraitVariants() {
  const portrait = path.join(publicDir, "images", "portrait.jpeg");
  if (!existsSync(portrait)) {
    console.log("Skipping portrait variants: public/images/portrait.jpeg not found.");
    return;
  }
  console.log("Portrait variants:");
  await generateVariants(portrait, [300, 600]);
}

async function buildProjectVariants() {
  const projectsDir = path.join(publicDir, "images", "projects");
  if (!existsSync(projectsDir)) {
    console.log("Skipping project variants: public/images/projects not found.");
    return;
  }
  const files = readdirSync(projectsDir).filter(
    (f) => SOURCE_EXT.test(f) && !VARIANT_SUFFIX.test(f)
  );
  console.log(`Project screenshot variants (${files.length} source images):`);
  for (const file of files) {
    await generateVariants(path.join(projectsDir, file), [640, 1280]);
  }
}

async function buildOgImage() {
  const portrait = path.join(publicDir, "images", "portrait.jpeg");
  const outPath = path.join(publicDir, "images", "og-image.jpg");

  const WIDTH = 1200;
  const HEIGHT = 630;
  const INK = "#0f1b2d";
  const TEAL = "#1b4b5a";
  const SLATE = "#5b6b73";
  const PAPER = "#faf9f6";
  const HAIRLINE = "#e3e7e6";

  const base = sharp({
    create: { width: WIDTH, height: HEIGHT, channels: 3, background: PAPER },
  });

  const composites = [];

  if (existsSync(portrait)) {
    const diameter = 380;
    const circleMask = Buffer.from(
      `<svg width="${diameter}" height="${diameter}"><circle cx="${diameter / 2}" cy="${diameter / 2}" r="${diameter / 2}" fill="#fff"/></svg>`
    );
    const squarePortrait = await sharp(portrait)
      .resize(diameter, diameter, { fit: "cover" })
      .toBuffer();
    const circularPortrait = await sharp(squarePortrait)
      .composite([{ input: circleMask, blend: "dest-in" }])
      .png()
      .toBuffer();
    composites.push({
      input: circularPortrait,
      left: WIDTH - diameter - 90,
      top: Math.round((HEIGHT - diameter) / 2),
    });
  }

  const textSvg = `
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <style>
        .name { font-family: Georgia, 'Times New Roman', serif; font-size: 58px; fill: ${INK}; }
        .headline { font-family: Georgia, 'Times New Roman', serif; font-size: 38px; fill: ${TEAL}; }
        .meta { font-family: Helvetica, Arial, sans-serif; font-size: 26px; fill: ${SLATE}; }
      </style>
      <text x="80" y="230" class="name">Zubair Mosimanegape</text>
      <text x="80" y="298" class="name">Jalal</text>
      <text x="80" y="356" class="headline">Data Scientist &amp; Analyst</text>
      <line x1="80" y1="400" x2="480" y2="400" stroke="${HAIRLINE}" stroke-width="2" />
      <text x="80" y="450" class="meta">MSc Data Science, University of Leicester</text>
      <text x="80" y="486" class="meta">BSc Mathematics and Economics, University of Liverpool</text>
    </svg>
  `;
  composites.push({ input: Buffer.from(textSvg), left: 0, top: 0 });

  await base.composite(composites).jpeg({ quality: 88, mozjpeg: true }).toFile(outPath);
  console.log(`  ${path.relative(root, outPath)}`);
}

console.log("Building responsive image variants...");
await buildPortraitVariants();
await buildProjectVariants();
console.log("Building Open Graph image...");
await buildOgImage();
console.log("Done.");
