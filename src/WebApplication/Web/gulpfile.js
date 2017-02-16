; var gulp = require("gulp");
var webpack = require("gulp-webpack");
var webpackConfig = require("./webpack.config.js"),
    minifycss = require("gulp-minify-css"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    gutil = require("gulp-util"),
     plumber = require('gulp-plumber'),
    rename = require("gulp-rename");



var embed = require("gulp-image-embed");
var rootPath = "./wwwroot/";
var srcFolder = {
    css: rootPath + "_src/css/*.css",
    js: rootPath + "_src/js/*.js",
    fonts: rootPath + "_src/fonts/*"
};
var distFolder = {
    css: rootPath + "css/",
    js: rootPath + "js/",
    fonts: rootPath + "fonts/"

};

gulp.task("webpack",
    function (callback) {
        return webpack(webpackConfig)
            .pipe(plumber())
            .pipe(gulp.dest(distFolder.js));
    });

gulp.task("js:min",
    ["webpack", "global-js"],
    function (callback) {

        return gulp.src([distFolder.js + "*.js", "!" + distFolder.js + "*.min.js"])
             .pipe(plumber())
            .pipe(uglify())
            .pipe(rename({ suffix: ".min" }))
            .pipe(gulp.dest(distFolder.js));
    });

gulp.task("global-js", function () {
    //全局js文件。
    var target = [
          "./wwwroot/lib/smartAdmin/app.config.js",
        "./wwwroot/lib/smartAdmin/app.js"

    ];

    return gulp.src(
           target).pipe(plumber())
           //.pipe(uglify())
            .pipe(concat("site.js"))
           .pipe(gulp.dest(distFolder.js));
});

gulp.task("default",
    ["js:min", "css", "fonts", "global-js"],
    function (callback) {

    });

gulp.task("css",
    ["css:embed"],
    function (callback) {
        return gulp.src(srcFolder.css)
            .pipe(concat("site.css"))
            .pipe(gulp.dest(distFolder.css))
            .pipe(minifycss())
            .pipe(rename({ suffix: ".min" }))
            .pipe(gulp.dest(distFolder.css)); //执行压缩
    });
gulp.task("fonts", function () {
    gulp.src(srcFolder.fonts)
        .pipe(gulp.dest(distFolder.fonts));
})
gulp.task("watch",
    function () {
        gulp.watch("./wwwroot/_src/js/**/*", ["js:min"]);
        gulp.watch("./wwwroot/_src/css/**/*", ["css"]);
    });

gulp.task("css:embed",
    function () {

        //return gulp.src("./wwwroot/lib/bootstrap-colorpicker/css/bootstrap-colorpicker.css")
        //    .pipe(embed({ asset: './Assets/bootstrap-colorpicker/imag' }))
        //    .pipe(rename({ prefix: 'gulp.' }))
        //    .pipe(gulp.dest("./content/src/css/"));
    });
