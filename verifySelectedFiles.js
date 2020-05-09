const alfy = require("alfy");
const exec = require("child-process-promise").exec;
const FileType = require("file-type");
const fs = require("fs");
const alfredNotifier = require("alfred-notifier");

alfredNotifier();

const TARGET_FILE_TYPES = ["jpg", "png", "gif"];

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

// validate env variables
const isValidEnvVariables = (
  jpegQuality,
  pngMaxQuality,
  pngMinQuality,
  gifOptimizationLevel
) => {
  const validJpegQuality = 0 < jpegQuality && jpegQuality < 100;
  const validPngQuality =
    0 < pngMaxQuality &&
    pngMaxQuality < 1 &&
    0 < pngMinQuality &&
    pngMinQuality < 1 &&
    pngMinQuality < pngMaxQuality;
  const validGifOptimizationLevel =
    gifOptimizationLevel === 1 ||
    gifOptimizationLevel === 2 ||
    gifOptimizationLevel === 3;
  return validJpegQuality && validPngQuality && validGifOptimizationLevel;
};

if (
  !isValidEnvVariables(
    jpegQuality,
    pngMaxQuality,
    pngMinQuality,
    gifOptimizationLevel
  )
) {
  console.log("ERROR: Invalid environment variables");
  return;
}

// get selected files
const result = await exec("automator get_selection.workflow");

if (!result | result.stderr) {
  console.log(`ERROR: Nothing selected.`);
  return;
}

// convert file paths
const files = result.stdout.match(/".+?\"/g).map((f) => f.slice(1, -1));

// verify contain directory
const isContainDir = files.some((f) => fs.statSync(f).isDirectory());

if (isContainDir) {
  console.log("ERROR: Selected directory.");
  return;
}

// verify file type
const fileTypes = await Promise.all(
  files.map(async (f) => {
    return await FileType.fromFile(f);
  })
);

const isTargetFileType = fileTypes.every((f) =>
  TARGET_FILE_TYPES.includes(f && f.ext)
);

if (!isTargetFileType) {
  console.log("ERROR: selected an invalid file type.");
  return;
}

console.log(files.join("///"));
