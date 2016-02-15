import gulp from 'gulp';
import browserSync from 'browser-sync';
import sass from 'gulp-sass';
import prefix from 'gulp-autoprefixer';
import cp from 'child_process';
import rename from 'gulp-rename';
import minifyCSS from 'gulp-minify-css';
import uglify from 'gulp-uglify';
import ghPages from 'gulp-gh-pages';
import imagemin from 'gulp-imagemin';
import webpack from 'webpack-stream';

const reload = browserSync.reload;

/**
* Compile files from _sass into both _site/css (for live injecting) and site (for future jekyll builds)
*/
gulp.task('sass', () => {
  return gulp.src('_sass/main.scss')
    .pipe(sass({
      includePaths: ['sass'],
      onError: browserSync.notify
    }))
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(rename('main.css'))
    .pipe(gulp.dest('css'))
    .pipe(gulp.dest('_site/css'))
    .pipe(reload({stream:true}))
    .pipe(minifyCSS({keepBreaks: false, keepSpecialComments:true}))
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('css'))
    .pipe(gulp.dest('_site/css'));
});

gulp.task('uglify', () => {
  return gulp.src('_js/main.js')
    .pipe(webpack({
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel',
            exclude: '/node_modules/',
            query: { compact: false }
          }
        ]
      }
    }))
    .pipe(rename('main.js'))
    .pipe(gulp.dest('scripts'))
    .pipe(gulp.dest('_site/scripts'))
    .pipe(reload({stream:true}))
    .pipe(uglify({onError: browserSync.notify}))
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('scripts'))
    .pipe(gulp.dest('_site/scripts'));
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
gulp.task('jekyll-build', done => {
  return cp.spawn('jekyll', ['build', '--drafts'], {stdio: 'inherit'})
    .on('close', done);
});

/**
* Rebuild Jekyll & do page reload
*/
gulp.task('jekyll-rebuild', ['jekyll-build'], () => {
  reload();
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
gulp.task('watch', () => {
  gulp.watch(['_sass/**/*.scss','css/*.scss'], ['sass']);
  gulp.watch(['_js/*.js'], ['uglify']);
  gulp.watch(['_assets/*'], ['images']);
  gulp.watch(['*.html', '_includes/*', '_layouts/*.html', 'posts/_posts/*', 'assets/**/*', 'graveyard/**/*'], ['jekyll-rebuild']);
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
