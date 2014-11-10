var messageManager = require("./messageManager"),
    userManager = require("./userManager"),
    app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    path = require('path');

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});


io.on('connection', function (socket) {
    console.log('a user connected');
    //从客户端获取一个验证token，由sso生成的。然后再把它通过后台发送给sso验证服务，从而获取
    socket.on('reg user', function (data) {
        userManager.regUser(data, socket, function (result) {
            socket.emit("reg user", {success: result});
        });
    });

    socket.on('list message', function (data) {
        messageManager.list(data)
    });
    socket.on('new message', function (data) {
        messageManager.save(data, function (s) {
            if (s.nInserted == 1) {
                var user = onlineUser.get(data.to);
                if (user && user.socket.isConnected) {
                    user.socket.emit("list message", messageManager.list(data.to))
                }
            }
        });
    })

    socket.emit('valid');

});


http.listen(3000, function () {
    console.log('listening on *:3000');
});
