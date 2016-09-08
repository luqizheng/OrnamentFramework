   var $ = require("jquery");
function build(selector, ajaxFormOptions, fnSuccess) {
    require.ensure(["jq-form", "jq-val", "jq-val-uo"],
        function () {
         
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
            }else{
                $form.submit(function(e){
                    $form.ajaxSubmit(funSuccess);
                    e.preventDefault();
                })
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
        if ($formSetting) {
            $formSetting.settings.submitHandler = function() {
                fnSubmit();
                return false;
            };
        } else {
            $form.submit(function(e) {
                fnSubmit();
                e.preventDefault();
            });
        }
    }
};

