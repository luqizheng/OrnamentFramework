/// <reference path="../../../../../../lib/jquery-validation-unobtrusive/jquery.validate.unobtrusive.min.js" />
/// <reference path="../../../../../../lib/jquery-validation-unobtrusive/jquery.validate.unobtrusive.js" />
/// <reference path="../../../../../../lib/jquery-validation/dist/jquery.validate.min.js" />
/// <reference path="../../../../../../lib/jquery-validation/dist/jquery.validate.js" />


module.exports.for = function(selector, fnSuccess) {
    require.ensure(["jquery", "jq-form", "jq-val", "jq-val-uo"],
        function() {
            var $ = require("jquery");
            require("jq-form");
            require("jq-val");
            require("jq-val-uo");
            var $form = $(selector).ajaxForm();
            $.validator.unobtrusive.parse(selector);
            var $formSetting = $form.data("validator");
            if ($formSetting) {
                $formSetting.settings.submitHandler = function() {
                    $form.ajaxSubmit(fnSuccess);
                    return false;
                };
            }
            return $form;
        });
}