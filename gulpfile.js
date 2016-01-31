var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var cp          = require('child_process');
var rename      = require('gulp-rename');
var minifyCSS   = require('gulp-minify-css');
var uglify      = require('gulp-uglify');
var ghPages     = require('gulp-gh-pages');
var imagemin    = require('gulp-imagemin');
var webpack     = require('webpack-stream');

/**
* Compile files from _sass into both _site/css (for live injecting) and site (for future jekyll builds)
*/
gulp.task('sass', function () {
  return gulp.src('_sass/main.scss')
    .pipe(sass({
      includePaths: ['sass'],
      onError: browserSync.notify
    }))
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(rename('main.css'))
    .pipe(gulp.dest('css'))
    .pipe(gulp.dest('_site/css'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(minifyCSS({keepBreaks: false, keepSpecialComments:true}))
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('css'))
    .pipe(gulp.dest('_site/css'));
});

gulp.task('uglify', function () {
  return gulp.src('_js/main.js')
    .pipe(webpack())
    .pipe(rename('main.js'))
    .pipe(gulp.dest('scripts'))
    .pipe(uglify({onError: browserSync.notify}))
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('scripts'));
});

gulp.task('images', () => {
  return gulp.src('_assets/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}]
    }))
    .pipe(gulp.dest('assets'));
});

/**
* Build the Jekyll Site
*/
gulp.task('jekyll-build', function (done) {
  return cp.spawn('jekyll', ['build', '--drafts'], {stdio: 'inherit'})
    .on('close', done);
});

/**
* Rebuild Jekyll & do page reload
*/
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
  browserSync.reload();
});

/**
* Wait for jekyll-build, then launch the Server
*/
gulp.task('browser-sync', ['sass', 'uglify', 'jekyll-build'], function() {
  browserSync({
    notify: {
      styles: [
        'font-weight: bold;',
        'padding: 10px;',
        'margin: 0;',
        'position: fixed;',
        'font-size: 0.6em;',
        'line-height: 0.8em;',
        'z-index: 9999;',
        'left: 5px;',
        'top: 5px;',
        'color: #fff;',
        'border-radius: 2px',
        'background-color: #333;',
        'background-color: rgba(50,50,50,0.8);'
      ]
    },
    server: {
      baseDir: '_site'
    }
  });
});

/**
* Watch scss files for changes & recompile
* Watch html/md files, run jekyll & reload BrowserSync
*/
gulp.task('watch', function () {
  gulp.watch(['_sass/**/*.scss','css/*.scss'], ['sass']);
  gulp.watch(['_js/*.js'], ['uglify']);
  gulp.watch(['_assets/*'], ['images']);
  gulp.watch(['*.html', '_includes/*', '_layouts/*.html', 'posts/_posts/*', 'scripts/*', 'assets/**/*', 'graveyard/**/*'], ['jekyll-rebuild']);
});

/**
* Default task, running just `gulp` will compile the sass,
* compile the jekyll site, launch BrowserSync & watch files.
*/
gulp.task('default', ['browser-sync', 'watch']);

/**
 * Build the Jekyll Site for production
 */
gulp.task('build-prod', function (done) {
  var productionEnv = process.env;
  productionEnv.JEKYLL_ENV = 'production';

  return cp.spawn('jekyll', ['build'], { stdio: 'inherit' , env:productionEnv })
    .on('close', done);
});

/**
* Push the build to github/bitbucket
*/
gulp.task('deploy', ['build-prod'], function() {
  return gulp.src('./_site/**/*')
    .pipe(ghPages({
      branch: 'prod'
    }));
});
