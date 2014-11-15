var notifyManager = require("./notifyManager"),
    userManager = require("./userManager"),
    app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    path = require('path'),
    chatManager = require('./chatManager');

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});


io.on('connection', function (socket) {
    console.log('a user connected');
    userManager.Init(socket);
    notifyManager.Init(socket, userManager);
    chatManager.Init(socket, userManager);
});


http.listen(3000, function () {
    console.log('listening on *:3000');
});
