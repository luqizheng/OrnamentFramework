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
    css:"./"+ project.webroot + "/css/"
};



gulp.task("release", ["copy","less"], function () {

    gulp.src(paths.lib + "**/*.js")
        .pipe(uglify())
    .pipe(gulp.dest(paths.lib));

    gulp.src(paths.css + "*.css")
        .pipe(minifycss()).pipe(gulp.dest(paths.css))

})

gulp.task("clean", function (cb) {
    rimraf(paths.lib, cb);
});

gulp.task("copy", ["clean"], function () {
    var bower = {
        "hammer.js": "hammer.js/hammer*.{js,map}",
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
