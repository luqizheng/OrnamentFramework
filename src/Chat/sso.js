/**
 * Created by leo on 2014/11/8.
 */
var http = require('http'),
    querystring = require('querystring');


exports.validPublicKey = function (publicKey, callback) {

    var postData = querystring.stringify({
        publicKey: publicKey, 'test': 1
    })
    var options = {
        hostname: 'localhost',
        port: 19410,
        path: '/sso/auth/BackendAuth',
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.length
        }
    }

    console.log(postData.length);
    var req = http.request(options, function (res) {
        //console.log('STATUS: ' + res.statusCode);
        //console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
            callback(JSON.parse(chunk));
        });
    });

    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });
    // write data to request body
    req.write(postData + "\n");
    console.log("sendPost:" + postData)
    req.end();

}