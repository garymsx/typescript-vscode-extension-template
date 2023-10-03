/* eslint-disable */
const gulp = require("gulp");
const terser = require("gulp-terser");

gulp.task("minify", function () {
   return gulp.src("out/**/*.js")
       .pipe(terser())
       .pipe(gulp.dest("out"));
});

gulp.task("default", gulp.series("minify"));
