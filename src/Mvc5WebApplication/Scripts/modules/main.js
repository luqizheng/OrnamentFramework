define(function (require) {
    /* 加载Index的时候就进行加载 但是ajax加载page是不会执行的*/
    
    require(["modules/ajaxlogin"]);
    require(["modules/chat"]);
    require(["modules/ornamentUi"]);

    return {
        init:function(server, name, loginId, token) {
            require(["modules/notifyMsg"], function(notify) {
                notify.init(server, loginId, name, token);
            });
        }
    }
})