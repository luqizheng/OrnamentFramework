/*
* jQuery inline bar plugin
* Require jQuery Templating Plugin support
* Copyright 2008，hee123
* Dual licensed under the MIT or GPL Version 2 licenses.
*/
/// <reference path="jquery-1.8.0.js" />

(function ($) {

    var defaultOpts = {
        selectedTemp: '<div><div class="btn-group"><a class="btn btn-mini disabled"><i class="${icon}"></i> ${text}</a><a class="btn btn-mini mc-remove" ><i class="icon-remove"></i></a></div></div>',
        dropdownTmp: '<div><a><i class="${icon}"></i> ${text}</a></div>',
        noResult: "No match result.",
        closeTarget: ".mc-remove"
    };

    var MultiChoice = function (element, opts) {

        replaceSelectEl.call(element, opts); //Init the UI;
        var eventData = { options: opts };

        var $sel = $(element);
        $sel.next().on("click", eventData, this.toggle)
            .delegate(opts.closeTarget, "click", eventData, this.unSelect)
            .delegate(".mc-barItem", "click", function (e) {
                e.preventDefault();
                e.stopPropagation();
            })
            .next().children().on("click", eventData, this.select);


        $(".search-box", $sel)
            .on("keyup", eventData, this.search)
            .on("keydown", function (e) {
                if (e.which == 13) {
                    e.preventDefault();
                }
            });

        $("html").on("click", this.toggle);
    };
    MultiChoice.prototype = {
        constructor: MultiChoice,
        toggle: function (e) {
            $(".mc-dropdown").hide();
            var $this = $(this);
            var $mc = $(e.target).closest(".mc");
            if ($mc.length != 0) {
                $(".mc-dropdown", $mc).addClass("mc-open").show();
                $(".search-box", $mc).focus();
                ensureNoResultPanel($this.prev());
                e.preventDefault();
                e.stopPropagation();
            }
        },
        select: function (e) {

            var $tag = $(this).closest("ul").prev().prev(),
                val = $(this).attr("data"); //Find the value in select.
            if (val != undefined) {

                $("[value=" + val + "]", $tag).each(function () {
                    selectIt($tag, $(this), true, e.data.options);
                });
                ensureNoResultPanel($tag);

                $(this).addClass("mc-selected");
            }
            e.preventDefault();
            e.stopPropagation();

        },
        unSelect: function (e) {
            var val = $(this).closest(".mc-barItem").attr("data"),
                $bar = $(this).closest("ul.mc-bar"),
                $selectElement = $bar.prev();
            $("[value=" + val + "]", $selectElement).each(function () {
                selectIt($selectElement, $(this), false, e.data.options);
            });
            ensureNoResultPanel($selectElement);
            e.preventDefault();
            e.stopPropagation();
        },
        search: function (e) {
            //show the pop menu;
            var keyCode = e.keyCode;
            var func = searchHandler[keyCode];
            if (func) {
                func.call(this);
            } else {
                search($(this).closest(".mc-bar").next(), $(this).val());
            }
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    };
    var upAndDown = function (bUp) {
        console.log(bUp);
        var $dropDown = $(this).closest(".mc-bar").next();
        if ($(".active", $dropDown).length == 0) {
            $dropDown.children().not(".mc-selected").first().addClass("active");
        } else {
            var current = $(".active", $dropDown);
            var nextStep = find(current, bUp);
            if (nextStep.length == 0)
                return;
            current.removeClass("active");
            nextStep.addClass("active");
        }

        function find(current, bUp) {
            var nextStep = bUp ? current.prev() : current.next();
            while (nextStep.length != 0 && nextStep.hasClass("mc-selected")) {
                nextStep = bUp ? nextStep.prev() : nextStep.next();
                ;
            }
            return nextStep;
        }
    };

    var searchHandler = {
        "13": function () {
            var a = $(this).closest(".mc-bar").next();
            $(".active", a).click();
        },
        "38": function () { //up
            upAndDown.call(this, true);
        },
        "40": function () { //down
            upAndDown.call(this, false);
        },
        "27": function () {
            $(".mc-dropdown").hide();
        }
    };

    function search($dropDown, searchText) {
        var findOnce = false;
        $dropDown.children().each(function () {
            var match = $(this).text().indexOf(searchText) != -1;
            $(this).toggleClass("mc-no-match", !match);
            if (!findOnce && match) {
                findOnce = true;
            }
        });
        if (!findOnce) {
            $(".mc-no-result", $dropDown).show();
        }
    }

    $.fn.multiChoice = function (option) {

        if ($.tmpl == undefined) {
            alert('Can not find the jquery template plugin');
            return undefined;
        }
        return this.each(function () {

            var $this = $(this), data = $this.data('multiChoice');
            if (!data) {
                $this.data('multiChoice', (data = new MultiChoice(this, $.extend({}, defaultOpts, option))));
            }
            if (typeof option == 'string') data[option].call($this);
        });
    };

    function selectIt($selectEle, $optionEle, bSelect, options) {
        var val = $optionEle.val(),
            $bar = $selectEle.next(),
            $dropDown = $bar.next();
        changeSelectElementStatus.call($selectEle, val, bSelect);
        $optionEle[0].selected = bSelect;

        $("li[data=" + val + "]", $dropDown)
            .toggle(!bSelect)
            .toggleClass("mc-selected", bSelect)
            .toggleClass("active", bSelect);

        if (!bSelect) {
            $("li[data=" + val + "]", $bar).remove();
        } else {
            $optionEle.each(function () {
                buildSelectedItem(this, options).insertBefore($bar.children(":last-child"));
            });
        }
    }

    function changeSelectElementStatus(id, bSelect) {

        var ary = [], selAry = $(this).val() || [];

        $.each(selAry, function () {
            if (bSelect || (id != this && !bSelect)) {
                ary.push(this);
            }
        });
        if (bSelect) {
            ary.push(id);
        }
        $(this).val(ary);
    }

    /*following are build the htmlUI
    -------------------------------*/

    function replaceSelectEl(opt) {

        var $tag = $(this),
            selectedBar = $('<ul class="mc-bar" />'),
            popPanel = $('<ul class="mc-dropdown dropdown-menu"/>');

        selectedBar.attr("style", $tag.attr("style"));
        $tag.children().each(function (i) {
            var li = $('<li data="' + $(this).val() + '"/>').appendTo(popPanel);
            var popItem = buildPopPanelItem(this, opt).appendTo(li);
            if ($tag[0].options[i].selected) {
                popItem.parent().addClass("mc-selected");
                selectedBar.append(buildSelectedItem(this, opt));
            }
        });

        popPanel.append('<li><div class="mc-no-result">' + opt.noResult + '</div></li>');
        selectedBar.append('<li>' + searchBox($tag) + '</li>');
        $tag.addClass("ui-helper-hidden-accessible").wrap('<div class="mc"/>').after([selectedBar, popPanel]);

        function searchBox($selectEl) {
            var attrObj = attrToObj($selectEl[0], ["style", "class"]);
            var result = ['<input class="search-box" autocomplete="false" type="text"'];
            for (var key in attrObj) {
                result.push(key + '="' + attrObj[key] + "'");
            }
            result.push("/>");
            return (result.join(""));
        }
    }

    //build pop up menut's item accroding template

    function buildPopPanelItem(optionEl, opt) {
        return $(opt.dropdownTmp).tmpl(toTmpData(optionEl));
    }

    //build select bar menut's item accroding template

    function buildSelectedItem(optionEl, opt) {
        return $('<li class="mc-barItem" data="' + $(optionEl).val() + '" />')
            .append($(opt.selectedTemp).tmpl(toTmpData(optionEl)));
    }

    function ensureNoResultPanel($selectElement) {

        $(".mc-no-result", $selectElement.next().next()).toggle($.makeArray($selectElement.val()).length == $selectElement.children().length);
        $selectElement.next().next().children().removeClass("mc-no-match");
    }

    function toTmpData(el) {
        var arr = attrToObj(el, ["selected", "style"]);
        arr.text = $(el).html();
        arr.val = $(el).val();
        return arr;
    }

    function attrToObj(el, arySkipAttr) {
        var skipStr = "," + arySkipAttr.join(",") + ",";
        var arr = {};
        for (var i = 0, attrs = el.attributes, l = attrs.length; i < l; i++) {
            var att = attrs.item(i);
            if (skipStr.indexOf("," + att.nodeName + ",") != -1)
                continue;
            arr[att.nodeName] = att.nodeValue;
        }
        return arr;
    }

    $(document).ready(function () {
        $(".multiChoice").multiChoice();
    });
})(jQuery)