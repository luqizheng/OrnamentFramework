var avalon = require('avalon');

avalon.define({
    $id: "langList",
    setLang: function (lange) {
        var newUrl = location.href;
        if (newUrl.indexOf("?") !== -1) {
            newUrl += "?";
        }
        newUrl += "culture=" + lange;
        location.href = newUrl;
    }
});

