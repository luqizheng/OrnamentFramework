/// <reference path="../../_appLayout.js" />
define(function (require) {

    return function (Model) {
        
        var $ = require("jquery");
        require("/bundles/jqueryui")($);
        require("wizard")($);
        require("../../_applayout.js");

        $("form").submit(function () {
            var i = 0;
            $("#operators :checkbox").each(function () {
                if (this.checked) {
                    i |= parseInt($(this).val());
                }
            });
            $("[name = operators]").val(i);
        });
        $("#wizard2").formwizard({
            formPluginEnabled: false,
            validationEnabled: true,
            focusFirstInput: true,
            disableUIStyles: true,
            formOptions: {
                resetForm: true
            }
        });

        $(document).delegate("#operators input", "change", function () {

            var check = this.checked;
            var beCheckValue = $(this).val();

            $("#operators input").each(function () {
                var checkValue = $(this).val();
                if (checkValue == beCheckValue)
                    return true;

                if (beCheckValue == 0 && check) {
                    this.checked = false;
                    return true;
                }

                var include;
                if (beCheckValue >= checkValue) {
                    include = hasPermission(beCheckValue, checkValue);
                    if (include && check) {
                        this.checked = true;
                    }
                } else {
                    include = hasPermission(checkValue, beCheckValue);
                    if (include && !check) {
                        this.checked = false;
                    }
                }
            });
        });

        $("#wizard2").bind("before_step_shown", function (event, data) {
            var curName = data.currentStep;
            if (curName == "resourceView") {
                $("#resViewContent").load("/Memberships/Permissions/ChoiceResourceView/" + $("[name=DescriptionResourceName]:checked").val());

            } else if (curName == "editPermission") {
                var input = {
                    resourceId: $("[name=ResourceId]:checked").val(),
                    permissionId: this.Model != null ? this.Model.Id : ""
                };
                var url = "/Memberships/Permissions/Operators/" + $("[name=DescriptionResourceName]:checked").val();
                $.get(url, input, function (d) {
                    var labels = [];
                    for (var key in d) {
                        labels.push('<label class="checkbox"><input type="checkbox" value="' + d[key] + '"/>' + key + '</label>');
                    }

                    $("#operators").html("").append(labels.join(""));

                    (function (permissions) {
                        $("#operators :checkbox").each(function () {
                            var theValue = parseInt(this.value);
                            var value = theValue & permissions;
                            this.checked = (value == theValue) && (permissions > theValue) && (theValue != 0);
                        });
                    })(Model != null ? this.Model.Operator : 0);
                });
            }
        });

    };

});