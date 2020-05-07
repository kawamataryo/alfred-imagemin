const alfy = require("alfy");
const exec = require("child-process-promise").exec;
const imagemin = require("imagemin");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminPngquant = require("imagemin-pngquant");
const imageminGifsicle = require("imagemin-gifsicle");
const alfredNotifier = require("alfred-notifier");

alfredNotifier();

// TODO: 環境変数のvalidate
const jpegQuality = process.env.JPEG_QUALITY || 80;
const pngMaxQuality = process.env.PNG_MAX_QUALITY || 0.8;
const pngMinQuality = process.env.PNG_MIN_QUALITY || 0.65;
const gifOptimizationLevel = process.env.GIF_OPTIMIZATION_LEVEL || 3;

const result = await exec("automator get_selection.workflow");

if (!result | result.stderr) {
	console.log(`ERROR: Nothing selected.`);
	return;
}

const files = result.stdout.match(/".+?\"/g).map((f) => f.slice(1, -1));

const { stdout: outDir } = await exec(`dirname "${files[0]}"`);

await imagemin(files, {
  destination: `${outDir.trim()}/shrink`,
  plugins: [
    imageminMozjpeg({ quality: jpegQuality }),
    imageminPngquant({ quality: [pngMinQuality, pngMaxQuality] }),
    imageminGifsicle({ optimizationLevel: gifOptimizationLevel }),
  ],
});

console.log("Minify completed");
