/// <reference path="../../notification/notifyClient.js" />
define(["text!./chat.html", '/Scripts/notification/notifyClient.js'], function (template, msgInit) {

    var widget = avalon.ui.chat = function(element, data, vmodels) {
        var options = data.chatOptions,
            //方便用户对原始模板进行修改,提高制定性
            optionsTemplate = template,
            msgClient = null;

        var model = avalon.define(data.chatId, function(vm) {
            avalon.mix(vm, options);

            vm.$init = function() {
                var pageHtml = optionsTemplate;
                element.style.display = "none";
                element.innerHTML = pageHtml;

                msgClient = msgInit("http://localhost:3000", vm.loginId,vm.name, {
                    receiver: {
                        chat: function() {
                        }
                    },
                    listFriend: function(friendData) {
                        model.friends = friendData;

                    }
                });
            };
            vm.$skipArray = ["host", "loginId"];
            vm.host = "";
            vm.friends = [];
            vm.loginId = "";
            vm.name = "";
            vm.$watch("friends", function (newValues) {
                setTimeout(
                    function() { initUi(newValues); }, 500);

            });
        });

        function initUi(friends) {
            for (var i = 0; i < friends.length; i++) {
                
                var friend=friends[i],options = {
                    id: 'chat_' + friend.loginId,
                    title: friend.loginId,
                    user: widget.loginId,
                    rel: "popover-hover",
                    placement: "right",
                    status:friend[i].status,
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

                $('#' + options.id).chatbox(options);
            }
        }

        return model;
    };

   

    widget.defaults = {
        host: 'localhost:3000'
    };
    return avalon;
});