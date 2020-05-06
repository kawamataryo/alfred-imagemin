const alfy = require("alfy");
const exec = require("child-process-promise").exec;
const imagemin = require("imagemin");
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminGifsicle = require('imagemin-gifsicle');
const imageminSvgo = require('imagemin-svgo');

// TODO: selectedがない場合のエラー表示
const { stdout: selected, stderr } = await exec("automator get_selection.workflow");

if (stderr) {
  alfy.output(`stderr: ${stderr}`);
  return;
}

const files = selected.match(/".+?\"/g).map((f) => f.slice(1, -1));

//TODO: 空白文字を含む場合のファイル名指定した場合の対応
const { stdout: outDir } = await exec(`dirname ${files[0]}`)

await imagemin(files, {
  destination: `${outDir.trim()}/shrink`,
  plugins: [
    imageminMozjpeg({ quality: 80 }),
    imageminPngquant({ quality: '65-80' }),
    imageminGifsicle(),
    imageminSvgo({ optimizationLevel: 3 })
	],
});

// TODO: 完了のアウトプット