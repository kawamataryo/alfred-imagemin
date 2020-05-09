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
  : 80;
const pngMaxQuality = process.env.PNG_MAX_QUALITY
  ? Number(process.env.PNG_MAX_QUALITY)
  : 0.8;
const pngMinQuality = process.env.PNG_MIN_QUALITY
  ? Number(process.env.PNG_MIN_QUALITY)
  : 0.65;
const gifOptimizationLevel = process.env.GIF_OPTIMIZATION_LEVEL
  ? Number(process.env.GIF_OPTIMIZATION_LEVEL)
  : 3;

// minify images
await imagemin(files, {
  destination: `${outDir.trim()}/shrink`,
  plugins: [
    imageminMozjpeg({ quality: jpegQuality }),
    imageminPngquant({ quality: [pngMinQuality, pngMaxQuality] }),
    imageminGifsicle({ optimizationLevel: gifOptimizationLevel }),
  ],
});

console.log("Processing completed successfully.");
console.log(`Minified ${files.length} files.`);