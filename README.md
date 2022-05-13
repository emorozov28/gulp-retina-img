# gulp-retina-img

[![npm version](https://badge.fury.io/gulp-retina-img.svg)](https://www.npmjs.com/package/gulp-retina-img)

A library that adds the img 'srcset' attribute to retina

## Usage

``` js
const gulp = require('gulp');
const retinaImg = require('gulp-retina-img');


gulp.task('views', function() {

  return gulp.src('./views/**/*.html')
    .pipe(retinaImg())
    .pipe(gulp.dest('./dist'));

});
```

You put html in:
``` html
  <img src="example.png" alt="example" />
```

And get html out:
``` html
<figure>
	<img src="example.png" alt="example image" srcset="example.png 1x, example@2x.png 2x" />
</figure>
```

## Options
Default
suffix: {
    1: '',
		2: '@2x',
		3: '@3x',
}

reImageSrc: /^((?:(?:http|https):\/\/)?(?:.+))(\.(?:gif|png|jpg|jpeg|webp))$/    - regular image search
``` js


const options = {
  suffix: {
		1: '',
		2: '@2x',
		3: '@3x',
	},
  reImageSrc: /^((?:(?:http|https):\/\/)?(?:.+))(\.(?:png|jpg|))$/
}

gulp.task('views', function() {

  return gulp.src('./views/**/*.html')
    .pipe(retinaImg(options))
    .pipe(gulp.dest('./dist'));

});
```
