/// <reference path="../../../../../../lib/jquery-validation-unobtrusive/jquery.validate.unobtrusive.min.js" />
/// <reference path="../../../../../../lib/jquery-validation-unobtrusive/jquery.validate.unobtrusive.js" />
/// <reference path="../../../../../../lib/jquery-validation/dist/jquery.validate.min.js" />
/// <reference path="../../../../../../lib/jquery-validation/dist/jquery.validate.js" />

function build(selector, ajaxFormOptions, fnSuccess) {
    require.ensure(["jquery", "jq-form", "jq-val", "jq-val-uo"],
        function () {
            var $ = require("jquery");
            require("jq-form");
            require("jq-val");
            require("jq-val-uo");

            var $form = $(selector);
            ajaxFormOptions ? $form.ajaxForm(ajaxFormOptions) : $form.ajaxForm();
            $.validator.unobtrusive.parse(selector);
            var $formSetting = $form.data("validator");
            if ($formSetting) {
                $formSetting.settings.submitHandler = function () {
                    $form.ajaxSubmit(fnSuccess);
                    return false;
                };
            }
            return $form;
        });
}


module.exports = {
    'for': function (selector, fnSuccess) {
        build(selector, false, fnSuccess);
    },
    forWebApi: function (selector, fnSubmit) {
        var $ = require("jquery");
        require("jq-val");
        require("jq-val-uo");
        var $form = $(selector);
        $.validator.unobtrusive.parse(selector);
        var $formSetting = $form.data("validator");
        $formSetting.settings.submitHandler = function () {
            fnSubmit();
            return false;
        };
    }
};

