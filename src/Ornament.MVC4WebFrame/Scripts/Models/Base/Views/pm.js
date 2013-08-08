/// <reference path="../Memberships/friend.js" />
/// <reference path="../Memberships/friend.js" />

/*
PM dialog UI 1.0
1) 显示对话框。对话
2）show的时候，需要停止。主page的提示ajax。
*/
define(function (require) {
    require('/bundles/bootstrap.js');
    require('/scripts/ckeditor/ckeditor.js');
    var Friend = require("/Scripts/Models/Base/Memberships/friend.js"),
     PersonalMessage = require("/Scripts/Models/Base/Views/pm.js"),
        pm=new PersonalMessage();

    function buildTemp(chatItem) {
        return {
            dt: $("<dt><h6><span>" + chatItem.publisher + "</span> <small>" + chatItem.createTime + "</small> <a class='pull-right'><i class='icon-remove'></i></a></h6></dt>"),
            dd: $("<dd><div>" + chatItem.content + "</div></dd>")
        };
    };

    function buildTemplChat() {

    }

    function setFriendList(friends) {
        /// <summary>
        /// this 是 pmDialog的Instance，frends是ajax获取的friends对象
        /// </summary>
        /// <param name="friends"></param>
        var sortedName = [];
        var self = this;
        self.friends = {};
        $(friends).each(function () {
            self.friends[this.Id] = new Friend(this, pm);
            sortedName.push(this.group);
        });

        sortedName.sort();
        var elements = [];
        $(sortedName).each(function () {
            elements.push("<li" + (self.activeId == this.Id ? "class='active'" : "") + "><a href='#" + this.Id + "'>" + this.Name + "</a></li>");
        });
        this.$friendList.append(elements.join(""));
    }

    function pmDialog($dialog, my) {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="$dialog"></param>
        /// <param name="my">my is User object, property is Name and Id</param>
        //初始化
        var self = this, friends = null;
        this.Owen = my;
        this.$dialog = $dialog.modal({ show: false });
        this.$chat = $("[role=chat]");
        this.$processBar = $("[role=progressbar]", self.$dialog);
        this.$friendList = $("[role=friendList]", self.$dialog);
        
        this.curFriendId = false;
        this.editor = CKEDITOR.replace('editor', {
            toolbar: "Basic", height: "100"
        });
        this.editor.on("key", function () {
            self.$sendBtn.prop("disabled", self.editor.getData().length == 0);
        });

        $dialog.on("show", function () {
            //tipsMsge.unWatch(); //stop topmenu 的message检查
            //ticket = setTimeout(callIt, 100);
            if (friends == null) {
                Friend.ListFriends(function (d) {
                    friends = d;
                    setFriendList.apply(self, d);
                    self.ListChat();
                });
            } else {
                $("a[href=#" + self.curFriendId + "]").parent().addClass("active");
                self.ListChat();
            }

        });

        //初始化发送按钮
        this.$sendBtn = ("[role=send]", $dialog).click(function () {//点击发送按钮
            self.$processBar.fadeIn();
            var content = self.editor.getData();

            if (content.length != 0) {
                var friend = self.friends[self.curFriendId];
                friend.Send(content, relativeUserId, function (d) {
                    self.$processBar.fadeOut(); //hide progressbar
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

    pmDialog.prototype.ListChat = function () {

        var f = this.friends[self.curFriendId];
        if (f == null) {
            f = new Friend({ Id: self.curFriendId }, pm);
        }
        f.ListChat(function (remoteData) {
            var chat = [];
            $(remoteData).each(function () {
                var item = buildTemp(this);
                if (this.publisher != self.personal.Name) {//对方的信息放在右面
                    $("span", item.dt).addClass("text-info");
                }
                chat.push(item.dt);
                chat.push(item.dd);
            });
            if (chat.length != 0) {
                $chat.append(chat).scrollTop($chat[0].scrollHeight).closest(".well-smoke").show();
            } else if (self.lastTime == null) {
                $chat.closest(".well-smoke").hide();
            }
        });
    };



    pmDialog.prototype.loopMessage = function () {

    };


    pmDialog.prototype.show = function (activeId) {
        this.curFriendId = activeId;
        this.$dialog.modal("show");
    };
    return pmDialog;

});