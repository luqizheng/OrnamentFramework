/**
 * Created by leo on 2014/11/8.
 */
var http=require('http');

var options = {
    hostname:'localhost:16384',
    port:19410,
    path:'/sso/BackendAuth',
    method:'post'
}

exports.validPublicKey=function(publicKey,callback){

    var req = http.request(options, function(res) {
        //console.log('STATUS: ' + res.statusCode);
        //console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            //console.log('BODY: ' + chunk);
            callback(chunk);
        });
    });

    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });
    // write data to request body
    req.write(publicKey+"\n");
    req.end();

}