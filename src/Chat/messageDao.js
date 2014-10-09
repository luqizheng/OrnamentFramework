var  mongodb = require('mongodb');
var  server  = new mongodb.Server('localhost', 27017, {auto_reconnect:true});
var  db = new mongodb.Db('ornamentMessages', server, {safe:true});
exports.init=function(){
	console.log('ok');
}

exports.send=function(msgObj){
	/* {
		to:"joe",
		from:"hellen",
		content:"xkxie",
		createTime:"kkkdd",
		read:true,
		readTime:"createTime"
	} */
	
}

	


