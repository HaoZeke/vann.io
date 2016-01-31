# vann.io
This is a static blog site built using Jekyll and Gulp.

### Dependencies
- [Node.js](http://nodejs.org/)
- [Gulp](http://gulpjs.com/)
- [Sass (3.4+)](http://sass-lang.com/install)
- [Ruby (2.0+)](https://www.ruby-lang.org)

### Installation
1. Install dependencies listed above
2. Run `make` to create the necessary directory structure
3. Run `bundle && npm install` to install other dependencies
4. `gulp`

### Writing Posts
To add new drafts, simply add a file in the `posts/_drafts` directory that follows the convention `YYYY-MM-DD-name-of-post.ext` and includes the necessary Front Matter at the top:

    ---
    layout: post
    title:  Example draft
    date:   2016-01-01 00:00:00 +0000
    categories: example
    ---

Once you're ready to publish this draft, move the file to `posts/_posts`.

### Deployment
This is automatically ready to deploy, so long as `gulp` has been running during development — otherwise use `jekyll build`.

Built code lives in the `_site` directory. Deploy this to the `prod` branch with `gulp deploy`.
