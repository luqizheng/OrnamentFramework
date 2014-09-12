define(["text!./Templates/Org.html"], function (template) {

    var widget = avalon.ui.pager = function(element, data, vmodels) {
        var options = data.pagerOptions,
          //方便用户对原始模板进行修改,提高制定性
          optionsTemplate = template;

        var vmodel = avalon.define(data.pagerId, function (vm) {

            avalon.mix(vm, options);

            orgs = [{ Name: "", Childs: [] }];

            vm.$init = function () {
                var pageHTML = optionsTemplate;
                element.style.display = "none";
                element.innerHTML = pageHTML;
                $.get("/Api/Memberships/Orgs", function(data) {
                    orgs = data;
                });
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

});