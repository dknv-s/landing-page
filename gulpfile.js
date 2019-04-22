const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const pug = require('gulp-pug');

sass.compiler = require('node-sass');

const dirs = {
  src: {
    html: './src/*.pug',
    styles: './src/sass/styles.scss',
    scripts: './src/js/*.js',
    imgs: './src/img/*.*'
  },
  build: {
    html: './build/',
    styles: './build/css/',
    scripts: './build/js/',
    imgs: './build/img/'
  }
}

/* BrowserSync */
function browserSyncInit(done) {
  browserSync.init({
    server: {
      baseDir: './build'
    },
    port: 3000
  });
  done();
}

/* Html */
function html() {
  return gulp.src(dirs.src.html)
    .pipe(pug({
      pretty: true
    }))
    .on('error', (err) => {
      throw new Error(err.message);
    })
    .pipe(gulp.dest(dirs.build.html))
    .pipe(browserSync.stream());
}

/* Styles */
function scssCompile() {
  return gulp.src(dirs.src.styles)
    .pipe(sass()
    .on('error', sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest(dirs.build.styles))
    .pipe(browserSync.stream());
}

/* Images */
function images() {
  return gulp.src(dirs.src.imgs)
    .pipe(gulp.dest(dirs.build.imgs))
    .pipe(browserSync.stream());
}

function watcher(done) {
  gulp.watch(dirs.src.html, gulp.series(html));
  gulp.watch('./src/sass/**/*.scss', gulp.series(scssCompile));
  gulp.watch(dirs.src.imgs, gulp.series(images));
  done();
}

/* Tasks */
const build = gulp.parallel(html, scssCompile, images);
const watch = gulp.series(build, browserSyncInit, watcher);

exports.build = build;
exports.watch = watch;
exports.default = watch;
