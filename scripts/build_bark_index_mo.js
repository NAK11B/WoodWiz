/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const jimpModule = require("jimp");
const Jimp = jimpModule.Jimp || jimpModule.default || jimpModule;

// === MISSOURI DATASET PATH ===
const DATASET_DIR = path.join(
  __dirname,
  "..",
  "assets",
  "images",
  "WoodWiz Image Database - Missouri"
);

// === OUTPUT INDEX FILE (SAFE TO COMMIT) ===
const OUT_FILE = path.join(__dirname, "..", "data", "bark_index.json");

// Feature settings
const BINS = 4;

function clamp01(x) {
  return Math.max(0, Math.min(1, x));
}

function binIndex(v) {
  const b = Math.floor((v / 256) * BINS);
  return Math.min(BINS - 1, Math.max(0, b));
}

function extractFeaturesFromRGBA(rgba, w, h) {
  const histLen = BINS * BINS * BINS;
  const hist = new Array(histLen).fill(0);

  let edgeSum = 0;
  let edgeCount = 0;

  function grayAt(x, y) {
    const idx = (y * w + x) * 4;
    const r = rgba[idx + 0];
    const g = rgba[idx + 1];
    const b = rgba[idx + 2];
    return 0.299 * r + 0.587 * g + 0.114 * b;
  }

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      const r = rgba[idx + 0];
      const g = rgba[idx + 1];
      const b = rgba[idx + 2];

      const ri = binIndex(r);
      const gi = binIndex(g);
      const bi = binIndex(b);
      const hi = (ri * BINS + gi) * BINS + bi;
      hist[hi] += 1;

      if (x > 0 && x < w - 1 && y > 0 && y < h - 1) {
        const gx = grayAt(x + 1, y) - grayAt(x - 1, y);
        const gy = grayAt(x, y + 1) - grayAt(x, y - 1);
        const mag = Math.sqrt(gx * gx + gy * gy);
        edgeSum += mag;
        edgeCount += 1;
      }
    }
  }

  const total = w * h;
  for (let i = 0; i < hist.length; i++) hist[i] /= total;

  const edgeAvg = edgeCount > 0 ? edgeSum / edgeCount : 0;
  const edgeNorm = clamp01(edgeAvg / 100);

  return { hist, edge: edgeNorm };
}

async function processImage(filePath) {
  const reader =
    Jimp && typeof Jimp.read === "function"
      ? Jimp
      : jimpModule && jimpModule.Jimp && typeof jimpModule.Jimp.read === "function"
        ? jimpModule.Jimp
        : null;

  if (!reader) {
    throw new Error("Jimp reader not found (read() missing).");
  }

  const img = await reader.read(filePath);
  img.resize(64, 64);

  const { data, width, height } = img.bitmap;
  return extractFeaturesFromRGBA(data, width, height);
}

async function main() {
  if (!fs.existsSync(DATASET_DIR)) {
    console.error("Dataset folder not found:");
    console.error(DATASET_DIR);
    process.exit(1);
  }

  console.log("Scanning dataset:", DATASET_DIR);

  const speciesDirs = fs
    .readdirSync(DATASET_DIR)
    .map((d) => path.join(DATASET_DIR, d))
    .filter((p) => fs.statSync(p).isDirectory());

  if (speciesDirs.length === 0) {
    console.error("No species folders found.");
    process.exit(1);
  }

  const entries = [];

  for (const spDir of speciesDirs) {
    const speciesKey = path.basename(spDir);

    // Expected structure: <speciesKey>/bark/<images>
    const barkDir = path.join(spDir, "bark");

    if (!fs.existsSync(barkDir)) {
      console.warn(`Skipping ${speciesKey} (no bark folder)`);
      continue;
    }

    const files = fs
      .readdirSync(barkDir)
      .filter((f) => /\.(jpg|jpeg|png|webp|jfif)$/i.test(f))
      .map((f) => path.join(barkDir, f));

    if (files.length === 0) {
      console.warn(`Skipping ${speciesKey} (no images found)`);
      continue;
    }

    for (const f of files) {
      try {
        const feats = await processImage(f);
        entries.push({
          speciesKey,
          filename: path.relative(DATASET_DIR, f).replace(/\\/g, "/"),
          features: feats,
        });
        console.log(`Indexed: ${speciesKey}/${path.basename(f)}`);
      } catch (e) {
        console.warn(`Skipping ${f}: ${e.message}`);
      }
    }
  }

  const out = {
    version: 1,
    generatedAt: new Date().toISOString(),
    bins: BINS,
    size: 64,
    entries,
  };

  fs.writeFileSync(OUT_FILE, JSON.stringify(out, null, 2), "utf-8");

  console.log("\n===============================");
  console.log(`Wrote index: ${OUT_FILE}`);
  console.log(`Total Entries: ${entries.length}`);
  console.log("===============================\n");
}

main().catch((e) => {
  console.error("Fatal error:", e);
  process.exit(1);
});
