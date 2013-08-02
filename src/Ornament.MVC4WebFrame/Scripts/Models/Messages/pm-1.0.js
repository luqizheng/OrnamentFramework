
/*
PM dialog UI 1.0
1) 显示对话框。对话
2）show的时候，需要停止。主page的提示ajax。
*/
define(function (require) {
    require('/bundles/bootstrap.js');
    require('/scripts/ckeditor/ckeditor.js');
    var api = require('/models/personal.js'),
        tipsMsge = require('/models/personal.js');

    function buildTemp(chatItem) {
        return {
            dt: $("<dt><h6><span>" + chatItem.publisher + "</span> <small>" + chatItem.createTime + "</small> <a class='pull-right'><i class='icon-remove'></i></a></h6></dt>"),
            dd: $("<dd><div>" + chatItem.content + "</div></dd>")
        };
    };
    function buildFrendList(friends,activeId) {
        var result = {};
        var sortedName = {};
        $(friends).each(function () {
            sortedName.push(this.group);
            result[this.group] = {
                id: this.id,
                name: this.name,
                memo: this.memo,
            };
        });

        sortedName.sort();
        var elements = [];
        $(sortedName).each(function () {
            elements.push("<li><a href='#" + this.id + "'>" + this.name + "</a></li>");
        });
        return elements.join("");
    }
    
    function pmDialog($dialog) {
        var self = this;
        this.lastTime = null;
        this.ListChat = function (relUserId, myName) {
            /// <summary>
            /// 列出对话内容
            /// </summary>
            /// <param name="relUserId"></param>
            /// <param name="myName"></param>
            api.getChat(relUserId, 0, this.lastTime, function (remoteData) {

                var chat = [], $chat = $("[role=chat]", $dialog);
                if (remoteData.length != 0) {
                    self.lastTime = remoteData[0].createTime;
                }
                $(remoteData).each(function () {

                    var item = buildTemp(this);

                    if (this.publisher != myName) {//对方的信息放在右面
                        /*$([item.dt, item.dd]).each(function () {
                            $(this).addClass("clearfix").find(":first").css("color","blue");
                        });*/
                        $("span", item.dt).addClass("text-info");
                    }

                    chat.unshift(item.dd);
                    chat.unshift(item.dt);

                });

                if (chat.length != 0) {
                    $chat.append(chat).scrollTop($chat[0].scrollHeight).closest(".well-smoke").show();
                } else if (self.lastTime == null) {
                    $chat.closest(".well-smoke").hide();
                }
            });
        };

        this.Send = function (cContent, relUserId, func) {

            /// <summary>
            /// 发送pm
            /// </summary>
            /// <param name="cContent"></param>
            /// <param name="relUserId"></param>
            /// <param name="myName"></param>
            api.sendPm(cContent, relUserId, func);
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

            var $dialog = $(selector), editor;

            if (!$dialog.data("_pmDialog")) {

                $dialog.data("_pmDialog", true)
                    .modal({
                        show: false
                    });

                var func =
                        new pmDialog($dialog), ticket,
                    sendBtn = $("[role=send]", $dialog);

                editor = CKEDITOR.replace('editor',
                    {
                        toolbar: "Basic", height: "100"
                    }
                );
                editor.on("key", function() {
                    sendBtn.prop("disabled", editor.getData().length == 0);
                });

                function callIt() {
                    func.ListChat(relativeUserId, myName);
                    ticket = setTimeout(callIt, 2000);
                }

                $dialog.on("show", function () {
                    tipsMsge.unWatch(); //stop topmenu 的message检查
                    ticket = setTimeout(callIt, 100);
                });

                $dialog.on("hidden", function () {
                    $("[role=content]", $dialog).val("");
                    $("[role=chat]", $dialog).html("");
                    tipsMsge.watch(); //重新开启top menu的监控
                    clearTimeout(ticket);
                    func.lastTime = null;
                });

                sendBtn
                    .click(function () {//点击发送按钮

                        var progressBra = $("[role=progressbar]", $dialog).fadeIn();
                        var content = editor.getData();
                        if (content.length != 0) {
                            func.Send(content, relativeUserId, function (d) {

                                progressBra.fadeOut(); //hide progressbar
                                if (!d.success) {
                                    alert(d.error);
                                } else {
                                    editor.setData("");
                                }
                            });
                        }
                        return false;
                    });
            }
            $dialog.modal("show");

        }
    };
});