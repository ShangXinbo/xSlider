var combiner = require('stream-combiner2');
var uglify = require('gulp-uglify');
var gulp = require('gulp');

gulp.task('default', function() {
  var combined = combiner.obj([
    gulp.src('src/*.js'),
    uglify(),
    gulp.dest('dist/')
  ]);

  // 任何在上面的 stream 中发生的错误，都不会抛出，
  // 而是会被监听器捕获
  combined.on('error', console.error.bind(console));

  return combined;
});