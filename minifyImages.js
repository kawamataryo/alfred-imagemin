const alfy = require("alfy");
const exec = require("child-process-promise").exec;
const imagemin = require("imagemin");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminPngquant = require("imagemin-pngquant");
const imageminGifsicle = require("imagemin-gifsicle");
const alfredNotifier = require("alfred-notifier");

// validate env variables
const jpegQuality = process.env.JPEG_QUALITY ? Number(process.env.JPEG_QUALITY) : 80;
const pngMaxQuality = process.env.PNG_MAX_QUALITY ? Number(process.env.PNG_MAX_QUALITY) : 0.8;
const pngMinQuality = process.env.PNG_MIN_QUALITY ? Number(process.env.PNG_MIN_QUALITY) : 0.65;
const gifOptimizationLevel = process.env.GIF_OPTIMIZATION_LEVEL ? Number(process.env.GIF_OPTIMIZATION_LEVEL) : 3;

const isValidEnvVariables = (jpegQuality, pngMaxQuality, pngMinQuality, gifOptimizationLevel)  => {
  const validJpegQuality = 0 < jpegQuality && jpegQuality < 100;
  const validPngQuality = 0 < pngMaxQuality && pngMaxQuality < 1 && 0 < pngMinQuality && pngMinQuality < 1 && pngMinQuality < pngMaxQuality;
  const validGifOptimizationLevel = gifOptimizationLevel === 1 || gifOptimizationLevel === 2 || gifOptimizationLevel === 3;
  return validJpegQuality && validPngQuality && validGifOptimizationLevel;
}

if(!isValidEnvVariables(jpegQuality, pngMaxQuality, pngMinQuality, gifOptimizationLevel)) {
  console.log("ERROR: Invalid environment variables");
  return;
}

const argv = process.argv[2];

if (!argv) {
  console.log(`ERROR: Unknown error.`);
  return;
}

const files = argv.split("///");

const { stdout: outDir } = await exec(`dirname "${files[0]}"`);


// minify images
await imagemin(files, {
  destination: `${outDir.trim()}/shrink`,
  plugins: [
    imageminMozjpeg({ quality: jpegQuality }),
    imageminPngquant({ quality: [pngMinQuality, pngMaxQuality] }),
    imageminGifsicle({ optimizationLevel: gifOptimizationLevel }),
  ],
});

console.log("Minify completed.");
