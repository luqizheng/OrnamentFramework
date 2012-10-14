(function ($) {

    $.wysiwyg.controls = {
        bold: {
            tags: ["b", "strong"],
            css: {
                fontWeight: "bold"
            },
            tooltip: "Bold",
            hotkey: { "ctrl": 1, "key": 66 },
            icon: "icon-bold"
        },
        highlight: {
            tooltip: "Highlight",
            className: "highlight",
            css: {
                backgroundColor: "rgb(0, 255, 102)"
            },
            command: ($.browser.msie || $.browser.safari) ? "backcolor" : "hilitecolor",
            exec: function (wysiwyg) {
                var command, node, selection, args;

                if ($.browser.msie || $.browser.safari) {
                    command = "backcolor";
                } else {
                    command = "hilitecolor";
                }

                if ($.browser.msie) {
                    node = this.getInternalRange().parentElement();
                } else {
                    selection = this.getInternalSelection();
                    node = selection.extentNode || selection.focusNode;

                    while (node.style === undefined) {
                        node = node.parentNode;
                        if (node.tagName && node.tagName.toLowerCase() === "body") {
                            return;
                        }
                    }
                }

                if (node.style.backgroundColor === "rgb(255, 255, 102)" ||
							node.style.backgroundColor === "#ffff66") {
                    args = "#ffffff";
                } else {
                    args = "#ffff66";
                }

                this.editorDoc.execCommand(command, false, args);
            }
        },
        h1: {
            className: "h1",
            command: ($.browser.msie || $.browser.safari) ? "FormatBlock" : "heading",
            args: ($.browser.msie || $.browser.safari) ? "<h1>" : "h1",
            tags: ["h1"],
            tooltip: "Header 1"
        },
        h2: {
            className: "h2",
            command: ($.browser.msie || $.browser.safari) ? "FormatBlock" : "heading",
            args: ($.browser.msie || $.browser.safari) ? "<h2>" : "h2",
            tags: ["h2"],
            tooltip: "Header 2"
        },
        h3: {
            className: "h3",
            command: ($.browser.msie || $.browser.safari) ? "FormatBlock" : "heading",
            args: ($.browser.msie || $.browser.safari) ? "<h3>" : "h3",
            tags: ["h3"],
            tooltip: "Header 3"
        },
        indent: {
            tooltip: "Indent",
            icon: "icon-indent-left"
        },
        insertHorizontalRule: {
            tags: ["hr"],
            tooltip: "Insert Horizontal Rule",
            icon:"icon-minus"
        },
        insertImage: {
            exec: function () { },
            tags: ["img"],
            tooltip: "Insert image",
            icon: "icon-picture"
        },
        insertOrderedList: {
            tags: ["ol"],
            tooltip: "Insert Ordered List",
            icon: "icon-list-ol"
        },
        insertUnorderedList: {
            tags: ["ul"],
            tooltip: "Insert Unordered List",
            icon: "icon-list-ul"
        },
        italic: {
            tags: ["i", "em"],
            css: { fontStyle: "italic" },
            tooltip: "Italic",
            icon: "icon-italic"
        },
        justifyCenter: {
            tags: ["center"],
            css: { textAlign: "center" },
            tooltip: "Justify Center",
            icon: "icon-align-center"
        },
        justifyFull: {
            css: { textAlign: "justify" },
            tooltip: "Justify Full"
        },
        justifyLeft: {
            css: { textAlign: "left" },
            tooltip: "Justify Left",
            icon: "icon-align-left"
        },
        justifyRight: {
            css: { textAlign: "right" },
            tooltip: "Justify Right",
            icon: "icon-align-right"
        },
        link: {
            exec: function () { },
            tags: ["a"],
            tooltip: "Create link",
            icon: "icon-link"
        },
        outdent: { tooltip: "Outdent", icon: "icon-indent-left" },
        paste: { tooltip: "Paste" },
        redo: { tooltip: "Redo", icon: "icon-repeat" },
        strikeThrough: {
            tags: ["s", "strike"],
            css: { textDecoration: "line-through" },
            tooltip: "Strike-through"
        },
        subscript: {
            tags: ["sub"],
            tooltip: "Subscript"
        },
        superscript: {
            tags: ["sup"],
            tooltip: "Superscript"
        },
        underline: {
            tags: ["u"],
            css: { textDecoration: "underline" },
            tooltip: "Underline", icon: "icon-underline"
        },
        undo: {
            tooltip: "Undo",
            icon: "icon-undo"
        }
    };

})(jQuery);