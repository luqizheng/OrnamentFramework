/// <reference path="../../../../../../lib/jquery-validation-unobtrusive/jquery.validate.unobtrusive.min.js" />
/// <reference path="../../../../../../lib/jquery-validation-unobtrusive/jquery.validate.unobtrusive.js" />
/// <reference path="../../../../../../lib/jquery-validation/dist/jquery.validate.min.js" />
/// <reference path="../../../../../../lib/jquery-validation/dist/jquery.validate.js" />
/// <reference path="../../../../modules/vaform.js" />
require.ensure(["../../../../modules/vaform.js"], function () {
    var vaform=require("../../../../modules/vaform.js")  
    vaform.for("#user-edit-form")
})




