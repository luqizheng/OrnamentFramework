

function correctTimeZone(bLocation) {

    var getUtcHourOffset = function () {
        return new Date().getTimezoneOffset() / 60 * -1;
    };

    if (document.location.href.indexOf("utc=" + getUtcHourOffset()) == -1) {
        //console.log(getUtcHourOffset);
        var url = (document.location.href.indexOf("?") != -1 ? "&" : "?") + "utc=" + getUtcHourOffset();
        if (bLocation) {
            //console.log(document.location + url);
            document.location = document.location + url;
        } else {
            //console.log("<script src='{0}' type='text/javascript'></script>".replace("{0}", "/api/Client/CorrectTime?" + url.substr(1)));
            $("body").append("<script src='{0}' type='text/javascript'></script>".replace("{0}", "/api/Client/CorrectTime?" + url.substr(1)));
        }
    }
}

