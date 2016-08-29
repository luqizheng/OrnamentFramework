webpackJsonp([5],{

/***/ 16:
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../../../modules/avalon/ms-tree/ms-tree.js" />
	var OrgTree = __webpack_require__(17)
	
	function init() {
	    var result = avalon.define({
	        $id: 'orgTree',
	        orgs: [{
	            text: "aaa", open: 1, subtree: [
	                   { text: 1111, open: 1, subtree: [] },
	                   {
	                       text: 2222, open: 1, subtree: [
	                              { text: 777, open: 1, subtree: [] }
	                       ]
	                   },
	                   {
	                       text: 3333, open: 1, subtree: [
	                              { text: 8888, open: 1, subtree: [] },
	                              {
	                                  text: 9999, open: 1, subtree: [
	                                         { text: '司徒正美', open: 1, subtree: [] }
	                                  ]
	                              }
	                       ]
	                   }
	            ]
	        },
	                        {
	                            text: "bbb", open: 1, subtree: [
	                                   { text: 4444, open: 1, subtree: [] },
	                                   { text: 5555, open: 1, subtree: [] },
	                                   { text: 6666, open: 1, subtree: [] }
	                            ]
	                        },
	                        { text: "ccc", open: 1, subtree: [] },
	                        { text: "ddd", open: 1, subtree: [] },
	                        {
	                            text: "eee", open: 1, subtree: [
	                                   { text: 1234, open: 1, subtree: [] }
	                            ]
	                        },
	                        { text: "fff", open: 1, subtree: [] }
	        ]
	    })
	    return result;
	}
	
	
	function onload(contentLoadingArea) {
	    init();
	    avalon.scan(contentLoadingArea)
	}
	
	function unload() {
	
	}
	
	module.exports = {
	    load: onload,
	    unload: unload
	}

/***/ },

/***/ 17:
/***/ function(module, exports, __webpack_require__) {

	var treeID = 0
	avalon.component('tree', {
	    template: __webpack_require__(18),
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

/***/ },

/***/ 18:
/***/ function(module, exports) {

	module.exports = "<ul class=\"tree\">\r\n    <li ms-for=\"(index, el) in @tree | get(0)\">\r\n        {{el.text}}\r\n        <span ms-click='@openSubTree(el)' ms-text=\"@changeIcon(el)\"></span>\r\n        <div ms-visible=\"el.open\" ms-html=\"@renderSubTree(el)\">\r\n\r\n        </div>\r\n    </li>\r\n</ul>";

/***/ }

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi93d3dyb290L19zcmMvanMvdmlld3MvYXJlYXMvbWVtYmVyc2hpcC9PcmcvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vd3d3cm9vdC9fc3JjL2pzL21vZHVsZXMvYXZhbG9uL21zLXRyZWUvbXMtdHJlZS5qcyIsIndlYnBhY2s6Ly8vLi93d3dyb290L19zcmMvanMvbW9kdWxlcy9hdmFsb24vbXMtdHJlZS9yb290X3RyZWUuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFvQixtQ0FBbUM7QUFDdkQ7QUFDQTtBQUNBLGdDQUErQjtBQUMvQjtBQUNBLHFCQUFvQjtBQUNwQjtBQUNBO0FBQ0EsZ0NBQStCLG1DQUFtQztBQUNsRTtBQUNBO0FBQ0EsMkNBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLHFDQUFvQyxtQ0FBbUM7QUFDdkUscUNBQW9DLG1DQUFtQztBQUN2RSxxQ0FBb0M7QUFDcEM7QUFDQSwwQkFBeUI7QUFDekIsMEJBQXlCLG9DQUFvQztBQUM3RCwwQkFBeUIsb0NBQW9DO0FBQzdEO0FBQ0E7QUFDQSxxQ0FBb0M7QUFDcEM7QUFDQSwwQkFBeUI7QUFDekIsMEJBQXlCO0FBQ3pCO0FBQ0EsTUFBSztBQUNMO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7Ozs7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0VBQW1FLGdEQUFnRDtBQUNuSCxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsQzs7Ozs7OztBQ2ZELHlHQUF3RyxTQUFTLHNNIiwiZmlsZSI6IjUuNS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi8uLi9tb2R1bGVzL2F2YWxvbi9tcy10cmVlL21zLXRyZWUuanNcIiAvPlxyXG52YXIgT3JnVHJlZSA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9tb2R1bGVzL2F2YWxvbi9tcy10cmVlL21zLXRyZWUuanNcIilcclxuXHJcbmZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICB2YXIgcmVzdWx0ID0gYXZhbG9uLmRlZmluZSh7XHJcbiAgICAgICAgJGlkOiAnb3JnVHJlZScsXHJcbiAgICAgICAgb3JnczogW3tcclxuICAgICAgICAgICAgdGV4dDogXCJhYWFcIiwgb3BlbjogMSwgc3VidHJlZTogW1xyXG4gICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAxMTExLCBvcGVuOiAxLCBzdWJ0cmVlOiBbXSB9LFxyXG4gICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IDIyMjIsIG9wZW46IDEsIHN1YnRyZWU6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiA3NzcsIG9wZW46IDEsIHN1YnRyZWU6IFtdIH1cclxuICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IDMzMzMsIG9wZW46IDEsIHN1YnRyZWU6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiA4ODg4LCBvcGVuOiAxLCBzdWJ0cmVlOiBbXSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiA5OTk5LCBvcGVuOiAxLCBzdWJ0cmVlOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAn5Y+45b6S5q2j576OJywgb3BlbjogMSwgc3VidHJlZTogW10gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJiYmJcIiwgb3BlbjogMSwgc3VidHJlZTogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogNDQ0NCwgb3BlbjogMSwgc3VidHJlZTogW10gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6IDU1NTUsIG9wZW46IDEsIHN1YnRyZWU6IFtdIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiA2NjY2LCBvcGVuOiAxLCBzdWJ0cmVlOiBbXSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCJjY2NcIiwgb3BlbjogMSwgc3VidHJlZTogW10gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcImRkZFwiLCBvcGVuOiAxLCBzdWJ0cmVlOiBbXSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcImVlZVwiLCBvcGVuOiAxLCBzdWJ0cmVlOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAxMjM0LCBvcGVuOiAxLCBzdWJ0cmVlOiBbXSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCJmZmZcIiwgb3BlbjogMSwgc3VidHJlZTogW10gfVxyXG4gICAgICAgIF1cclxuICAgIH0pXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gb25sb2FkKGNvbnRlbnRMb2FkaW5nQXJlYSkge1xyXG4gICAgaW5pdCgpO1xyXG4gICAgYXZhbG9uLnNjYW4oY29udGVudExvYWRpbmdBcmVhKVxyXG59XHJcblxyXG5mdW5jdGlvbiB1bmxvYWQoKSB7XHJcblxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGxvYWQ6IG9ubG9hZCxcclxuICAgIHVubG9hZDogdW5sb2FkXHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vd3d3cm9vdC9fc3JjL2pzL3ZpZXdzL2FyZWFzL21lbWJlcnNoaXAvT3JnL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gNVxuICoqLyIsInZhciB0cmVlSUQgPSAwXHJcbmF2YWxvbi5jb21wb25lbnQoJ3RyZWUnLCB7XHJcbiAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnaHRtbCEuL3Jvb3RfdHJlZS5odG1sJyksXHJcbiAgICBkZWZhdWx0czoge1xyXG4gICAgICAgIHRyZWU6IFtdLFxyXG4gICAgICAgIHJlbmRlclN1YlRyZWU6IGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZWwuc3VidHJlZS5sZW5ndGggPyAnPHdiciBpcz1cInRyZWVcIiBtcy13aWRnZXQ9XCJ7JGlkOlwidHJlZV8nICsgKCsrdHJlZUlEKSArICdcIiwgdHJlZTogZWwuc3VidHJlZX1cIiAvPicgOiAnJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb3BlblN1YlRyZWU6IGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgICAgICBlbC5vcGVuID0gIWVsLm9wZW5cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNoYW5nZUljb246IGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZWwub3BlbiAmJiBlbC5zdWJ0cmVlLmxlbmd0aCA/ICdbLV0nIDogJ1srXSdcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3d3d3Jvb3QvX3NyYy9qcy9tb2R1bGVzL2F2YWxvbi9tcy10cmVlL21zLXRyZWUuanNcbiAqKiBtb2R1bGUgaWQgPSAxN1xuICoqIG1vZHVsZSBjaHVua3MgPSA1XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBcIjx1bCBjbGFzcz1cXFwidHJlZVxcXCI+XFxyXFxuICAgIDxsaSBtcy1mb3I9XFxcIihpbmRleCwgZWwpIGluIEB0cmVlIHwgZ2V0KDApXFxcIj5cXHJcXG4gICAgICAgIHt7ZWwudGV4dH19XFxyXFxuICAgICAgICA8c3BhbiBtcy1jbGljaz0nQG9wZW5TdWJUcmVlKGVsKScgbXMtdGV4dD1cXFwiQGNoYW5nZUljb24oZWwpXFxcIj48L3NwYW4+XFxyXFxuICAgICAgICA8ZGl2IG1zLXZpc2libGU9XFxcImVsLm9wZW5cXFwiIG1zLWh0bWw9XFxcIkByZW5kZXJTdWJUcmVlKGVsKVxcXCI+XFxyXFxuXFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgPC9saT5cXHJcXG48L3VsPlwiO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+Ly5ucG1pbnN0YWxsL2h0bWwtbG9hZGVyLzAuNC4zL2h0bWwtbG9hZGVyIS4vd3d3cm9vdC9fc3JjL2pzL21vZHVsZXMvYXZhbG9uL21zLXRyZWUvcm9vdF90cmVlLmh0bWxcbiAqKiBtb2R1bGUgaWQgPSAxOFxuICoqIG1vZHVsZSBjaHVua3MgPSA1XG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==