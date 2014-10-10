var msgDao=require("./messageDao");
var app=require('express')();
var http = require('http').Server(app),
io = require('socket.io')(http);
var path = require('path');
app.get("/",function(req,res){
	 res.sendFile(path.join(__dirname, 'index.html'));
});


io.on('connection', function(socket){
  console.log('a user connected');
  
  socket.on('auth',function(data){
	console.log(data.key);
  });
	
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
 
 socket.on('chat message', function(data){
    io.emit('chat message', data.msg);
  });
 
});



http.listen(3000, function(){
  console.log('listening on *:3000');

});
