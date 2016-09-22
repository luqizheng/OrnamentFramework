'use strict';
var treeID = 0;
avalon.component('ms-tree', {
    template: require('html!./root_tree.html'),
    defaults: {
        icons:
        {
            added: ["fa", "fa-large"],
            close: "fa-plus-circle",
            open: 'fa-minus-circle',
            withoutChild: 'icon-leaf',
            withChild: "parent_li"
        },
        getChangeIcon: function (el) {

            var s = this.icons.added.slice(0);
            var addClass = "";
            if (!this.hasSubTree(el)){
                addClass = this.icons.withoutChild;
            }
            else {
                addClass = el.open ? this.icons.open : this.icons.close;
            }
            s.push(addClass);
            return s;
        },
        onSelect:function(el){
            console.warn("请设置tree控件的onSelect方法")
        },
        hasSubTree: function (el) {
            var subTree = el[this.subPropName];
            return subTree.length != 0;
        },
        tree: [],
        subPropName: "subtree",
        renderSubTree: function (el) {

            var subTree = el[this.subPropName];
            return subTree.length
                ? '<wbr is="ms-tree" ms-widget="{$id:"tree_' +
                (++treeID) +
                '", tree: el.' +
                this.subPropName +
                ',clz:"parent_li"}" />'
                : '';
        },
        openSubTree: function (el, e) {
            this.onSelect(el);
            el.open = !el.open;
            e.stopPropagation();
        },
        getText: function (el) {
            return el.Name
        }
    }
})
