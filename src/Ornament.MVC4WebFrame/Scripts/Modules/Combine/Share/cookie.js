define(function () {
    return {
        // get cookie setting
        get: function (cName) {
            if (document.cookie.length > 0) {
                var cStart = document.cookie.indexOf(cName + "=");
                if (cStart != -1) {
                    cStart = cStart + cName.length + 1;
                    var cEnd = document.cookie.indexOf(";", cStart);
                    if (cEnd == -1) cEnd = document.cookie.length;
                    return unescape(document.cookie.substring(cStart, cEnd));
                }
            }
            return "";
        }
    };
})