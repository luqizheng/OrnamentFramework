define(["/Scripts/util.js"],function (require) {
        /* 加载Index的时候就进行加载 但是ajax加载page是不会执行的*/
        require("modules/ajaxlogin");
        require("modules/chat");
        require("modules/ornamentUi");
    })