var treeID = 0
avalon.component('tree', {
    template: require('html!./root_tree.html'),
    defaults: {
        tree: [],
        renderSubTree: function (el) {
            return el.subtree.length ? '<wbr is="tree" ms-widget="{$id:"tree_' + (++treeID) + '", tree: el.subtree}" />' : ''
        },
        openSubTree: function (el) {
            el.open = !el.open
        },
        changeIcon: function (el) {
            return el.open && el.subtree.length ? '[-]' : '[+]'
        }
    }
})