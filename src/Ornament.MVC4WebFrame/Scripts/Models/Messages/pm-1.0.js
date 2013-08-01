
/*
PM dialog UI 1.0
1) 显示对话框。对话
2）show的时候，需要停止。主page的提示ajax。
*/
define(function (require) {
    require('/bundles/bootstrap.js');
    var api = require('/models/personal.js'),
     tipsMsge = require('/models/personal.js'),
        ownerName = "",
        lastTime = null,
    $this = $("#pmEditor").modal({
        show: false,
        hidden: function () {
            $("textarea", $this).val("");
            tipsMsge.watch(); //重新开启top menu的监控
        },
        shown: function () {
            tipsMsge.unWatch(); //stop topmenu 的message检查
        }
    }),buildTemp = function (chatItem) {
            return {
                dt: $("<dt><h6>" + chatItem.publisher + " <small>" + chatItem.createTime + "</small></h6></dt>"),
                dd: $("<dd><div>" + chatItem.content + "</div></dd>")
            };
    };
    
    function getChat(userId, userName) {
        ownerName = userName;
        $("input", $this).val(userId);
        api.getChat(userId, 0,lastTime, function (d) {
            var chat = [];
            lastTime = d[d.length - 1].createTime;
            $(d).each(function () {
                var isOwnerMgs = ownerName == this.publisher, item = buildTemp(this);
                if (!isOwnerMgs) {
                    $([item.dt, item.dd]).each(function () {
                        $(this).addClass("clearfix").find(":first").addClass("pull-right");
                    });
                }
                chat.push(item.dt);
                chat.push(item.dd);
            });
            var $chat = $(".chat", $this);
            if (chat.length != 0) {
                $chat.html("").append(chat).scrollTop($chat[0].scrollHeight).closest(".body").show();
            } else {
                $chat.closest(".widget").hide();
            }
        });
        $this.modal('show');
    }
    $("a:eq(1)", $this).click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        var content = $("textarea", $this).val(), receiver = $("input", $this).val();
        api.sendPm(content, receiver,
            function (d) {
                if (d) {
                    var item = buildTemp(d), $chat = $(".chat", $this);
                    $chat.append(item.dt).append(item.dd);
                    $chat.scrollTop($chat.scrollHeight).closest(".widget").show();
                    $("textarea", $this).val("");
                } else {
                    alert("send failed");
                }
            });
    });

    return {
        show: function (relativeUserId, myName) {
            getChat(relativeUserId, myName);
        }
    };
});