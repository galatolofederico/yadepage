var gulp = require("gulp");
var babel = require("gulp-babel");
var browserify = require('gulp-browserify');


function generator(){
   return gulp.src(["src/generator.js"])
    .pipe(babel({
    }))
    .pipe(browserify({
    }))
    .pipe(gulp.dest("dist"))
}


exports.build = gulp.series(generator)
exports.default = exports.build