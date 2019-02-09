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

function html(){
    return gulp.src(["src/html/**/*"])
    .pipe(gulp.dest("./dist")) 
}

function config(){
    return gulp.src(["src/config.js"])
    .pipe(babel({
    }))
    .pipe(browserify({
    }))
    .pipe(gulp.dest("./dist"))
}

function libs() {
  return gulp.src(npmDist(), {base:'./node_modules'})
    .pipe(gulp.dest('./dist/libs'));
}

function argon2(){
    return gulp.src(["./node_modules/argon2-browser/**/*.js"])
    .pipe(gulp.dest("./dist/libs/argon2-browser"))
}

exports.build = gulp.series(clean, generator, html, config, argon2, libs)
exports.default = exports.build