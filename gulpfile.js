const gulp = require("gulp");
const babel = require("gulp-babel");
const browserify = require('gulp-browserify');
const del = require("del")
const npmDist = require('gulp-npm-dist');


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

function copyLibs() {
  return gulp.src(npmDist(), {base:'./node_modules'})
    .pipe(gulp.dest('./dist/libs'));
}

exports.build = gulp.series(clean, generator, copyLibs)
exports.default = exports.build