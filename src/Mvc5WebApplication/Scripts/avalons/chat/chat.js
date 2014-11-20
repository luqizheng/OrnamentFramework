/// <reference path="../../notification/notifyClient.js" />
define(["text!avalons/chat/chat.html", 'notification/notifyClient'], function (template, msgInit) {

    var widget = avalon.ui.chat = function (element, data, vmodels) {
        var options = data.chatOptions,
            //方便用户对原始模板进行修改,提高制定性
            optionsTemplate = template,
            msgClient = null;

        var vmodel = avalon.define(data.chatId, function (vm) {

            avalon.mix(vm, options);

            vm.$init = function () {
                var pageHtml = optionsTemplate;
                element.style.display = "none";
                element.innerHTML += pageHtml;
                avalon.scan(element, [vmodel].concat(vmodels));
                msgClient = msgInit("http://localhost:3000", options.publicKey, options.loginId, options.name, {
                    receiver: {
                        chat: function () {
                        }
                    },
                    validSuccess: function () {
                        this.listFriend( //验证成功，获取朋友列表
                            function (friendData) {
                                if (friendData.success) {
                                    vmodel.friends = friendData.data;
                                }
                            });

                    }
                });
                element.style.display = "";
                


            };
            vm.$skipArray = ["host", "loginId", "publicKey", "name"];
            vm.host = "";
            vm.friends = [{loginId:"s"}];
            vm.loginId = "";
            vm.name = "";
            vm.publicKey = "";
            vm.$watch("friends", function (newValues) {
                setTimeout(
                    function () { initUi(newValues); }, 500);

            });
            
        });

        function initUi(friends) {
            for (var i = 0; i < friends.length; i++) {

                var friend = friends[i], opts = {
                    id: 'chat_' + friend.loginId,
                    title: friend.loginId,
                    user: widget.loginId,
                    rel: "popover-hover",
                    placement: "right",
                    status: friend.status,
                    hidden: false, // show or hide the chatbox
                    offset: 0, // relative to right edge of the browser window
                    width: 230, // width of the chatbox
                    messageSent:
                        function (id, user, msg) {
                            // override this
                            this.boxManager.addMsg(user.first_name, msg);
                            msgClient.sendChat(id.split('_')[1], msg);
                        },
                    boxClosed: function (id) { }, // called when the close icon is clicked

                };

                $('#' + options.id).chatbox(opts);
            }
        }

        return vmodel;
    };



    widget.defaults = {
        host: 'localhost:3000'
    };
    return avalon;
});