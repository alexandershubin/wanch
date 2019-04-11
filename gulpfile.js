"use strict";

var gulp = require("gulp");
var del = require("del")
var plumber = require("gulp-plumber");
var rename = require("gulp-rename");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var concat = require("gulp-concat");
var uglify = require("gulp-uglifyjs");
var htmlmin = require("gulp-htmlmin");
var server = require("browser-sync").create();

gulp.task("css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"));
});
gulp.task("js", function() {
  return gulp.src(["source/js/*.js"
    ])
    .pipe(gulp.dest("build/js"))
    .pipe(uglify())
    .pipe(rename("app.min.js"))
    .pipe(gulp.dest("build/js"));
});
gulp.task("html", function() {
  return gulp.src(["source/*.html"
    ])
    .pipe(gulp.dest("build/html"))
    .pipe(htmlmin())
    .pipe(gulp.dest("build/html"));
});
gulp.task("sprite", function () {
  return gulp.src("source/img/icon-*.svg")
  .pipe(svgstore({
    inlineSvg: true}))
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("build/img"));
});
gulp.task("html", function () {
  return gulp.src("source/*.html")
  .pipe(posthtml([
    include()
  ]))
  .pipe(gulp.dest("build"));
});
gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.jpegtran({progressive: true}),
    imagemin.svgo()
  ]))
  .pipe(gulp.dest("build/img"));
});
gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/js/**",
    "source/*.html"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
});
gulp.task("clean", function () {
  return del("build");
});
gulp.task("server", function () {
  server.init({
    server: "build/"
  });

  gulp.watch("source/less/**/*.less", gulp.series("css"));
  gulp.watch("source/img/icon-*.svg", gulp.series("sprite", "html"));
  gulp.watch("source/*.html", gulp.series("html", "refresh")).on("change", server.reload);
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("build", gulp.series("clean", "copy", "js", "css", "sprite", "html", "images"));
gulp.task("start", gulp.series("build", "server"));
