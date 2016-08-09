var $ = require('jquery')
var page = require("../../../lib/page/page.js");

var nav = {

}

page('/', contentLoad);
page('/Membership/User/Index', contentLoad);
page('/Membership/User', contentLoad);
page('/membership/user/edit/:id', contentLoad);

page('/Membership/Role', contentLoad);
page();

function contentLoad(ctx) {

    var strUrl = ctx.path;
    var loading = document.referrer == "" || location.pathname.toUpperCase() != strUrl.toUpperCase();
    if (loading)
        $("#content").load(strUrl, function (responseText, textStatus, req) {
            if (req.status != 200) {
                $("#content").html(responseText);

            }
            //return true
        });
}