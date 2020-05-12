# alfred-imagemin
Minify images with Imagemin.
3 file formats supported. `PNG`, `JPEG`, `GIF`

![minify-demo](https://user-images.githubusercontent.com/11070996/81453099-a3bdda00-91c3-11ea-89ba-1dd00ae6d95e.gif)


## Install
Requires the Alfred 3 or 4 [Powerpack](https://www.alfredapp.com/powerpack/), [Node.js](https://nodejs.org) 8+.

#### With NPM
Install with npm

```
$ npm install --global alfred-imagemin
```

#### Manually
[download the workflow directly](https://github.com/kawamataryo/alfred-imagemin/releases).

## Usage

1. Select images on finder
2. Open alfred and type `imagemin` and `enter` in Alfred.
3. Output minify images in `shrink` folder



## Configuration
Alfred environment variables.

|name|default|value|
|---|---|---|
|JPEG_QUALITY | 70 | Option to [imagemin-mozjpeg](https://github.com/imagemin/imagemin-mozjpeg#quality). Compression quality, in range 0 (worst) to 100 (perfect) |
|PNG_MAX_QUALITY | 0.6 | Option to [imagemin-pngquant](https://github.com/imagemin/imagemin-pngquant#quality). Compression max quality, in range 0 to 1|
|PNG_MIN_QUALITY | 0.5 | Option to [imagemin-pngquant](https://github.com/imagemin/imagemin-pngquant#quality). Compression min quality, in range 0 to 1|
|GIF_OPTIMIZATION_LEVEL | 3 | Option to [imagemin-gifsicle](https://github.com/imagemin/imagemin-gifsicle#optimizationlevel). Select an optimization level between 1 and 3.|

## Related

- [alfy](https://github.com/sindresorhus/alfy) - Create Alfred workflows with ease
- [imagemin](https://github.com/imagemin/imagemin#readme) - Minify images seamlessly
- [imagemin-pngquant](https://github.com/imagemin/imagemin-pngquant) -  Imagemin plugin for `pngquant`
- [imagemin-mozjpeg](https://github.com/imagemin/imagemin-mozjpeg) - Imagemin plugin for `mozjpeg`
- [imagemin-gifsicle](https://github.com/imagemin/imagemin-gifsicle#optimizationlevel) - - Imagemin plugin for `gifsicle`

## License

MIT ©
