/*
这个是每次ajax加载页面的时候都会运行的。
*/
define(["modules/ornamentUi", "app"], function (ui) {
    return function () {
        $.validator.unobtrusive.parse("#content");
        pageSetUp();
        ui.setup();
    }
})