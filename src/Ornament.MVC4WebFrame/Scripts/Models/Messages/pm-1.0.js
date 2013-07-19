define(function (require) {
    require('/bundles/bootstrap.js');
    var url = "/Api/PersonalMessages";
    var api = {
        getChat: function (receiverUserId, pageIndex, func) {
            $.get(url, { userId: receiverUserId, page: pageIndex }, func);
        },
        send: function (content, receiver, func) {
            $.post(url, { userId: receiver, content: content }, func);
        }
    };

    var $this = $("#pmEditor").modal({
        show: false,
        hidden: function () {
            $("textarea", $this).val("");
        }
    });

    $("a:eq(1)", $this).click(function (e) {
        e.preventDefault();
        e.stopPropagation();

        var content = $("textarea", $this).val(), receiver = $("input", $this).val();
        api.send(content, receiver,
            function (d) {
                if (d) {
                    var dt = "<dt>" + ownerName + "</dt>";
                    dt += "<dd>" + content + "</dd>";
                    $(".chat", $this).prepend(dt);
                    $("textarea").val("");
                } else {
                    alert("send failed");
                }
            });

    });
    var ownerName = "Me";
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
                        dt.addClass("clearfix").find(":first").addClass("pull-right");
                        dd.addClass("clearfix").find(":first").addClass("pull-right");
                    }
                    chat.push(dt);
                    chat.push(dd);
                });
                $(".chat", $this).html("").append(chat);

            });
            $this.modal('show');
        }
    };
});