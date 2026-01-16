/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

// ✅ Adjust if your path is different
const IMAGE_ROOT = path.join(
  __dirname,
  "..",
  "assets",
  "images",
  "WoodWiz Image Database"
);

const OUTPUT_FILE = path.join(__dirname, "..", "data", "barkImages.ts");

function isImageFile(name) {
  const lower = name.toLowerCase();
  return lower.endsWith(".jpg") || lower.endsWith(".jpeg") || lower.endsWith(".png");
}

function numericSort(a, b) {
  // sorts "1.jpg, 2.jpg, 10.jpg" correctly
  const na = parseInt(a, 10);
  const nb = parseInt(b, 10);
  if (!Number.isNaN(na) && !Number.isNaN(nb)) return na - nb;
  return a.localeCompare(b);
}

function main() {
  if (!fs.existsSync(IMAGE_ROOT)) {
    console.error("❌ IMAGE_ROOT not found:", IMAGE_ROOT);
    process.exit(1);
  }

  const speciesDirs = fs
    .readdirSync(IMAGE_ROOT, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  const lines = [];
  lines.push("/* AUTO-GENERATED FILE — DO NOT EDIT BY HAND */");
  lines.push("/* Run: node scripts/generateBarkImageMap.js */");
  lines.push("");
  lines.push("export const BARK_IMAGES: Record<string, any[]> = {");

  let speciesCount = 0;
  let imageCount = 0;

  for (const id of speciesDirs) {
    const barkDir = path.join(IMAGE_ROOT, id, "bark");
    if (!fs.existsSync(barkDir)) continue;

    const imgs = fs
      .readdirSync(barkDir)
      .filter(isImageFile)
      .sort(numericSort);

    if (imgs.length === 0) continue;

    speciesCount += 1;
    imageCount += imgs.length;

    lines.push(`  "${id}": [`);

    for (const imgName of imgs) {
      // IMPORTANT: this must match your Expo asset path from project root
      const rel = `../assets/images/WoodWiz Image Database/${id}/bark/${imgName}`;
      lines.push(`    require("${rel}"),`);
    }

    lines.push("  ],");
  }

  lines.push("};");
  lines.push("");
  lines.push(`export const BARK_IMAGE_SPECIES_COUNT = ${speciesCount};`);
  lines.push(`export const BARK_IMAGE_TOTAL_COUNT = ${imageCount};`);
  lines.push("");

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, lines.join("\n"), "utf8");

  console.log("✅ Generated:", OUTPUT_FILE);
  console.log("✅ Species:", speciesCount);
  console.log("✅ Images:", imageCount);
}

main();
