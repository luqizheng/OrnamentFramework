var fs = require("fs");
var path = require('path');
var glob = require('glob');

module.exports = {
    entry: './wwwroot/src/main.js',
    devtool: "inline-source-map",
    output: {
        filename: "[name].js"
        //path: "wwwroot/scripts"
    },
    resolve: {
        extensions: ["", ".ts", ".js"],
        alias: {
            'jquery': __dirname + "/Scripts/jquery-2.2.2.min.js",
            'avalon': __dirname + "/Scripts/avalon.mobile.shim.min.js",
            'bootstrap': __dirname + "/Scripts/bootstrap.min.js",
            'signalR': __dirname + "/Scripts/jquery.signalR.js",
            'bootbox': __dirname + "/Scripts/bootbox.min.js",
            'monent': __dirname + "/Scripts/moment.js"
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
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.join(dirname, basename);
        pathname = pathDir ? pathname.replace(new RegExp('^' + pathDir), '') : pathname;

        entries[pathname] = './' + entry;

    }
    console.log(entries)
    return entries;
}