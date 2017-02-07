var $ = require("jquery");


function build(selector, ajaxFormOptions, fnSubmit) {
    require.ensure(["jq-form", "jq-val", "jq-val-uo"],
        function () {
            require("jq-val");
            require("jq-val-uo");
            require("jq-form");

            var $form = $(selector);
            ajaxFormOptions ? $form.ajaxForm(ajaxFormOptions) : $form.ajaxForm();
            $.validator.unobtrusive.parse(selector);
            var $formSetting = $form.data("validator");

            try {
                if ($formSetting) {
                    $formSetting.settings.submitHandler = function () {
                        fnSubmit($form);
                        return false;
                    };
                } else {
                    $form.submit(function (e) {
                        fnSubmit($form);
                        e.preventDefault();
                    });
                }
                return $form;
            }
            catch (e) {
                console.error(e);
            }
        });
}


module.exports = {
    'for': function (selector, fnSuccess) {
        build(selector, false, function ($form) {
            $form.ajaxSubmit(fnSuccess);
        }, fnSuccess);
    },
    forWebApi: function (selector, fnSubmit) {
        build(selector, false, fnSubmit);

    }
};

