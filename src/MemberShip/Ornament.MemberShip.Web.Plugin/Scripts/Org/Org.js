define(["text!./Templates/Org.html"], function (template) {

    var widget = avalon.ui.org = function (element, data, vmodels) {

        var options = data.orgOptions,
          optionsTemplate = template;



        var vmodel = avalon.define(data.orgId, function (vm) {
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
                    vm.selectedId = vm.curOrg.Id;
                    vm.selectedName = vm.curOrg.Name;
                    console.log(vm.selectedId + ":" + vm.selectedName);
                }
            };
            
            
        });

      
        return vmodel;
    };

    widget.defaults = {
        editable: false,
        select: true,
        selectedName: "请选择",
        selectedId: "",
        id:"" // razor's id for bootstrap modal.
};
    return avalon;
});