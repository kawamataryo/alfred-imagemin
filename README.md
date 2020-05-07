# alfred-imagemin
Minify images seamlessly with imagemin.


![May-07-2020 20-25-16](https://user-images.githubusercontent.com/11070996/81289265-11251a00-90a1-11ea-8c13-aeb9d4027354.gif)


## Install

Ensure you have Node.js version 10 or higher installed. Then run the following:

```
$ npm install --global alfred-imagemin
```

## Usage

Selected image files on finder, type `imagemin` and `enter` in Alfred.

## Configuration
Alfred environment variables.

|name|default|value|
|---|---|---|
|JPEG_QUALITY | 80 | Option to [imagemin-mozjpeg](https://github.com/imagemin/imagemin-mozjpeg#quality). Compression quality, in range 0 (worst) to 100 (perfect). |
|PNG_MIN_QUALITY | 0.8 | Option to [imagemin-pngquant](https://github.com/imagemin/imagemin-pngquant#quality). Compression max quality, in range 0 to 1|
|PNG_MAX_QUALITY | 0.65 | Option to [imagemin-pngquant](https://github.com/imagemin/imagemin-pngquant#quality). Compression min quality, in range 0 to 1|
|GIF_OPTIMIZATION_LEVEL | 3 | Option to [imagemin-gifsicle](https://github.com/imagemin/imagemin-gifsicle#optimizationlevel). Select an optimization level between 1 and 3.|
