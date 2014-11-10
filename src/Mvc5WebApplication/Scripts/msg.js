define(function(require) {
    return function (host, userobj) {
        var socket = require("socketio").connect(host);
        socket.emit("reg user", userobj);

        socket.on("reg user", function(data) {
            console.log('reg user success='+data.success);
        });
    };
})