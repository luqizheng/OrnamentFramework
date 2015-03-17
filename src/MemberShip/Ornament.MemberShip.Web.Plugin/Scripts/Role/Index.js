define(["bootbox", "jquery"], function (bootbox, $) {

    var $form, model, editable, messages = {
        saveBtnCreate: "添加",
        saveBtnEdit: "保存",
        createTitle: "创建新的角色",
        editTitle: "编辑角色",
        saveSuccess: "保存成功"
    };

    function changeVal() {

        require(["vaform"], function () {
            $form = $("#roleEdit").vaform({
                url: '/memberShips/Role/Save',
                before: function () {
                    editable.loading = true;
                },
                success: function (rData) {
                    bootbox.alert(rData.success ? messages.saveSuccess : rData.Message);

                    editable.Id = rData.Id;
                    if (model.curRole==null) {
                        model.AddToCur(editable.getPureModel());
                    } else {
                        avalon.mix(model.curRole, editable.getPureModel());
                    }

                    bootbox.alert(rData.success ? messages.success : rData.Message);
                },
                done: function () {
                    this.find("input").prop("disabled", false);
                    editable.loading = false;
                }
            });
        });
    }

    function init() {
        model = avalon.define({
            $id: 'index',
            edit: function (el, e) {
                model.curRole = el;
                avalon.mix(editable, model.curRole.$model);
                editable.editing = true;
                e.preventDefault();
            },
            create: function (e) {
                editable.editing = true;
                editable.clear();
                model.curRole = null;
            },
            curRole: null,
            del: function (el, $remove, $event) {
                $event.preventDefault();
                $event.stopPropagation();
                $.post("role/delete", { role: el.Id }, function (r) {
                    if (r.success) {
                        editable.clear();
                        model.curRole = null;
                        bootbox.alert('Success to delete role.');
                        $remove(el);
                    }
                });

            },
            AddToCur: function (role) {
                model.roles.push(role);
                model.curRole = role;
            },
            roles: [{ Id: "", Name: "", Remarks: "", Permissions: [] }],
            pager: {
                pageSize: 50,
                search: function (index, maxRecords, func) {
                    $.get("/MemberShips/Role/List", {
                        PageSize: maxRecords,
                        CurrentPage: index
                    }, function (d) {
                        model.roles = d.data;
                        func(d.totalRecords);
                    });
                }
            }
        });

        editable = avalon.define({
            $id: "edit",
            Id: "",

            saveBtnText: {
                get: function () {
                    return this.IsCreated ? messages.saveBtnCreate : messages.saveBtnEdit;
                }
            },
            Name: "",
            Remarks: "",
            Permissions: [],
            editing: false,
            loading: false,
            title: {
                get: function () {
                    return this.IsCreated ? messages.createTitle : messages.editTitle;
                }
            },

            clear: function () {
                avalon.mix(editable, { Name: "", Id: "", Remarks: "", Permissions: [] });
            },
            IsCreated: {
                get: function () {
                    return this.Id=="";
                }
            },
            reset: function () {
                avalon.mix(editable, model.curRole.$vmodel);
            },
            cancel: function () {
                editable.editing = false;
                editable.clear();
            },
            getPureModel: function () {
                return {
                    Id: editable.Id,
                    Name: editable.Name,
                    Remarks: editable.Remarks,
                    Permissions: editable.Permissions
                };
            }
        });
    }





    return {
        init: function (message) {
            if (message) {
                messages = avalon.mix(messages, message);
            }

            changeVal();
            require(["pager"], function () {
                init();
                avalon.scan();
            });

        },
        clear: function () {
            delete avalon.vmodels['index'];
            delete avalon.vmodels['edit'];
        }
    };

})