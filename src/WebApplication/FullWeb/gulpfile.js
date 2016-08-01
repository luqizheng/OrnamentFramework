var gulp = require("gulp");
var webpack = require("gulp-webpack");
var webpackConfig = require("./webpack.config.js"),
    minifycss = require("gulp-minify-css"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    gutil = require("gulp-util"),
    rename = require("gulp-rename");

var md5 = require("gulp-md5-plus-always");
var embed = require("gulp-image-embed");
var rootPath = "./wwwroot/";
var srcFolder = {
    css: rootPath + "_src/css/*.css",
    js: rootPath + "_src/js/*.js",
    fonts:rootPath+"_src/fonts/*"
};
var distFolder = {
    css: rootPath + "css/",
    js: rootPath + "js/",
    fonts: [
        rootPath + "fonts/",
        rootPath+"lib/"
    ]
};
gulp.task("webpack",
    function(callback) {

        return webpack(webpackConfig)
            .pipe(gulp.dest(distFolder.js));

    });
var md5Sign = [
    "./Views/Account/*.cshtml",
    "./Views/Home/*.cshtml"
];
gulp.task("js:min",
    ["webpack"],
    function(callback) {
        return gulp.src(["./wwwroot/js/pages/!(*.min).js"])
            .pipe(uglify())
            .pipe(rename({ suffix: ".min" }))
            .pipe(md5(10, md5Sign))
            .pipe(gulp.dest(distFolder.js));
    });
gulp.task("default",
    ["js:min", "css","fonts"],
    function(callback) {

    });

gulp.task("css",
    ["css:embed"],
    function(callback) {
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
    function() {
        gulp.watch("./wwwroot/js/**/*", ["js:min"]);
        gulp.watch("./wwwroot/css/**/*", ["css"]);
    });

gulp.task("css:embed",
    function() {

        //return gulp.src("./wwwroot/lib/bootstrap-colorpicker/css/bootstrap-colorpicker.css")
        //    .pipe(embed({ asset: './Assets/bootstrap-colorpicker/imag' }))
        //    .pipe(rename({ prefix: 'gulp.' }))
        //    .pipe(gulp.dest("./content/src/css/"));
    });

function onBuild(done) {
    return function(err, stats) {
        console.log("---" + err);
        if (err) {
            gutil.log("Error", err);
            if (done) {
                done();
            }
        } else {

            Object.keys(stats.compilation.assets)
                .forEach(function(key) {
                    gutil.log("Webpack: output ", gutil.colors.green(key));
                });
            gutil.log("Webpack: ", gutil.colors.blue("finished ", stats.compilation.name));
            if (done) {
                done();
            }
        }
    };
}