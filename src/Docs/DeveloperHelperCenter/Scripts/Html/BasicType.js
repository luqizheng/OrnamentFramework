define(function (require) {
    return {
        Init: function () {
            require(["vaform"], function () {
                $("#example").vaform({
                    success: function () {
                        alert('ok');
                    }
                });
            });
        }
    }
})