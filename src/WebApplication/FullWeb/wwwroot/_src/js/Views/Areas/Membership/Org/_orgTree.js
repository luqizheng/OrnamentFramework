var OrgService = require("../../../../modules/membership/orgservice.js");
var avalon = require('avalon');
var $ = require('jquery');


module.exports = {
    create: function (id, fnOnclick) {
       var result= avalon.define({
            $id: id,
            orgConfig: {
                subPropName: "subOrgs",
                getText: function (el) {
                    return el.name;
                },
                onSelect: function (el) {
                    fnOnclick && fnOnclick(el);
                }
            },
            orgs: [{ name: '', subOrgs: [], open: false, id: 0 }] //avalon无法自动parse，因此要处理好对象接哦古
        })


        OrgService.list(null).done(function (data) {
            result.orgs = data;
        })
        return result;
    },
    destory: function (id) {
        delete avalon.vmodels[id];
    }
}