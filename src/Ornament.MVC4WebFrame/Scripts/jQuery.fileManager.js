(function ($) {

    var defaultOpts = {
        listUrl: false,
        deleteUrl: false,
        deleteFolderUrl: false,
        createFolderUrl: false,
        curFolder: "/",
        itemClick: function (fileInfo) {
            alert("please special item click,fileInfo.fullPath");
        },
        modals: {
            createFolder: function () {
                alert('please defined extends.createFolder');
            },
            upload: function (options) {
                alert("please defined modals.upload");
                return;
            }
          
        }
    };

    function FileManager(element, opts) {

        var $element = $(element), eventData = { inc: this };
        this.element = $element;
        this.options = opts;

        var fileManager = ui.init($element);
        this.fileList = fileManager.fileList;


        fileManager.toolbar.bind('click', eventData, raiseEvent);

        $(".item", element).on("hover",
            function (e) {
                $(this).find(".btn-toolbar").toggle(e.type == "mouseenter");
            }).on("click", eventData, raiseEvent);

        this.refresh();

        function raiseEvent(e) {

            var $target = $(e.target), role = $target.attr("role"), $currentTarget = $(e.currentTarget);
            if (!role) {
                role = $target.closest("[role]").attr("role");
            }
            if (role) {
                var funcName = role;
                if (!eventHandler[funcName]) {
                    funcName = "extends";
                }
                eventHandler[funcName].call(this, e, role);
                e.preventDefault();
                e.stopPropagation();
                return true;
            }

            return true;
        }
    }



    var eventHandler = {
        refresh: function (e) {
            e.data.inc.refresh();
        },
        back: function (e) {

            if (!$(e.target).closest("[role]").hasClass("disabled")) {
                e.data.inc.back();
            }
        },
        "delete": function (e) {
            var target = ui.toFileObj($(this).closest("li"));
            e.data.inc.del(target);
        },
        openFolder: function (e) {
            var target = ui.toFileObj($(this).closest("li"));
            e.data.inc.openFolder(target.fullPath);
        },
        download: function (e) {
            var target = ui.toFileObj($(this).closest("li"));
            e.data.inc.download(target.fullPath);
        },

        "extends": function (e, role) { //need to custom UI for createFolder
            e.data.inc.options.modals[role].call(this);
        },
        "item": function (e, role) {
            var target = ui.toFileObj($(this).closest("li"));
            if (!target.file) {
                e.data.inc.openFolder(target.fullPath);
            }
            else {
                e.data.inc.options.itemClick.call(this, target);
            }
        }
    };



    FileManager.prototype = {
        element: false,
        fileList: false,
        options: false,
        refresh: function () {

            var fileList = this.fileList,
                listUrl = this.options.listUrl,
                folder = this.options.curFolder;

            $.getJSON(listUrl, { folder: folder }, function (data) {

                fileList.html("");
                if (data.length != 0) {
                    $(data).each(function () {
                        ui.fileItem(this).appendTo(fileList);
                    });
                    fileList.children().fadeIn();
                }
                else {
                    ui.noFiles().appendTo(fileList).fadeIn();
                }
            });

        },
        openFolder: function (folder) {
            $("[role=back]", this.element).removeClass("disabled");
            this.options.curFolder = folder;
            this.refresh();
        },
        createFolder: function (folder) {
            var $fileList = this.fileList;
            $.getJSON(this.options.createFolderUrl, { "folder": folder }, function (r) {

                if (r.success) {
                    var a = $(ui.fileItem(r.data)).hide()
                        .insertBefore($("li:first", $fileList));
                    var $item = a.find(".item").addClass("curState");
                    a.fadeIn("slow", function () {
                        $this = $(this);
                        setTimeout(function () {
                            $item.removeClass("curState");
                        }, 1000);
                    });
                }
                else {
                    alert(r.message);
                }
            });
        },
        download: function (file) {
            var url = this.options.downloadUrl + "?file=" + file;
            var iframe = $("#hiddenDownloader");
            if (iframe.length == 0) {
                iframe = $('<iframe id="hiddenDownloader"/>').hide().appendTo($("body"));
            }
            iframe[0].src = url;
        },
        back: function () {

            var folder = this.curFolder;
            var parentFolder = '/';
            if (folder != '/') {
                var ary = folder.split('/');
                ary.pop();
                parentFolder = '/' + ary.join('/');
            }
            if (parentFolder == "/") {
                $("[role=back]", this.element).addClass("disabled");
            }
            this.curFolder = parentFolder;
            this.refresh();
        },
        del: function (fileObj) {

            var options = this.options, $item = this.element.find("li[data='" + fileObj.fullPath + "']");

            if (confirm("Could you want to delete file?")) {
                var param = {};
                param[(fileObj.file ? "file" : "folder")] = fileObj.name;

                $.getJSON(fileObj.file ? options.deleteFileUrl : options.deleteFolderUrl, param, function (result) {
                    if (result.success) {
                        $item.find(".item").addClass("curState");
                        $item.fadeOut('slow', function () {
                            $(this).remove();
                        });
                    }
                    else {
                        alert("error:" + result.message);
                    }
                });
            }

        }

    };

    var ui = {
        init: function ($element) {
            var result = {
                toolbar: $('<div class="btn-toolbar"/>'),
                fileList: $('<ul role="fileList"/>')
            },
                refresh = $('<a class="btn btn-small" role="refresh"><i class="icon-refresh"></i></a>'),
                createFolder = $('<a class="btn btn-small" role="createFolder"><i class="icon-folder-open"></i></a>'),
                upload = $('<a class="btn btn-small" role="upload"><i class="icon-upload-alt"></i></a>'),
                back = $('<a class="btn btn-small disabled" role="back"><i class="icon-arrow-left"></i></a>'),
                showIcon = $('<a class="btn btn-small active" role="show-icon"><i class="icon-picture"></i></a>'),
                showTable = $('<a class="btn btn-small" role="show-table"><i class="icon-table"></i></a>'),

                btnGroup1 = $('<div class="btn-group"/>').append(refresh, createFolder, upload),
                btnGroup2 = $('<div class="btn-group"/>').append(back),
                btnGroup3 = $('<div class="btn-group pull-right" data-toggle="buttons-radio"/>').append(showIcon, showTable);

            result.toolbar.append(btnGroup1, btnGroup2, btnGroup3);
            $element.append(result.toolbar, result.fileList);

            return result;
        },
        noFiles: function () {
            return $('<li class="alert alert-block hide">No file found</li>');
        },
        fileItem: function (fileItem) {
            var wrapper = $('<a class="item" role="item" data="' + fileItem.fullPath + '" file="' + fileItem.file + '"/>')
                .append('<div class="btn-toolbar" style="display:none"><div class="btn-group pull-right">' +
                            (fileItem.file ? '<a class="btn btn-mini" title="Download" role="download"><i class="icon-download"></i></a>' :
                                       '<a class="btn btn-mini" title="Open folder" role="openFolder"><i class="icon-folder-open"></i></a>') +
                    '<a class="btn btn-mini" role="delete" title="Delete this file"><i class="icon-remove"></i></a>' +
                        '</div></div>') // menu
                .append('<img alt="' + fileItem.name + '" src="' + fileItem.alterImage + '"/>') //image icon
                .append('<div class="fileName">' + fileItem.name + '</div>'); // file name

            return $('<li title="' + fileItem.name + '" data="' + fileItem.fullPath + '" style="display:none">').append(wrapper);
        },
        toFileObj: function ($li) {
            var $item = $(".item", $li);
            var result = {
                fullPath: $item.attr("data"),
                file: $item.attr("file") == "true",
                alterImage: $("[role=image]").attr("src"),
                name: $(".fileName", $li).text()
            };
            return result;

        }


    };

    $.fn.fileManager = function (option) {
        var args = arguments,
        result = null,
        target = this.each(function () {

            var $this = $(this), data = $this.data('FileManager');
            if (!data) {
                $this.data('FileManager', (data = new FileManager(this, $.extend({}, defaultOpts, option))));
                $this.attr("role", 'fileManager');
            }
            if (typeof option == 'string') {
                var a = $.makeArray(args);
                a.shift();
                var func = data[option];
                if ($.isFunction(func)) {
                    result = data[option].apply(data, a);
                }
                //it should be set or get option.
                if (args.length > 1)
                    data.options[option] = args[1];
                else
                    result = data.options[option];
            }
        });

        return result || target;
    };

})(jQuery)