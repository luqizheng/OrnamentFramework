define(function(require) {
    return function (host, userobj) {
        require(["socketio"],function(io) {
            var socket = io.connect(host);
            socket.on("valid", function () {
                socket.emit("reg user", userobj);
            });
            

            socket.on("reg user", function(data) {
                console.log('reg user success='+data.success);
            });    
        })
        
    };
})