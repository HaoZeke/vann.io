# vann.io
This is a static blog site built using Jekyll and Gulp.

### Dependencies
- [Node.js](http://nodejs.org/)
- [Gulp](http://gulpjs.com/)
- [Sass (3.4+)](http://sass-lang.com/install)
- [Ruby (2.0+)](https://www.ruby-lang.org)

### Installation
1. Install dependencies listed above
2. `bundle && npm install`
3. `gulp`

### Deployment
This is automatically ready to deploy, so long as `gulp` has been running during development — otherwise use `jekyll build`.

Built code lives in the ``_site`` directory. Deploy this to the `prod` branch with `gulp deploy`.
