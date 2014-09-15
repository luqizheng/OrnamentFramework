define(["text!./Templates/Org.html"], function (template) {

    var widget = avalon.ui.org = function (element, data, vmodels) {

        var options = data.orgOptions,
          optionsTemplate = template;



        var vmodel = avalon.define(data.orgId, function (vm) {
            vm.id = "";
            avalon.mix(vm, options);
            vm.orgs = [{ Name: "",selected:false, Childs: [],Id:"" }];
            vm.selectOrg = null;
            vm.$init = function () {
                var pageHTML = $(optionsTemplate);
                pageHTML.find(".modal:first").attr("id", vm.id + "_modal");
                element.style.display = "none";
                element.innerHTML += pageHTML.html();

                setTimeout(function () {

                    avalon.scan(element, [vmodel].concat(vmodels));

                    element.style.display = "";

                    $.get("/Api/Memberships/Orgs", function (data) {
                        function reset(aryOrgs) {
                            for (var i = 0; i < aryOrgs.length; i++) {
                                aryOrgs[i].selected = false;
                                if (vm.curOrg && vm.curOrg.Id == data.Id) {
                                    aryOrgs[i].selected = true;
                                }
                                if (aryOrgs[i].Childs && aryOrgs[i].Childs.length != 0) {
                                    reset(aryOrgs[i].Childs);
                                }
                            }
                            
                        }

                        reset(data);
                        vm.orgs = data;
                    });
                }, 150);
            };
            vm.$remove = function () {
                element.innerHTML = "";
            };
            vm.orgName = {
                get: function() {
                    return vm.curOrg ?
                        vm.curOrg.Name : "请选择";
                }
            };
            vm.orgId = {
                get: function () {
                    return vm.curOrg ?
                            vm.curOrg.Name : "";
                }
            };
            vm.curOrg = false;//已经选择了的node
            vm.toggle = function () {
                
                if (vm.curOrg) {
                    vm.curOrg.selected = false;
                }
                vm.curOrg = this.$vmodel.el;
                vm.curOrg.selected = true;
                

                var $childMenu = $(this).closest("li").find("ul:first");

                if (this.$vmodel.el.Hide) {
                    $childMenu.show('fast');
                } else {
                    $childMenu.hide('fast');
                }
                this.$vmodel.el.Hide = !this.$vmodel.el.Hide;
            };

            vm.ok = function () {
                if (vm.curOrg) {
                    options.OnOk(vm.curOrg);
                }
            };

            vm.$skipArray = ["curName", "curId"];

         
        });


        return vmodel;
    };

    widget.defaults = {
        editable: false,
        select: true,
        OnOk: false
    };
    return avalon;
});