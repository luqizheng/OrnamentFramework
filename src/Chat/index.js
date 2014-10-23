var messageManager = require("./messageManager"),
    userManager = require("./userManager"),
    validation = require("./validRequestData"),
    onlineUser = require("./onlineUser"),
    app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    path = require('path');

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});


io.on('connection', function (socket) {

    console.log('a user connected');


    socket.on('reg user', function (data) {
        userManager.regUser(data, function (result) {
            if (result.succcess) {
                onlineUser.addUser(result.loginId);
            }
            socket.emit("reg user",result);
        });
    });

    socket.on('list message', function (data) {
        messageManager.list(data)
    });

    socket.on('online', function (data) {
        if (validation.validOrg(data)) {
            socket.emit("online", onlineUser.count());
        }
    })



    socket.on('new message', function (data) {
        messageManager.save(data,function(s){
            if(s.nInserted==1){
                var user = onlineUser.get(data.to);
                if(user && user.socket.isConnected) {
                    user.socket.emit("list message",messageManager.list(data.to))
                }
            }
        });
    })

});


http.listen(3000, function () {
    console.log('listening on *:3000');
});
