/// <reference path="wwwroot/_src/js/views/areas/membership/user/index.js" />
var fs = require("fs");
var path = require('path');
var glob = require('glob');
var rootPath = "./wwwroot/_src/";
var scriptsLib = __dirname + "/wwwroot/lib/"



//var entry = getEntry(rootPath + "js/Views/**/*.js", rootPath + "js/");
entry = rootPath + 'js/main.js'

module.exports = {
    entry: entry ,
    devtool: "inline-source-map",
    output: {
        filename: "[name].js",
        publicPath:"/js/"
        //path: "wwwroot/scripts" // by gulp so comment this path .
    },
    resolve: {
        extensions: ["", ".ts", ".js"],
        alias: {
            'jquery': scriptsLib + "jquery/dist/jquery.js",
            'avalon': scriptsLib + "avalon/dist/avalon.js",
            'bootstrap': scriptsLib + "bootstrap/dist/js/bootstrap.js",
            'monent': scriptsLib + "moment/moment.js",
            "jq-form": scriptsLib + "jquery-form/jquery.form.js",
            "jq-val-uo": scriptsLib + "jquery-validation-unobtrusive/jquery.validate.unobtrusive.js",
            "jq-val": scriptsLib + "jquery-validation/dist/jquery.validate.js"
        }
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader' },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
            },
            {
                test: /\.less$/,
                loader: "style!css!less"
            }
        ],
        preLoaders: [
            {
                test: /\.ts$/,
                loader: "tslint-loader"
            }
        ]
    },
    plugins: [],
    externals: {
        'jquery': 'jQuery',
        '$': 'jquery',
        'avalon': 'avalon'

    }
};

function getEntry(globPath, pathDir) {
    var files = glob.sync(globPath);
    var entries = {},
        entry, dirname, basename, pathname, extname;

    for (var i = 0; i < files.length; i++) {

        entry = files[i]
       
        /*
        dirname = path.dirname(entry).replace(/\//g, "/");;
        extname = path.extname(entry).replace(/\//g, "/");;
        basename = path.basename(entry, extname).replace(/\//g, "/");;
        pathname = path.join(dirname, basename).replace(/\//g, "/");;
        pathname = pathDir ? pathname.replace(new RegExp('^' + pathDir), '') : pathname;
        */
       
        var pathname = entry.replace(new RegExp('^' + pathDir), '')
        entries[pathname] = entry;

    }
   
    return entries;
}