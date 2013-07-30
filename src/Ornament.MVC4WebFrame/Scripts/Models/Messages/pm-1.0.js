
define(function (require) {
    require('/bundles/bootstrap.js');
        var api = require('/models/personal.js');
         var $this = $("#pmEditor").modal({
             show: false,
             hidden: function () {
                 $("textarea", $this).val("");
             }
         }),
            ownerName = "Me";

        $("a:eq(1)", $this).click(function (e) {
            e.preventDefault();
            e.stopPropagation();

            var content = $("textarea", $this).val(), receiver = $("input", $this).val();
            api.sendPm(content, receiver,
                function (d) {
                    if (d) {
                        var dt = "<dt>" + ownerName + "</dt>";
                        dt += "<dd>" + content + "</dd>";
                        $(".chat", $this).prepend(dt).closest(".body").show();
                        $("textarea").val("");
                    } else {
                        alert("send failed");
                    }
                });
        });
    
    return {
        show: function (userId, userName) {
            ownerName = userName;
            $("input", $this).val(userId);
            api.getChat(userId, 0, function (d) {
                var chat = [];
                $(d).each(function () {
                    var chatItem = this;
                    var isOwnerMgs = ownerName == chatItem.publisher;
                    var dt = $("<dt><h6>" + chatItem.publisher + " <small>" + chatItem.createTime + "</small></h6></dt>");
                    var dd = $("<dd><div>" + chatItem.content + "</div></dd>");
                    if (!isOwnerMgs) {
                        $([dt, dd]).each(function() {
                            $(this).addClass("clearfix").find(":first").addClass("pull-right");
                        });
                        //dd.addClass("clearfix").find(":first").addClass("pull-right");
                    }
                    chat.push(dt);
                    chat.push(dd);
                });
                var $chat = $(".chat", $this);
                if (chat.length != 0) {
                    $chat.html("").append(chat).closest(".body").show();
                } else {
                    $chat.closest(".body").hide();
                }

            });
            $this.modal('show');
        }
    };
});