var gulp = require("gulp");
var babel = require("gulp-babel");
var browserify = require('gulp-browserify');


gulp.task("generator", function () {
  return gulp.src(["src/generator.js"])
    .pipe(babel({
    }))
    .pipe(browserify({
    }))
    .pipe(gulp.dest("dist"))
})

gulp.task('default', ['transpile-miner'])