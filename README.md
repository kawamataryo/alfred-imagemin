# alfred-imagemin
Minify images with Imagemin.
3 file formats supported. `PNG`, `JPEG`, `GIF`

![minify-demo](https://user-images.githubusercontent.com/11070996/82765622-660fb100-9e53-11ea-876f-c353f69312e4.gif)


## Install
Requires the Alfred 3 or 4 [Powerpack](https://www.alfredapp.com/powerpack/), [Node.js](https://nodejs.org) 8+.

#### With NPM
~~Install with npm.~~

~~$ npm install --global alfred-imagemin~~

**2020/12/07**  
Installation on npm will fail because of this [issue](https://github.com/SamVerschueren/alfred-link/issues/22).  
Please install manually from [here](https://github.com/kawamataryo/alfred-gyazo-uploader/releases)

#### Manually
[download the workflow directly](https://github.com/kawamataryo/alfred-imagemin/releases).

## Usage

1. Select images on finder.
2. Open alfred and type `imagemin` and press the Enter key.
3. Output minify images in `optimized_images` folder.

## Configuration
You can set the compression rate and output dir with an environment variable.

|name|default|value|
|---|---|---|
|JPEG_QUALITY | 70 | Option to [imagemin-mozjpeg](https://github.com/imagemin/imagemin-mozjpeg#quality). Compression quality, in range 0 (worst) to 100 (perfect) |
|PNG_MAX_QUALITY | 0.6 | Option to [imagemin-pngquant](https://github.com/imagemin/imagemin-pngquant#quality). Compression max quality, in range 0 to 1|
|PNG_MIN_QUALITY | 0.5 | Option to [imagemin-pngquant](https://github.com/imagemin/imagemin-pngquant#quality). Compression min quality, in range 0 to 1|
|GIF_OPTIMIZATION_LEVEL | 3 | Option to [imagemin-gifsicle](https://github.com/imagemin/imagemin-gifsicle#optimizationlevel). Select an optimization level between 1 and 3.|
|OUTPUT_DIR | optimized_images | Optimized image output directory name |

## Related

- [alfy](https://github.com/sindresorhus/alfy) - Create Alfred workflows with ease
- [imagemin](https://github.com/imagemin/imagemin#readme) - Minify images seamlessly
- [imagemin-pngquant](https://github.com/imagemin/imagemin-pngquant) -  Imagemin plugin for `pngquant`
- [imagemin-mozjpeg](https://github.com/imagemin/imagemin-mozjpeg) - Imagemin plugin for `mozjpeg`
- [imagemin-gifsicle](https://github.com/imagemin/imagemin-gifsicle#optimizationlevel) - - Imagemin plugin for `gifsicle`

## License

MIT ©
