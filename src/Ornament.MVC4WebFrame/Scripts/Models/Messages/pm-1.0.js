
/*
PM dialog UI 1.0
1) 显示对话框。对话
2）show的时候，需要停止。主page的提示ajax。
*/
define(function (require) {
    require('/bundles/bootstrap.js');
    var api = require('/models/personal.js'),
        tipsMsge = require('/models/personal.js');

    function buildTemp(chatItem) {
        return {
            dt: $("<dt><h6>" + chatItem.publisher + " <small>" + chatItem.createTime + "</small></h6></dt>"),
            dd: $("<dd><div>" + chatItem.content + "</div></dd>")
        };
    };

    function pmDialog($dialog) {

        var lastTime = null;
        this.ListChat = function (relUserId, myName) {
            /// <summary>
            /// 列出对话内容
            /// </summary>
            /// <param name="relUserId"></param>
            /// <param name="myName"></param>
            api.getChat(relUserId, 0, lastTime, function (remoteData) {

                var chat = [], $chat = $("[role=chat]", $dialog);
                if (remoteData.length != 0) {
                    lastTime = remoteData[0].createTime;
                }
                $(remoteData).each(function () {

                    var item = buildTemp(this);

                    if (this.publisher != myName) {//对方的信息放在右面
                        $([item.dt, item.dd]).each(function () {
                            $(this).addClass("clearfix").find(":first").addClass("pull-right");
                        });
                    }

                    chat.unshift(item.dd);
                    chat.unshift(item.dt);

                });

                if (chat.length != 0) {
                    $chat.append(chat).scrollTop($chat[0].scrollHeight).closest(".well-smoke").show();
                } else if (lastTime == null) {
                    $chat.closest(".well-smoke").hide();
                }
            });
        };

        this.Send = function (cContent, relUserId) {
            /// <summary>
            /// 发送pm
            /// </summary>
            /// <param name="cContent"></param>
            /// <param name="relUserId"></param>
            /// <param name="myName"></param>
            api.sendPm(cContent, relUserId, function (d) {
                if (!d.success) {
                    alert(d.error);
                } else {
                    $("[role=content]", $dialog).val("");
                }
            });
        };
    }


    return {
        Show: function (selector, relativeUserId, myName) {
            /// <summary>
            /// 显示Pm 对话框
            /// </summary>
            /// <param name="selector">PM dialog的selector</param>
            /// <param name="relativeUserId">对话的人</param>
            /// <param name="myName">login user的名字</param>

            var $dialog = $(selector);

            if (!$dialog.data("_pmDialog")) {
                $dialog.data("_pmDialog", true);
                var func = new pmDialog($dialog);
                var ticket;
                $dialog.modal({
                    show: false
                });

                function callIt() {
                    /// <summary>
                    /// get chat
                    /// </summary>
                    func.ListChat(relativeUserId, myName);
                    ticket = setTimeout(callIt, 2000);
                }

                $dialog.on("shown", function () {
                    tipsMsge.unWatch(); //stop topmenu 的message检查
                    ticket = setTimeout(callIt, 0);
                });
                $dialog.on("hidden", function () {
                    $("[role=content]", $dialog).val("");
                    $("[role=chat]", $dialog).html("");
                    tipsMsge.watch(); //重新开启top menu的监控
                    clearTimeout(ticket);
                });

                $("[role=send]", $dialog).click(function () {
                    func.Send($("[role=content]", $dialog).val(), relativeUserId, myName);
                    return false;
                });
            }

            $dialog.modal("show");

        }
    };
});