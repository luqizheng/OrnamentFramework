var treeID = 0
avalon.component('tree', {
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
            if (!this.hasSubTree(el))
                addClass = this.icons.withoutChild;
            else {
                if (el.open)
                    addClass = this.icons.open;
                else {
                    addClass = this.icons.close;
                }
            }
            s.push(addClass);
            return s;
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
                ? '<wbr is="tree" ms-widget="{$id:"tree_' +
                (++treeID) +
                '", tree: el.' +
                this.subPropName +
                ',clz:"parent_li"}" />'
                : '';
        },
        openSubTree: function (el, e) {

            el.open = !el.open;

            e.stopPropagation();
        },
        getText: function (el) {
            return el.Name
        }
    }
})
