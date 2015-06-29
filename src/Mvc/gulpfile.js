/// <binding Clean='clean' ProjectOpened='copy' />

var gulp = require("gulp"),
  rimraf = require("rimraf"),
  fs = require("fs"),
  jshint = require('gulp-jshint'),
  minifycss = require("gulp-minify-css"),
  uglify = require('gulp-uglify'),
  imagemin = require('gulp-imagemin'),
  rename = require('gulp-rename'),
  less = require("gulp-less")

;

eval("var project = " + fs.readFileSync("./project.json"));

var paths = {
    bower: "./bower_components/",
    lib: "./" + project.webroot + "/lib/",
    theme: "./" + project.themes + "LESS_FILES/",
    css: "./" + project.webroot + "/css/"
};



gulp.task("release", function () {
    gulp.run(["less-min", "js-min"])

})



gulp.task("clean", function (cb) {
    rimraf(paths.lib, cb);
});

gulp.task("copy", ["clean"], function () {
    var bower = {
        "hammer.js": "hammer.js/hammer*.{map,js}",
        "jquery": "jquery/jquery*.{js,map}",
        "jquery-validation": "jquery-validation/jquery.validate.js",
        "jquery-validation-unobtrusive": "jquery-validation-unobtrusive/jquery.validate.unobtrusive.js",
        "requirejs": "requirejs/require.js",
        "avalonjs": "avalon/avalon.js"
    }

    for (var destinationDir in bower) {
        gulp.src(paths.bower + bower[destinationDir])
          .pipe(gulp.dest(paths.lib + destinationDir));
    }


});

gulp.task("less", function () {

    var lessFiles = {
        "bootstrap.css": "bootstrap.less",
        "smartadmin-production.css": "smartadmin-production.less",
        "smartadmin-production-plugins.css": "smartadmin-production-plugins.less",
        "custom.css": "custom.less",
    }
    for (var destinationDir in lessFiles) {

        gulp.src(paths.theme + lessFiles[destinationDir])
            .pipe(less())
            .pipe(gulp.dest(paths.css))
    }

})


gulp.task("less-min", ["less"], function () {
    return gulp.src(paths.css + "*.css")
      .pipe(minifycss())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.css))
});

gulp.task("js-min", ["copy"], function () {

    setTimeout(function () { //不等不 sleep 1秒，等待文件出现之后在出现，因为要等待copy后才能进行min
        gulp.src([paths.lib + "**/*.js", "!" + paths.lib + "**/*.min.js"])
            .pipe(uglify())
            .pipe(rename({ suffix: '.min' }))
            .pipe(gulp.dest(paths.lib));
    }, 1000)

});