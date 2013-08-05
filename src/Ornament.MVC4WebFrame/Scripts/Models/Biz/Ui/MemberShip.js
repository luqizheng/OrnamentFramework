define(function (require) {
    /* for user ajax search */                 
    var org = require("/scripts/models/base/memberShips/org-1.0.js"),
     user = require("/scripts/models/base/memberShips/user-1.0.js"),
     role = require("/scripts/models/base/memberShips/role-1.0.js"),
     userGroup = require("/Scripts/Models/Base/MemberShips/userGroup-1.0.js");
    return {
        select2: {
            org: function (select2, a) {
                org.select2(select2, a);
            },
            user:function(selector,data){ user.select2(selector,data);},
            role: function (selector, data) { role.select2(selector, data); },
            userGroup: function (selector, data) { userGroup.select2(selector, data); },
        }
    };
});

