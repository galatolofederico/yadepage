const gulp = require("gulp");
const babel = require("gulp-babel");
const browserify = require('gulp-browserify');
const del = require("del")
const buildDir = "./dist/"

function clean(){
    return del([buildDir]);
}

function generator(){
   return gulp.src(["src/js/**/*"])
    .pipe(babel({
    }))
    .pipe(browserify({
    }))
    .pipe(gulp.dest(buildDir+"/js"))
}


exports.build = gulp.series(clean, generator)
exports.default = exports.build