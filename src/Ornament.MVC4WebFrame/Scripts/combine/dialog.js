var oAlert = function (msg, func) {
    iniDialog();
    $("#alert_msg p.content").html(msg);

    $("#alert_msg").dialog("option", "buttons", [{
        text: "OK",
        click: func === undefined ? close : func
    }]);

    $("#alert_msg").dialog("open").closest(".ui-dialog").addClass("font-size", "1.2em");

    function iniDialog() {
        if ($("#alert_msg").length == 0) {
            $("body").append("<div id='alert_msg'><p class='content'></p></div>");
            $("#alert_msg").dialog({
                modal: true,
                title: "warnning",
                autoOpen: false,
                buttons: [{ text: "OK", click: function () { $("#alert_msg").dialog("close"); } }]
            }).closest(".ui-dialog").css("font-size", "1.2em"); ;
        }
    }

    function close() {
        $("#alert_msg").dialog("close");
    }
};


