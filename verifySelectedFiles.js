const alfy = require("alfy");
const exec = require("child-process-promise").exec;
const FileType = require("file-type");
const fs = require("fs");

const TARGET_FILE_TYPES = ["jpg", "png", "gif"];

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
  console.log("ERROR: select directory.");
  return;
}

// verify file type
const fileTypes = await Promise.all(
  files.map(async (f) => {
    return await FileType.fromFile(f);
  })
);

const isTargetFileType = fileTypes.every((f) =>
  TARGET_FILE_TYPES.includes(f.ext)
);

if (isTargetFileType) {
  console.log(files.join("///"));
} else {
  console.log("ERROR: select invalid file type.");
}
