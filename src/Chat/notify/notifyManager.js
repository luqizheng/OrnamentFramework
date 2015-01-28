/**
 * Created by leo on 2015/1/14.
 */

var orgSetting = require("../Config/orgSetting.js");
var db = require("../dao").getProvider("sendBox");

function toContent(strTemplate, variabled, user) {
    var reg = /\[{1}[^[].+?\]{1}/g
    strTemplate.replace(reg, function (word) {
        word = word.replace('[', '').replace(']')
        if (user[word]) {
            return user[word]
        }
        if (variabled[word]) {
            return variabled[word];
        }
        return word;
    })
}

function saveMessage(aryMsg, callback) {

    db.do(function (collection) {
        console.log("Insert notify data :" + JSON.stringify(aryMsg))
        collection.insert(aryMsg, function (err, s) {
            if (err) {
                console.log(err);
                callback({success: false, error: err});
                return;
            }
            if (s.nInserted > 1) {
                callback({success: true, messages: msg});
            }
            else {
                callback({success: false, count: s.nInserted})
            }
        });
    });
}

function getMessage(loginId, bRead, pageSize, pageIndex, callback) {

    db.do(function (collection) {
        var codi = {Owner: loginId};
        if (bRead !== undefined) {
            codi.IsRead = bRead;
        }
        var result = collection.find(codi).sort({CreateDate: 1}).skip(pageSize * pageIndex).limit(pageSize).toArray();

        callback(result)
    })

}

exports.count = function (loginId, bRead, callback) {
    db.do(function (collection) {
        var codi = {Owner: loginId};
        if (bRead !== undefined) {
            codi.IsRead = bRead;
        }
        var result = collection.find(codi).count();
        callback(result)

    })
}

exports.Init = function (socket, userManager) {
    socket.on('send notify', function (msg) {
        //console.log("ON SEND NOTIFY DEBUG " + msg);
        /* msg={
         Content:"content",
         LoginIds=[] //接受者
         Token:publicKey,
         GlobalVariable={}, tempalte data,
         UserData=[{dictionary}],
         IsTemplate:false or not defined,
         Org=org,
         CreateDate,
         */
        console.log("-------------------------" + typeof(msg))
        if (typeof(msg) == 'string') {
            console.log("input is string, so translate to object.")
            msg = JSON.parse(msg);
        }
        var org = orgSetting.get(msg.Org);
        org.valid(msg.CreateDate, msg.Token, function (result) {

            if (result) {
                console.log("validate notify org setting success")
                console.log("msg data :" + JSON.stringify(msg))


                var messages = []
                for (var i = 0; i < msg.LoginIds.length; i++) {
                    var receiver = userManager.getUserByLoginId(msg.LoginIds);
                    if (receiver) {
                        var messageSend = {
                            content: msg.Content,
                            subject: msg.Subject
                        }

                        if (msg.IsTemplate) {
                            messageSend.content = toContent(messageSend.content, msg.GlobalVariable, UserData[i]);
                            messageSend.subject = toContent(messageSend.subject, msg.GlobalVariable, UserData[i]);
                        }
                        receiver.socket.emit("new notify", {content: messageSend, subject: subjectSend});
                    }
                    var dbSaving = {
                        Content: messageSend,
                        Type: "notify",
                        Owner: msg.LoginIds,
                        CreateTime: new Date(),
                        IsRead: false,
                        Subject: msg.Subject
                    }
                    messages.push(dbSaving);

                    console.log(i + ": msg data :" + JSON.stringify(dbSaving))
                }
                console.log("inser new message " + messages.length);
                saveMessage(messages)
                socket.emit("send notify", true);
            }
            else {
                socket.emit('send notify', false);
            }
            console.log("validate notify token is " + result);
        });
    });

    socket.on('get notify', function (user) {
        /*
         user={
         LoginId:loginId,
         Token:token,
         read:undfeind means is all,
         Subject:""
         pageIndex:0
         }
         */
        getMessage(user.LoginId, user.Read, 40, user.pageIndex || 0, function (result) {
            socket.emit('get notify', result);
        })
    });


}