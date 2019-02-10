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
    .pipe(gulp.dest(buildDir)) 
}

function css(){
    return gulp.src(["src/css/**/*"])
    .pipe(gulp.dest(buildDir+"/css")) 
}


function config(){
    return gulp.src(["src/config.js"])
    .pipe(babel({
    }))
    .pipe(browserify({
    }))
    .pipe(gulp.dest(buildDir))
}

function libs() {
  return gulp.src(npmDist(), {base:'./node_modules'})
    .pipe(gulp.dest(buildDir+"libs"));
}

function argon2(){
    return gulp.src(["./node_modules/argon2-browser/**/*.js"])
    .pipe(gulp.dest(buildDir+"libs/argon2-browser"))
}

exports.build = gulp.series(clean, generator, html, css, config, argon2, libs)
exports.default = exports.build