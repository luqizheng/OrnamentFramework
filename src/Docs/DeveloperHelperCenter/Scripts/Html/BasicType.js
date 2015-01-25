define(function (require) {
    return {
        Init: function () {
            require(["vaform"], function () {
                $("#formExample1").vaform({
                    success: function () {
                        alert('ok');
                    }
                });
            });
        }
    }
})