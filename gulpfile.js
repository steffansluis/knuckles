require('coffee-script').register();

var gulp       = require('gulp');
var coffee     = require('gulp-coffee')
var rename     = require('gulp-rename');
var uglify     = require('gulp-uglify');
var jasmine    = require('gulp-jasmine');
var benchmark  = require('gulp-bench');
var browserify = require('browserify');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');
var merge      = require('merge2');
var typescript = require('gulp-typescript');
var es6ify     = require('es6ify');
var babel      = require('babelify');

var typescriptProject = typescript.createProject('tsconfig.json', { typescript: require('typescript') });


// gulp.task('coffee', function() {
//   return gulp
//     .src('src/**/*.coffee')
//     .pipe(coffee())
//     .pipe(gulp.dest('dist'))
// });

gulp.task('typescript', function() {
  var result = gulp
    .src('src/**/*.ts')
    .pipe(typescript(typescriptProject))

  return merge([
    result.dts.pipe(gulp.dest('dist')),
    result.js.pipe(gulp.dest('dist'))
  ]);
});

gulp.task('browserify', ['typescript'], function() {
  return browserify('dist/knuckles.js', {standalone: 'Knuckles', sourceType: 'module', debug: true})
    .transform(babel)
    .bundle()
    .pipe(source('knuckles.browser.js'))
    .pipe(gulp.dest('dist'))
});
// gulp.task('browserify', ['typescript'], function() {
//   return browserify(es6ify.runtime, {standalone: 'Knuckles', sourceType: 'module'})
//     .transform(es6ify.configure(/^(?!.*node_modules)+.+\.js$/))
//     .add('dist/knuckles.js')
//     .bundle()
//     .pipe(source('knuckles.browser.js'))
//     .pipe(gulp.dest('dist'))
// });

gulp.task('uglify', ['browserify'], function (){
  return gulp
    .src('dist/knuckles.browser.js')
    .pipe(uglify())
    .pipe(rename('knuckles.browser.min.js'))
    .pipe(gulp.dest('dist'))
})

gulp.task('spec', function() {
  return gulp
    .src('spec/**/*.coffee')
    .pipe(jasmine({
      includeStackTrace: true
    }))
});

gulp.task('perf', function () {
  return gulp
    .src('perf/**/*.coffee')
    .pipe(benchmark({defer: true}))
});

gulp.task('dist', ['uglify']);

gulp.task('watch', function() {
  gulp.watch('src/*.ts', ['dist']);
})
