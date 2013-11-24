/// <reference path="../../Combine/Memberships/friend.js" />


/*
PM dialog UI 1.0
1) 显示对话框。对话
2）show的时候，需要停止。主page的提示ajax。
*/
define(function (require) {
    var $ = require("jquery");
    if (!$.fn.modal) {
        require('bootstrap')($);
    }
    require('ckeditor');
    var pmLib = require("../../Combine/Personal/PersonalMessage.js"),
        pm = new pmLib(),
        friendCls = require("../../Combine/Memberships/friend.js");

    function buildTemp(chatItem) {
        var $dt = $("<dt><h6><span>" + chatItem.publisher + "</span> <small>" + chatItem.createTime + "</small><a role='remove' class='pull-right' href='#" + chatItem.id + "'><i class='icon-remove'></i></a></h6></dt>");

        return {
            dt: $dt,
            dd: $("<dd><div>" + chatItem.content + "</div></dd>")
        };
    }
    var buildListChat = function (remoteData, self) {
        var chat = [];
        $(remoteData).each(function () {
            var item = buildTemp(this);
            if (this.publisher != self.Owner.Name) { //对方的信息放在右面
                $("span", item.dt).addClass("text-info");
            }
            chat.push(item.dd);
            chat.push(item.dt);
        });
        chat.reverse();
        if (chat.length != 0) {
            self.$chat.append(chat).scrollTop(self.$chat[0].scrollHeight).closest(".well-smoke").show();
        }
    };

    function pmDialog($dialog, my) {
        /// <summary>
        /// </summary>
        /// <param name="$dialog"></param>
        /// <param name="my">my is User object, property is Name and Id</param>
        //初始化
        var self = this, watcher = false,
        ticket = null;

        this.Owner = my;
        this.$dialog = $dialog.modal({ show: false });
        this.$chat = $("[role=chat]", $dialog);
        this.$processBar = $("[role=progressbar]", self.$dialog);


        this.curFriend = false;
        this.editor = CKEDITOR.replace('editor', {
            toolbar: "Basic",
            height: "100"
        });
        this.editor.on("key", function () {
            self.$sendBtn.prop("disabled", self.editor.getData().length == 0);
        });
        $dialog.on("click", "[role=remove]", function () {
            var itself = $(this);
            pm.del($(this).attr("href").substr(1), function (d) {
                if (d) {
                    var $dt = itself.closest("dt");
                    var $dd = $dt.next();
                    $dt.remove();
                    $dd.remove();
                }
            });
        });
        $dialog.on("show", function () {
            //tipsMsge.unWatch(); //stop topmenu 的message检查
            //ticket = setTimeout(callIt, 100);
            watcher = true;
            self.ListChat();

            function watch() {
                self.GetNewer(function () {
                    if (watcher) {
                        ticket = setTimeout(watch, 1000);
                    } else {
                        clearTimeout(ticket);
                        ticket = null;
                    }
                });
            }
            ticket = setTimeout(watch, 1000);
        }).on("hide", function () {
            watcher = false;
        });

        //初始化发送按钮
        this.$sendBtn = $("[role=send]", $dialog).click(function () { //点击发送按钮
            self.$processBar.fadeIn();
            var content = self.editor.getData();
            if (content.length != 0) {
                self.curFriend.Send(content, self.curFriendId, function (d) {
                    self.$processBar.fadeOut(); //hide progressbar
                    if (!d.success) {
                        alert(d.error);
                    } else {
                        self.editor.setData("");
                    }
                });
            }
            return false;
        });

        $("[role=refres]").click(function () {
            self.GetNewer();
        });
    }

    pmDialog.prototype.ListChat = function () {
        var self = this;
        self.curFriend.ListChat(function (d) { buildListChat(d, self); });
    };

    pmDialog.prototype.GetNewer = function (func) {
        var self = this;
        self.curFriend.GetNewer(function (d) {
            buildListChat(d, self);
            func();
        });
    };




    pmDialog.prototype.show = function (activeId) {
        this.curFriend = new friendCls({ Id: activeId }, pm);
        this.$dialog.modal("show");
    };

    return pmDialog;

});