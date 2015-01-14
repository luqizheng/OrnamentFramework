/**
 * Created by leo on 2015/1/14.
 */

var orgSetting = require("../Config/orgSetting.js");
var db = require("../dao").getProvider("sendBox");

function toContent(strTemplate, variabled, user) {
    var reg = /\[{1}[^[].+?\]{1}/g
    strTemplate.replace(reg, function (word) {
        word = word.replace('[', '').replace(']')
        if (variabled[word]) {
            return variabled[word];
        }
        if (user[word]) {
            return user[word]
        }
        return word;
    })
}

function saveMessage(aryMsg, callback) {

    db.do(function (collection) {
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

function getMessage(loginId, bRead, pageSize, pageIndex,callback) {

    db.do(function (collection) {
        var codi={Owner: loginId};
        if(bRead!==undefined){
            codi.IsRead=bRead;
        }
        var result = collection.find(codi).sort({CreateDate: 1}).skip(pageSize * pageIndex).limit(pageSize).toArray();
        callback(result)
    })

}


exports.Init = function (socket, userManager) {
    socket.on('send notify', function (msg) {
        /* msg={
         Content:"content",
         LoginIds=[] //接受者
         Token:publicKey,
         TemplateData=[], tempalte data,
         IsTemplate:false or not defined,
         org=org,
         CreateDate,
         */
        var org = orgSetting.get(msg.org);
        org.valid(msg.CreateDate, msg.Token, function (result) {

            if (result) {
                var messages = []
                for (var i = 0; i < msg.LoginIds.length; i++) {
                    var receiver = userManager.getUserByLoginId(msg.LoginIds);
                    if (receiver) {
                        var messageSend = msg.content;
                        if (msg.IsTemplate) {
                            messageSend = toContent(messageSend, msg.TemplateData[i], receiver);
                        }
                        receiver.socket.emit("new notify", messageSend);
                    }

                    messages.push({
                        Content: messageSend,
                        Type: "notify",
                        Owner: msg.LoginIds,
                        CreateTime: new Date(),
                        IsRead: false
                    });
                }
                saveMessage(messages)
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
         pageIndex:0
         }
         */
        getMessage(user.LoginId,user.Read,40,user.pageIndex||0,function(result){
            socket.emit('get notify',result);
        })
    })

}