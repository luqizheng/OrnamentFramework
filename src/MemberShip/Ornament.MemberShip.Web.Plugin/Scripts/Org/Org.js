define(["text!./Templates/Org.html"], function (template) {

    var widget = avalon.ui.org = function (element, data, vmodels) {
        
        var options = data.orgOptions,
          optionsTemplate = template;

        var vmodel = avalon.define(data.orgId, function (vm) {

            avalon.mix(vm, options);

            vm.orgs = [{ Name: "", Childs: [] }];
            vm.selectOrg = null;
            vm.$init = function () {
                var pageHTML = optionsTemplate;
                element.style.display = "none";
                element.innerHTML = pageHTML;
                setTimeout(function () {
                    alert('ok');
                    avalon.scan(element, [vmodel].concat(vmodels));
                    element.style.display = "";

                    $.get("/Api/Memberships/Orgs", function (data) {
                        vm.orgs = data;
                    });

                }, 150);


            };
            vm.$remove = function () { element.innerHTML = ""; };

            vm.toggle = function () {
                if (this.$vmodel.el.Hide) {
                    $(this).closest("li").find("ul:first").show('fast');
                } else {
                    $(this).closest("li").find("ul:first").hide('fast');
                }
                this.$vmodel.el.Hide = !this.$vmodel.el.Hide;
            };
        });


        return vmodel;
    };

    widget.defaults = {
        editable: false,
        select: true
    };
    return avalon;
});