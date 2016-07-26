var gulp = require("gulp");
var webpack = require("gulp-webpack");
var webpackConfig = require("./webpack.config.js"),
    minifycss = require("gulp-minify-css"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    gutil = require("gulp-util"),
    rename = require("gulp-rename");

var md5 = require("gulp-md5-plus-always");
var embed = require('gulp-image-embed');

gulp.task("webpack", function (callback) {
    
    return webpack(webpackConfig)
        .pipe(gulp.dest('./wwwroot/scripts/src/main.js'));

});
var md5Sign = [
    "./Views/Account/*.cshtml",
    "./Views/Home/*.cshtml"
];
gulp.task("js:min",
    ["webpack"],
    function(callback) {
        return gulp.src(["./wwwroot/scripts/pages/!(*.min).js"])
            .pipe(uglify())
            .pipe(rename({ suffix: '.min' }))
            .pipe(md5(10, md5Sign))
            .pipe(gulp.dest('./wwwroot/scripts/'));
    });
gulp.task("default", ["js:min", "css"], function (callback) {

});

gulp.task("css", ["css:embed"], function (callback) {
    return gulp.src([
        "./lib/bootstrap/css/bootstrap.css",
        "./Content/src/css/**/*.css"
    ])
        .pipe(concat("site.css"))
        .pipe(gulp.dest("./Content"))
        .pipe(minifycss())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest("./Content")); //执行压缩
});

gulp.task('watch',
    function() {
        gulp.watch("./scripts/**/*", ['js:min']);
        gulp.watch("./Content/**/*", ['css']);
    });

gulp.task("css:embed",
    function() {

        // return gulp.src("./wwwroot/lib/bootstrap-colorpicker/css/bootstrap-colorpicker.css")
        //     .pipe(embed({ asset: './Assets/bootstrap-colorpicker/imag' }))
        //     .pipe(rename({ prefix: 'gulp.' }))
        //     .pipe(gulp.dest("./content/src/css/"));
    });

function onBuild(done) {
    return function (err, stats) {
        console.log("---" + err);
        if (err) {
            gutil.log('Error', err);
            if (done) {
                done();
            }
        } else {
          
            Object.keys(stats.compilation.assets).forEach(function (key) {
                gutil.log('Webpack: output ', gutil.colors.green(key));
            });
            gutil.log('Webpack: ', gutil.colors.blue('finished ', stats.compilation.name));
            if (done) {
                done();
            }
        }
    }
}