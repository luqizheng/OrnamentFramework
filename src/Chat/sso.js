/**
 * Created by leo on 2014/11/8.
 */
var http = require('http');

var options = {
    hostname: 'localhost',
    port: 17034,
    path: '/sso/auth/BackendAuth',
    method: 'post',
    headers: {
        'content-type': 'application/json',
        'content-length': 0
    }
}
exports.validPublicKey = function (publicKey, callback) {

    var postData = JSON.stringify({PublicKey: publicKey});
    options.headers['content-length'] = postData.length
    var req = http.request(options, function (res) {
        //console.log('STATUS: ' + res.statusCode);
        //console.log('HEADERS: ' + JSON.stringify(res.headers));

        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            //console.log('BODY: ' + chunk);
            callback(JSON.parse(chunk));
        });
    });

    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });
    // write data to request body
    //console.log('sending public key ' + publicKey)
    req.write(postData);
    req.end();

}