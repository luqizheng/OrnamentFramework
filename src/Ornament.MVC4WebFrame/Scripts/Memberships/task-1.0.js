//jquery.js
define(function (require, exports, module) {

    var myTask = {
        pageIndex: 0,
        pageSize: 10
    };
    var innerFunction = {
        myTask: function (opts, func) {

            $.post("/Api/Tasks/MyTask", $.extends({}, myTask, opts), func);


        }

    };
    module.exports = innerFunction;

});