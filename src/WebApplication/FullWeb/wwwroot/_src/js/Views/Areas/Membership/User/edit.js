/// <reference path="../../../../../../lib/jquery-validation-unobtrusive/jquery.validate.unobtrusive.min.js" />
/// <reference path="../../../../../../lib/jquery-validation-unobtrusive/jquery.validate.unobtrusive.js" />
/// <reference path="../../../../../../lib/jquery-validation/dist/jquery.validate.min.js" />
/// <reference path="../../../../../../lib/jquery-validation/dist/jquery.validate.js" />
require.ensure(["jquery", "jq-form", "jq-val", "jq-val-uo"], function () {
    require("jq-form")
    require("jq-val")
    require("jq-val-uo")
    var $ = require("jquery")
    console.log("init edit.js is success.")
    $.validator.unobtrusive.parse("#user-edit-form")
})




