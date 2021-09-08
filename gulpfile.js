const gulp = require("gulp");

const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const watch = require("gulp-watch");

const svgo = require("gulp-svgo");

const modernizr = require("gulp-modernizr");
const htmlmin = require("gulp-htmlmin");
const cssmin = require("gulp-cssmin");
const rename = require("gulp-rename");

/** Generating a cascading style file */

gulp.task("gen-scss", () => {
   return gulp
      .src("./source/styles/scss/**/*.scss")
      .pipe(sourcemaps.init())
      .pipe(sass().on("Error: ", sass.logError))
      .pipe(sourcemaps.write("./"))
      .pipe(gulp.dest("./source/styles/css/"))
      .pipe(gulp.dest("./public/styles/"));
});

/** Optimization and minification SVG files */

gulp.task("gen-svgo", async () => {
   return gulp
      .src("./source/img/origin/**/*.svg")
      .pipe(svgo())
      .pipe(gulp.dest("./source/img/reduce/"))
      .pipe(gulp.dest("./public/img/reduce/"));
});

/** Minimizing a JS, CSS, HTML files */

/** Tasks for minifying files 
 *  for publishing a project. */

gulp.task("min-js", async () => {
   return gulp
      .src("./source/js/**/*.js")
      .pipe(modernizr())
      .pipe(gulp.dest("./public/js/"));
});

gulp.task("min-html", async () => {
   return gulp
      .src("./source/**/*.html")
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest("./public/"));
});

gulp.task("min-css", async () => {
   gulp
      .src("./source/styles/css/**/*.css")
      .pipe(cssmin())
      .pipe(rename({ suffix: ".min" }))
      .pipe(gulp.dest("./public/styles/"));
});

/** Observers */

gulp.task("observe", () => {
   gulp.watch("./source/styles/scss/**/*.scss", gulp.series("gen-scss"));
   gulp.watch("./source/img/origin/**/*.svg", gulp.series("gen-svgo"));
});

gulp.task("observe-scss", () => {
   gulp.watch("./source/styles/scss/**/*.scss", gulp.series("gen-scss"));
});

gulp.task("observe-svgo", () => {
   gulp.watch("./source/img/origin/**/*.svg", gulp.series("gen-svgo"));
});

/** Control commands */

/** This task, when launched, 
 *  will minify all hypertext markup files,
 *  cascading styles, and script code. */

gulp.task("public", async () => {
   gulp.series("min-html", "min-css", "min-js");
});
