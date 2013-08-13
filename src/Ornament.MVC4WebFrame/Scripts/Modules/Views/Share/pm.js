/// <reference path="../../Combine/Memberships/friend.js" />


/*
PM dialog UI 1.0
1) 显示对话框。对话
2）show的时候，需要停止。主page的提示ajax。
*/
define(function (require) {
    require('bootstrap');
    require('ckeditor');
    var PersonalMessage = require("../../Combine/Personal/PersonalMessage.js"),
        pm = new PersonalMessage(),
        Friend = require("../../Combine/Memberships/friend.js");

    function buildTemp(chatItem) {
        return {
            dt: $("<dt><h6><span>" + chatItem.publisher + "</span> <small>" + chatItem.createTime + "</small> <a class='pull-right'><i class='icon-remove'></i></a></h6></dt>"),
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
            chat.push(item.dt);
            chat.push(item.dd);
        });
        if (chat.length != 0) {
            self.$chat.append(chat).scrollTop(self.$chat[0].scrollHeight).closest(".well-smoke").show();
        } else if (self.lastTime == null) {
            self.$chat.closest(".well-smoke").hide();
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


        this.curFriendId = false;
        this.editor = CKEDITOR.replace('editor', {
            toolbar: "Basic",
            height: "100"
        });
        this.editor.on("key", function () {
            self.$sendBtn.prop("disabled", self.editor.getData().length == 0);
        });

        $dialog.on("show", function () {
            //tipsMsge.unWatch(); //stop topmenu 的message检查
            //ticket = setTimeout(callIt, 100);
            watcher = true;
            self.ListChat();

            function watch() {
                self.GetNewer();
                if (watcher) {
                    ticket = setTimeout(watch, 1000);
                } else {
                    clearTimeout(ticket);
                    ticket = null;
                }
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

                var friend = new Friend({ Id: self.curFriendId }, pm);

                friend.Send(content, self.curFriendId, function (d) {
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
        var f = new Friend({ Id: this.curFriendId }, pm), self = this;
        f.ListChat(function (d) { buildListChat(d, self); });
    };

    pmDialog.prototype.GetNewer = function () {
        var f = new Friend({ Id: this.curFriendId }, pm), self = this;
        f.GetNewer(function (d) {
            buildListChat(d, self);
        });
    };




    pmDialog.prototype.show = function (activeId) {
        this.curFriendId = activeId;
        this.$dialog.modal("show");
    };

    return pmDialog;

});