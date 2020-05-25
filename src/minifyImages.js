const path = require("path");
const imagemin = require("imagemin");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminPngquant = require("imagemin-pngquant");
const imageminGifsicle = require("imagemin-gifsicle");

const argv = process.argv[2];

const files = argv.split("///");

const outDir = path.dirname(files[0]);

const jpegQuality = process.env.JPEG_QUALITY
  ? Number(process.env.JPEG_QUALITY)
  : 70;
const pngMaxQuality = process.env.PNG_MAX_QUALITY
  ? Number(process.env.PNG_MAX_QUALITY)
  : 0.6;
const pngMinQuality = process.env.PNG_MIN_QUALITY
  ? Number(process.env.PNG_MIN_QUALITY)
  : 0.5;
const gifOptimizationLevel = process.env.GIF_OPTIMIZATION_LEVEL
  ? Number(process.env.GIF_OPTIMIZATION_LEVEL)
  : 3;
const outputDir = process.env.OUTPUT_DIR
  ? process.env.OUTPUT_DIR
  : "optimized_images";

// minify images
await imagemin(files, {
  destination: `${outDir.trim()}/${outputDir}`,
  plugins: [
    imageminMozjpeg({ quality: jpegQuality }),
    imageminPngquant({ quality: [pngMinQuality, pngMaxQuality] }),
    imageminGifsicle({ optimizationLevel: gifOptimizationLevel }),
  ],
});

console.log("Processing completed successfully.");
console.log(`Optimized ${files.length} files.`);
