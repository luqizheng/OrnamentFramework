/// <binding Clean='clean' />
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
    theme: "./" + project.theme + "LESS_FILES/",
    css: "./" + project.webroot + "/css/"
};



gulp.task("default", function () {
    gulp.run(["less-min", "js-min"])
})

gulp.task("clean-lib", function (cb) {
    rimraf(paths.lib, cb);    
});




/*gulp.task("copy", ["clean"], function () {
    task.run(["js"], ["less"]);
});*/

gulp.task("copy",["clean-lib"], function () {
    var bower = {
        "hammer.js": "hammer.js/hammer*.{map,js}",
        "jquery": "jquery/jquery*.{js,map}",
        "jquery-validation": "jquery-validation/jquery.validate.js",
        "jquery-validation-unobtrusive": "jquery-validation-unobtrusive/jquery.validate.unobtrusive.js",
        "requirejs": "requirejs/require.js",
        "avalonjs": "avalon/avalon.js",
        "font-awesome/font": "font-awesome/fonts/*.*",
        "font-awesome/css": "font-awesome/css/*.*"
    }

    for (var destinationDir in bower) {
        gulp.src(paths.bower + bower[destinationDir])
          .pipe(gulp.dest(paths.lib + destinationDir));
    }
});

gulp.task("less",function () {

    var lessFiles = {
        "bootstrap.css": "bootstrap.less",
        "smartadmin-production.css": "smartadmin-production.less",
        "smartadmin-production-plugins.css": "smartadmin-production-plugins.less",
        "custom.css": "custom.less",
        "smartadmin-skins.css":"smartadmin-skin/smartadmin-skins.less"
    }
    for (var destinationDir in lessFiles) {        
        gulp.src(paths.theme + lessFiles[destinationDir])
            .pipe(less())
            .pipe(gulp.dest(paths.css))
    }

})


gulp.task("less-min", ["less"], function () {
    var cssPath = paths.css + "*.css";
    var cssMinPath = "!" + paths.css + "*.min.css";
    return gulp.src([cssPath, cssMinPath])
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