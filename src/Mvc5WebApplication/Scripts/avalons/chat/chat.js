/// <reference path="../../notification/notifyClient.js" />
define(["text!avalons/chat/chat.html", 'notification/notifyClient'], function (template, msgInit) {

    var widget = avalon.ui.chat = function (element, data, vmodels) {
        var options = data.chatOptions,
            //方便用户对原始模板进行修改,提高制定性
            optionsTemplate = template,
            msgClient = null;

        var vmodel = avalon.define(data.chatId, function (vm) {

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
                                    for (var i = 0; i < friendData.data.length; i++) {
                                        var item = friendData.data[i];
                                        switch (item.status) {
                                            case "offline":
                                                item.statusStyle = "online";
                                                break;
                                        }
                                    }
                                    vmodel.friends = friendData.data;
                                }
                            });

                    }
                });
                element.style.display = "";



            };
            vm.$skipArray = ["host", "loginId", "publicKey", "name"];
            vm.host = "";
            vm.friends = [{ loginId: "s" }];
            vm.loginId = "";
            vm.name = "";
            vm.publicKey = "";
           


            var dispatchReplace = false;
            vm.showBox = function (event) {
                event.preventDefault();
                var _old = chatboxManager.dispatch;
                if (!dispatchReplace) {
                    var aa=function (id, user, msg) { //重写变量
                        msgClient.sendChat(id.split('_')[1], msg);
                        _old(id, user, msg);
                    }
                    chatboxManager.dispatch = aa;
                    dispatchReplace = true;
                }


                var friend = this.$vmodel.el;
                chatboxManager.addBox('chat_'+friend.loginId, {
                    // dest:"dest" + counter, 
                    // not used in demo
                    title: "username" + friend.loginId,
                    first_name: "",
                    last_name: friend.loginId,
                    status: friend.statusStyle,
                    alertmsg: "",
                    alertshow: true
                    //you can add your own options too


                });
            }
            avalon.mix(vm, options);
        });


     

        return vmodel;
    };



    widget.defaults = {
        host: 'localhost:3000'
    };

    //替换发送信息的蝙蝠恩

   
        
    
    return avalon;
});