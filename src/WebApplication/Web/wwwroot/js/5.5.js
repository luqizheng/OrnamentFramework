webpackJsonp([5],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(2);
	
	function WepApi(url) {
	    this.opts = {
	        url: url,
	        contentType: "application/json; charset=utf-8"
	    };
	
	    this.Put = function (data) {
	        /// <summary>
	        /// 
	        /// </summary>
	        /// <param name="data"></param>
	        /// <param name="func"></param>
	
	        var opts = this.ext.call(this, "PUT", data);
	
	        return $.ajax(opts);
	    };
	
	    this.Delete = function (data) {
	        /// <summary>
	        /// 
	        /// </summary>
	        /// <param name="data"></param>
	        /// <param name="func"></param>
	        var opts = this.ext.call(this, "DELETE", data);
	        if (data.id) {
	            opts.url += "/" + data.id;
	        }
	        return $.ajax(opts);
	    };
	    this.Post = function (data) {
	        /// <summary>
	        /// 
	        /// </summary>
	        /// <param name="data"></param>
	        /// <param name="func"></param>
	        var opts = this.ext.call(this, "POST", data);
	        return $.ajax(opts);
	    };
	    this.Get = function (data) {
	        /// <summary>
	        /// 
	        /// </summary>
	        /// <param name="data"></param>
	        /// <param name="func"></param>
	        var opts = this.ext.call(this, "GET", data);
	        return $.ajax(opts);
	    };
	
	
	    this.ext = function (method, data) {
	
	        var a = $.extend({}, this.opts, { type: method });
	
	        a.data = method !== "GET" ? JSON.stringify(data) : data;
	
	        return a;
	    };
	};
	
	
	module.exports = {
	    create: function (url) {
	        return new WepApi(url);
	    }
	}


/***/ },
/* 15 */,
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../../../modules/membership/orgservice.js" />
	/// <reference path="../../../../modules/avalon/ms-tree/ms-tree.js" />
	/// <reference path="../../../../modules/membership/orgservice.js" />
	/// <reference path="../../../../modules/vaform.js" />
	var OrgService = __webpack_require__(17);
	__webpack_require__(18);
	__webpack_require__(20)
	
	var avalon = __webpack_require__(6);
	var $ = __webpack_require__(2);
	
	var OrgTree = __webpack_require__(22);
	var Editor = __webpack_require__(23)
	
	
	function Onload(contentLoadingArea) {
	    var editorOrg=null;
	    var editor = Editor.create("orgEditor",function(returnVal){
	        avalon.mix(editorOrg,returnVal);
	    })
	    var tree = OrgTree.create('orgTree', function (el) {
	        editorOrg=el;
	        editor.org = el;
	    })
	
	    avalon.scan(contentLoadingArea)
	}
	
	function Unload() {
	    OrgTree.destory('orgTree');
	    Editor.destory('orgEditor');
	}
	
	module.exports = {
	    load: Onload,
	    unload: Unload
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var Webapi = __webpack_require__(14).create("/api/orgs");
	module.exports = {
	    list: function (parentId) {
	        return Webapi.Get({ parentId: parentId });
	    },
	    save: function (org) {      
	        return Webapi.Post(org);
	    }
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var treeID = 0;
	avalon.component('ms-tree', {
	    template: __webpack_require__(19),
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


/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = "<ul>\r\n    <li ms-for=\"(index, el) in @tree | get(0)\" ms-click=\"@openSubTree(el,$event)\" \r\n        ms-class=\"@hasSubTree(el)?'parent_li':''\" style=\"cursor:pointer\">\r\n\r\n        <span>\r\n            <i ms-class=\"@getChangeIcon(el)\"></i>\r\n            {{@getText(el)}}\r\n        </span>\r\n        <div ms-html=\"@renderSubTree(el)\" ms-visible=\"!!el.open\"></div>\r\n    </li>\r\n</ul> ";

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	
	avalon.component('ms-panel', {
	    template: __webpack_require__(21),
	    defaults: {
	     
	       
	    },
	   
	});
	


/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = "<div class=\"jarviswidget\">\r\n    <header>\r\n       <slot name='title'></slot>\r\n\r\n    </header>\r\n    <div>\r\n        <div class=\"jarviswidget-editbox\">\r\n           <slot name='box'/>\r\n        </div>\r\n        <div class=\"widget-body\">\r\n            <slot name=\"content\"></slot>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var OrgService = __webpack_require__(17);
	var avalon = __webpack_require__(6);
	var $ = __webpack_require__(2);
	
	
	module.exports = {
	    create: function (id, fnOnclick) {
	       var result= avalon.define({
	            $id: id,
	            orgConfig: {
	                subPropName: "subOrgs",
	                getText: function (el) {
	                    return el.name;
	                },
	                onSelect: function (el) {
	                    fnOnclick && fnOnclick(el);
	                }
	            },
	            orgs: [{ name: '', subOrgs: [], open: false, id: 0 }] //avalon无法自动parse，因此要处理好对象接哦古
	        })
	
	
	        OrgService.list(null).done(function (data) {
	            result.orgs = data;
	        })
	        return result;
	    },
	    destory: function (id) {
	        delete avalon.vmodels[id];
	    }
	}

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var avalon = __webpack_require__(6);
	var $ = __webpack_require__(2);
	var OrgService = __webpack_require__(17);
	
	module.exports = {
	    destory:function(strEditorId){
	        delete avalon.vmodels[strEditorId];
	    },
	    create: function (strEditorId,fnSavedCallback) {
	        var editor = avalon.define({
	            $id: strEditorId,
	            org: {
	                id: 0,
	                name: "",
	                remark: "",
	                parentId: ""
	            }
	        });
	
	        __webpack_require__.e/* nsure */(1/* duplicate */, function () {
	                var vaform = __webpack_require__(7);
	                var $form = $("#" + strEditorId);
	
	                vaform.forWebApi($form,
	                    function () {
	                        var org = avalon.vmodels[strEditorId].org.$model;
	                        var postData = {
	                            id: org.id,
	                            name: org.name,
	                            remark: org.remark,
	                            parent: org.parentId
	                        };
	                        OrgService.save(postData).done(function (returnData) {
	                            alert("保存成功");
	                            fnSavedCallback && fnSavedCallback(returnData);
	                        });
	
	                    });
	            });
	        return editor;
	    }
	}

/***/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi93d3dyb290L19zcmMvanMvbW9kdWxlcy93ZWJhcGkuanM/MGY1NCIsIndlYnBhY2s6Ly8vLi93d3dyb290L19zcmMvanMvdmlld3MvYXJlYXMvbWVtYmVyc2hpcC9PcmcvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vd3d3cm9vdC9fc3JjL2pzL21vZHVsZXMvbWVtYmVyc2hpcC9vcmdzZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3d3d3Jvb3QvX3NyYy9qcy9tb2R1bGVzL2F2YWxvbi9tcy10cmVlL21zLXRyZWUuanMiLCJ3ZWJwYWNrOi8vLy4vd3d3cm9vdC9fc3JjL2pzL21vZHVsZXMvYXZhbG9uL21zLXRyZWUvcm9vdF90cmVlLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vd3d3cm9vdC9fc3JjL2pzL21vZHVsZXMvYXZhbG9uL21zLXBhbmVsL21zLXBhbmVsLmpzIiwid2VicGFjazovLy8uL3d3d3Jvb3QvX3NyYy9qcy9tb2R1bGVzL2F2YWxvbi9tcy1wYW5lbC9wYW5lbC5odG1sIiwid2VicGFjazovLy8uL3d3d3Jvb3QvX3NyYy9qcy92aWV3cy9hcmVhcy9tZW1iZXJzaGlwL09yZy9fb3JnVHJlZS5qcyIsIndlYnBhY2s6Ly8vLi93d3dyb290L19zcmMvanMvdmlld3MvYXJlYXMvbWVtYmVyc2hpcC9PcmcvX2VkaXRvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBdUM7QUFDdkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQSw0QkFBMkIsY0FBYyxlQUFlOztBQUV4RDs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7OztBQ3BDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBMkIscUJBQXFCO0FBQ2hELE1BQUs7QUFDTCwyQjtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrREFBaUQ7QUFDakQ7QUFDQTtBQUNBO0FBQ0EsbUNBQWtDO0FBQ2xDO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7Ozs7OztBQ3ZERCxpU0FBZ1MsY0FBYywySDs7Ozs7OztBQ0M5UztBQUNBO0FBQ0E7OztBQUdBLE1BQUs7O0FBRUwsRUFBQzs7Ozs7Ozs7QUNSRCwwVzs7Ozs7O0FDQUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYixxQkFBb0IsNENBQTRDO0FBQ2hFLFVBQVM7OztBQUdUO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7O0FDOUJBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVCw0REFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQXlCOztBQUV6QixzQkFBcUI7QUFDckIsY0FBYTtBQUNiO0FBQ0E7QUFDQSxFIiwiZmlsZSI6IjUuNS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciAkID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XHJcblxyXG5mdW5jdGlvbiBXZXBBcGkodXJsKSB7XHJcbiAgICB0aGlzLm9wdHMgPSB7XHJcbiAgICAgICAgdXJsOiB1cmwsXHJcbiAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuUHV0ID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiZGF0YVwiPjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiZnVuY1wiPjwvcGFyYW0+XHJcblxyXG4gICAgICAgIHZhciBvcHRzID0gdGhpcy5leHQuY2FsbCh0aGlzLCBcIlBVVFwiLCBkYXRhKTtcclxuXHJcbiAgICAgICAgcmV0dXJuICQuYWpheChvcHRzKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5EZWxldGUgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJkYXRhXCI+PC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJmdW5jXCI+PC9wYXJhbT5cclxuICAgICAgICB2YXIgb3B0cyA9IHRoaXMuZXh0LmNhbGwodGhpcywgXCJERUxFVEVcIiwgZGF0YSk7XHJcbiAgICAgICAgaWYgKGRhdGEuaWQpIHtcclxuICAgICAgICAgICAgb3B0cy51cmwgKz0gXCIvXCIgKyBkYXRhLmlkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gJC5hamF4KG9wdHMpO1xyXG4gICAgfTtcclxuICAgIHRoaXMuUG9zdCA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImRhdGFcIj48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImZ1bmNcIj48L3BhcmFtPlxyXG4gICAgICAgIHZhciBvcHRzID0gdGhpcy5leHQuY2FsbCh0aGlzLCBcIlBPU1RcIiwgZGF0YSk7XHJcbiAgICAgICAgcmV0dXJuICQuYWpheChvcHRzKTtcclxuICAgIH07XHJcbiAgICB0aGlzLkdldCA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImRhdGFcIj48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImZ1bmNcIj48L3BhcmFtPlxyXG4gICAgICAgIHZhciBvcHRzID0gdGhpcy5leHQuY2FsbCh0aGlzLCBcIkdFVFwiLCBkYXRhKTtcclxuICAgICAgICByZXR1cm4gJC5hamF4KG9wdHMpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgdGhpcy5leHQgPSBmdW5jdGlvbiAobWV0aG9kLCBkYXRhKSB7XHJcblxyXG4gICAgICAgIHZhciBhID0gJC5leHRlbmQoe30sIHRoaXMub3B0cywgeyB0eXBlOiBtZXRob2QgfSk7XHJcblxyXG4gICAgICAgIGEuZGF0YSA9IG1ldGhvZCAhPT0gXCJHRVRcIiA/IEpTT04uc3RyaW5naWZ5KGRhdGEpIDogZGF0YTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGE7XHJcbiAgICB9O1xyXG59O1xyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgY3JlYXRlOiBmdW5jdGlvbiAodXJsKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBXZXBBcGkodXJsKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3d3d3Jvb3QvX3NyYy9qcy9tb2R1bGVzL3dlYmFwaS5qc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSA0IDUiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vLi4vbW9kdWxlcy9tZW1iZXJzaGlwL29yZ3NlcnZpY2UuanNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vLi4vbW9kdWxlcy9hdmFsb24vbXMtdHJlZS9tcy10cmVlLmpzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uLy4uL21vZHVsZXMvbWVtYmVyc2hpcC9vcmdzZXJ2aWNlLmpzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uLy4uL21vZHVsZXMvdmFmb3JtLmpzXCIgLz5cclxudmFyIE9yZ1NlcnZpY2UgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vbW9kdWxlcy9tZW1iZXJzaGlwL29yZ3NlcnZpY2UuanNcIik7XHJcbnJlcXVpcmUoXCIuLi8uLi8uLi8uLi9tb2R1bGVzL2F2YWxvbi9tcy10cmVlL21zLXRyZWUuanNcIik7XHJcbnJlcXVpcmUoXCIuLi8uLi8uLi8uLi9tb2R1bGVzL2F2YWxvbi9tcy1wYW5lbC9tcy1wYW5lbC5qc1wiKVxyXG5cclxudmFyIGF2YWxvbiA9IHJlcXVpcmUoJ2F2YWxvbicpO1xyXG52YXIgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xyXG5cclxudmFyIE9yZ1RyZWUgPSByZXF1aXJlKFwiLi9fb3JnVHJlZVwiKTtcclxudmFyIEVkaXRvciA9IHJlcXVpcmUoXCIuL19lZGl0b3JcIilcclxuXHJcblxyXG5mdW5jdGlvbiBPbmxvYWQoY29udGVudExvYWRpbmdBcmVhKSB7XHJcbiAgICB2YXIgZWRpdG9yT3JnPW51bGw7XHJcbiAgICB2YXIgZWRpdG9yID0gRWRpdG9yLmNyZWF0ZShcIm9yZ0VkaXRvclwiLGZ1bmN0aW9uKHJldHVyblZhbCl7XHJcbiAgICAgICAgYXZhbG9uLm1peChlZGl0b3JPcmcscmV0dXJuVmFsKTtcclxuICAgIH0pXHJcbiAgICB2YXIgdHJlZSA9IE9yZ1RyZWUuY3JlYXRlKCdvcmdUcmVlJywgZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgICAgZWRpdG9yT3JnPWVsO1xyXG4gICAgICAgIGVkaXRvci5vcmcgPSBlbDtcclxuICAgIH0pXHJcblxyXG4gICAgYXZhbG9uLnNjYW4oY29udGVudExvYWRpbmdBcmVhKVxyXG59XHJcblxyXG5mdW5jdGlvbiBVbmxvYWQoKSB7XHJcbiAgICBPcmdUcmVlLmRlc3RvcnkoJ29yZ1RyZWUnKTtcclxuICAgIEVkaXRvci5kZXN0b3J5KCdvcmdFZGl0b3InKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBsb2FkOiBPbmxvYWQsXHJcbiAgICB1bmxvYWQ6IFVubG9hZFxyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi93d3dyb290L19zcmMvanMvdmlld3MvYXJlYXMvbWVtYmVyc2hpcC9PcmcvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gNSIsInZhciBXZWJhcGkgPSByZXF1aXJlKFwiLi4vd2ViYXBpLmpzXCIpLmNyZWF0ZShcIi9hcGkvb3Jnc1wiKTtcclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBsaXN0OiBmdW5jdGlvbiAocGFyZW50SWQpIHtcclxuICAgICAgICByZXR1cm4gV2ViYXBpLkdldCh7IHBhcmVudElkOiBwYXJlbnRJZCB9KTtcclxuICAgIH0sXHJcbiAgICBzYXZlOiBmdW5jdGlvbiAob3JnKSB7ICAgICAgXHJcbiAgICAgICAgcmV0dXJuIFdlYmFwaS5Qb3N0KG9yZyk7XHJcbiAgICB9XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3d3d3Jvb3QvX3NyYy9qcy9tb2R1bGVzL21lbWJlcnNoaXAvb3Jnc2VydmljZS5qc1xuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSA1IiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgdHJlZUlEID0gMDtcclxuYXZhbG9uLmNvbXBvbmVudCgnbXMtdHJlZScsIHtcclxuICAgIHRlbXBsYXRlOiByZXF1aXJlKCdodG1sIS4vcm9vdF90cmVlLmh0bWwnKSxcclxuICAgIGRlZmF1bHRzOiB7XHJcbiAgICAgICAgaWNvbnM6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBhZGRlZDogW1wiZmFcIiwgXCJmYS1sYXJnZVwiXSxcclxuICAgICAgICAgICAgY2xvc2U6IFwiZmEtcGx1cy1jaXJjbGVcIixcclxuICAgICAgICAgICAgb3BlbjogJ2ZhLW1pbnVzLWNpcmNsZScsXHJcbiAgICAgICAgICAgIHdpdGhvdXRDaGlsZDogJ2ljb24tbGVhZicsXHJcbiAgICAgICAgICAgIHdpdGhDaGlsZDogXCJwYXJlbnRfbGlcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0Q2hhbmdlSWNvbjogZnVuY3Rpb24gKGVsKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgcyA9IHRoaXMuaWNvbnMuYWRkZWQuc2xpY2UoMCk7XHJcbiAgICAgICAgICAgIHZhciBhZGRDbGFzcyA9IFwiXCI7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5oYXNTdWJUcmVlKGVsKSl7XHJcbiAgICAgICAgICAgICAgICBhZGRDbGFzcyA9IHRoaXMuaWNvbnMud2l0aG91dENoaWxkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWRkQ2xhc3MgPSBlbC5vcGVuID8gdGhpcy5pY29ucy5vcGVuIDogdGhpcy5pY29ucy5jbG9zZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzLnB1c2goYWRkQ2xhc3MpO1xyXG4gICAgICAgICAgICByZXR1cm4gcztcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uU2VsZWN0OmZ1bmN0aW9uKGVsKXtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKFwi6K+36K6+572udHJlZeaOp+S7tueahG9uU2VsZWN05pa55rOVXCIpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBoYXNTdWJUcmVlOiBmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgICAgICAgdmFyIHN1YlRyZWUgPSBlbFt0aGlzLnN1YlByb3BOYW1lXTtcclxuICAgICAgICAgICAgcmV0dXJuIHN1YlRyZWUubGVuZ3RoICE9IDA7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0cmVlOiBbXSxcclxuICAgICAgICBzdWJQcm9wTmFtZTogXCJzdWJ0cmVlXCIsXHJcbiAgICAgICAgcmVuZGVyU3ViVHJlZTogZnVuY3Rpb24gKGVsKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgc3ViVHJlZSA9IGVsW3RoaXMuc3ViUHJvcE5hbWVdO1xyXG4gICAgICAgICAgICByZXR1cm4gc3ViVHJlZS5sZW5ndGhcclxuICAgICAgICAgICAgICAgID8gJzx3YnIgaXM9XCJtcy10cmVlXCIgbXMtd2lkZ2V0PVwieyRpZDpcInRyZWVfJyArXHJcbiAgICAgICAgICAgICAgICAoKyt0cmVlSUQpICtcclxuICAgICAgICAgICAgICAgICdcIiwgdHJlZTogZWwuJyArXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN1YlByb3BOYW1lICtcclxuICAgICAgICAgICAgICAgICcsY2x6OlwicGFyZW50X2xpXCJ9XCIgLz4nXHJcbiAgICAgICAgICAgICAgICA6ICcnO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb3BlblN1YlRyZWU6IGZ1bmN0aW9uIChlbCwgZSkge1xyXG4gICAgICAgICAgICB0aGlzLm9uU2VsZWN0KGVsKTtcclxuICAgICAgICAgICAgZWwub3BlbiA9ICFlbC5vcGVuO1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0VGV4dDogZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlbC5OYW1lXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KVxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3d3d3Jvb3QvX3NyYy9qcy9tb2R1bGVzL2F2YWxvbi9tcy10cmVlL21zLXRyZWUuanNcbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gNSIsIm1vZHVsZS5leHBvcnRzID0gXCI8dWw+XFxyXFxuICAgIDxsaSBtcy1mb3I9XFxcIihpbmRleCwgZWwpIGluIEB0cmVlIHwgZ2V0KDApXFxcIiBtcy1jbGljaz1cXFwiQG9wZW5TdWJUcmVlKGVsLCRldmVudClcXFwiIFxcclxcbiAgICAgICAgbXMtY2xhc3M9XFxcIkBoYXNTdWJUcmVlKGVsKT8ncGFyZW50X2xpJzonJ1xcXCIgc3R5bGU9XFxcImN1cnNvcjpwb2ludGVyXFxcIj5cXHJcXG5cXHJcXG4gICAgICAgIDxzcGFuPlxcclxcbiAgICAgICAgICAgIDxpIG1zLWNsYXNzPVxcXCJAZ2V0Q2hhbmdlSWNvbihlbClcXFwiPjwvaT5cXHJcXG4gICAgICAgICAgICB7e0BnZXRUZXh0KGVsKX19XFxyXFxuICAgICAgICA8L3NwYW4+XFxyXFxuICAgICAgICA8ZGl2IG1zLWh0bWw9XFxcIkByZW5kZXJTdWJUcmVlKGVsKVxcXCIgbXMtdmlzaWJsZT1cXFwiISFlbC5vcGVuXFxcIj48L2Rpdj5cXHJcXG4gICAgPC9saT5cXHJcXG48L3VsPiBcIjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLm5wbWluc3RhbGwvaHRtbC1sb2FkZXIvMC40LjQvaHRtbC1sb2FkZXIhLi93d3dyb290L19zcmMvanMvbW9kdWxlcy9hdmFsb24vbXMtdHJlZS9yb290X3RyZWUuaHRtbFxuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSA1IiwiXHJcbmF2YWxvbi5jb21wb25lbnQoJ21zLXBhbmVsJywge1xyXG4gICAgdGVtcGxhdGU6IHJlcXVpcmUoJ2h0bWwhLi9wYW5lbC5odG1sJyksXHJcbiAgICBkZWZhdWx0czoge1xyXG4gICAgIFxyXG4gICAgICAgXHJcbiAgICB9LFxyXG4gICBcclxufSk7XHJcblxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3d3d3Jvb3QvX3NyYy9qcy9tb2R1bGVzL2F2YWxvbi9tcy1wYW5lbC9tcy1wYW5lbC5qc1xuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSA1IiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgY2xhc3M9XFxcImphcnZpc3dpZGdldFxcXCI+XFxyXFxuICAgIDxoZWFkZXI+XFxyXFxuICAgICAgIDxzbG90IG5hbWU9J3RpdGxlJz48L3Nsb3Q+XFxyXFxuXFxyXFxuICAgIDwvaGVhZGVyPlxcclxcbiAgICA8ZGl2PlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiamFydmlzd2lkZ2V0LWVkaXRib3hcXFwiPlxcclxcbiAgICAgICAgICAgPHNsb3QgbmFtZT0nYm94Jy8+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIndpZGdldC1ib2R5XFxcIj5cXHJcXG4gICAgICAgICAgICA8c2xvdCBuYW1lPVxcXCJjb250ZW50XFxcIj48L3Nsb3Q+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuPC9kaXY+XCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly5ucG1pbnN0YWxsL2h0bWwtbG9hZGVyLzAuNC40L2h0bWwtbG9hZGVyIS4vd3d3cm9vdC9fc3JjL2pzL21vZHVsZXMvYXZhbG9uL21zLXBhbmVsL3BhbmVsLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gNSIsInZhciBPcmdTZXJ2aWNlID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uL21vZHVsZXMvbWVtYmVyc2hpcC9vcmdzZXJ2aWNlLmpzXCIpO1xyXG52YXIgYXZhbG9uID0gcmVxdWlyZSgnYXZhbG9uJyk7XHJcbnZhciAkID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBjcmVhdGU6IGZ1bmN0aW9uIChpZCwgZm5PbmNsaWNrKSB7XHJcbiAgICAgICB2YXIgcmVzdWx0PSBhdmFsb24uZGVmaW5lKHtcclxuICAgICAgICAgICAgJGlkOiBpZCxcclxuICAgICAgICAgICAgb3JnQ29uZmlnOiB7XHJcbiAgICAgICAgICAgICAgICBzdWJQcm9wTmFtZTogXCJzdWJPcmdzXCIsXHJcbiAgICAgICAgICAgICAgICBnZXRUZXh0OiBmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWwubmFtZTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvblNlbGVjdDogZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm5PbmNsaWNrICYmIGZuT25jbGljayhlbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9yZ3M6IFt7IG5hbWU6ICcnLCBzdWJPcmdzOiBbXSwgb3BlbjogZmFsc2UsIGlkOiAwIH1dIC8vYXZhbG9u5peg5rOV6Ieq5YqocGFyc2XvvIzlm6DmraTopoHlpITnkIblpb3lr7nosaHmjqXlk6blj6RcclxuICAgICAgICB9KVxyXG5cclxuXHJcbiAgICAgICAgT3JnU2VydmljZS5saXN0KG51bGwpLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgcmVzdWx0Lm9yZ3MgPSBkYXRhO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH0sXHJcbiAgICBkZXN0b3J5OiBmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgICBkZWxldGUgYXZhbG9uLnZtb2RlbHNbaWRdO1xyXG4gICAgfVxyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi93d3dyb290L19zcmMvanMvdmlld3MvYXJlYXMvbWVtYmVyc2hpcC9PcmcvX29yZ1RyZWUuanNcbi8vIG1vZHVsZSBpZCA9IDIyXG4vLyBtb2R1bGUgY2h1bmtzID0gNSIsInZhciBhdmFsb24gPSByZXF1aXJlKCdhdmFsb24nKTtcclxudmFyICQgPSByZXF1aXJlKCdqcXVlcnknKTtcclxudmFyIE9yZ1NlcnZpY2UgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vbW9kdWxlcy9tZW1iZXJzaGlwL29yZ3NlcnZpY2UuanNcIik7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGRlc3Rvcnk6ZnVuY3Rpb24oc3RyRWRpdG9ySWQpe1xyXG4gICAgICAgIGRlbGV0ZSBhdmFsb24udm1vZGVsc1tzdHJFZGl0b3JJZF07XHJcbiAgICB9LFxyXG4gICAgY3JlYXRlOiBmdW5jdGlvbiAoc3RyRWRpdG9ySWQsZm5TYXZlZENhbGxiYWNrKSB7XHJcbiAgICAgICAgdmFyIGVkaXRvciA9IGF2YWxvbi5kZWZpbmUoe1xyXG4gICAgICAgICAgICAkaWQ6IHN0ckVkaXRvcklkLFxyXG4gICAgICAgICAgICBvcmc6IHtcclxuICAgICAgICAgICAgICAgIGlkOiAwLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJcIixcclxuICAgICAgICAgICAgICAgIHJlbWFyazogXCJcIixcclxuICAgICAgICAgICAgICAgIHBhcmVudElkOiBcIlwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmVxdWlyZS5lbnN1cmUoW1wiLi4vLi4vLi4vLi4vbW9kdWxlcy92YWZvcm0uanNcIl0sXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHZhciB2YWZvcm0gPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vbW9kdWxlcy92YWZvcm0uanNcIik7XHJcbiAgICAgICAgICAgICAgICB2YXIgJGZvcm0gPSAkKFwiI1wiICsgc3RyRWRpdG9ySWQpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhZm9ybS5mb3JXZWJBcGkoJGZvcm0sXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3JnID0gYXZhbG9uLnZtb2RlbHNbc3RyRWRpdG9ySWRdLm9yZy4kbW9kZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwb3N0RGF0YSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBvcmcuaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBvcmcubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbWFyazogb3JnLnJlbWFyayxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudDogb3JnLnBhcmVudElkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE9yZ1NlcnZpY2Uuc2F2ZShwb3N0RGF0YSkuZG9uZShmdW5jdGlvbiAocmV0dXJuRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCLkv53lrZjmiJDlip9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmblNhdmVkQ2FsbGJhY2sgJiYgZm5TYXZlZENhbGxiYWNrKHJldHVybkRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBlZGl0b3I7XHJcbiAgICB9XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3d3d3Jvb3QvX3NyYy9qcy92aWV3cy9hcmVhcy9tZW1iZXJzaGlwL09yZy9fZWRpdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSAyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDUiXSwic291cmNlUm9vdCI6IiJ9