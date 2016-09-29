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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi93d3dyb290L19zcmMvanMvbW9kdWxlcy93ZWJhcGkuanM/YTAwNiIsIndlYnBhY2s6Ly8vLi93d3dyb290L19zcmMvanMvdmlld3MvYXJlYXMvbWVtYmVyc2hpcC9PcmcvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vd3d3cm9vdC9fc3JjL2pzL21vZHVsZXMvbWVtYmVyc2hpcC9vcmdzZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3d3d3Jvb3QvX3NyYy9qcy9tb2R1bGVzL2F2YWxvbi9tcy10cmVlL21zLXRyZWUuanMiLCJ3ZWJwYWNrOi8vLy4vd3d3cm9vdC9fc3JjL2pzL21vZHVsZXMvYXZhbG9uL21zLXRyZWUvcm9vdF90cmVlLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vd3d3cm9vdC9fc3JjL2pzL21vZHVsZXMvYXZhbG9uL21zLXBhbmVsL21zLXBhbmVsLmpzIiwid2VicGFjazovLy8uL3d3d3Jvb3QvX3NyYy9qcy9tb2R1bGVzL2F2YWxvbi9tcy1wYW5lbC9wYW5lbC5odG1sIiwid2VicGFjazovLy8uL3d3d3Jvb3QvX3NyYy9qcy92aWV3cy9hcmVhcy9tZW1iZXJzaGlwL09yZy9fb3JnVHJlZS5qcyIsIndlYnBhY2s6Ly8vLi93d3dyb290L19zcmMvanMvdmlld3MvYXJlYXMvbWVtYmVyc2hpcC9PcmcvX2VkaXRvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBdUM7QUFDdkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQSw0QkFBMkIsY0FBYyxlQUFlOztBQUV4RDs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7OztBQ3BDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBMkIscUJBQXFCO0FBQ2hELE1BQUs7QUFDTCwyQjtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrREFBaUQ7QUFDakQ7QUFDQTtBQUNBO0FBQ0EsbUNBQWtDO0FBQ2xDO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7Ozs7OztBQ3ZERCxpU0FBZ1MsY0FBYywySDs7Ozs7OztBQ0M5UztBQUNBO0FBQ0E7OztBQUdBLE1BQUs7O0FBRUwsRUFBQzs7Ozs7Ozs7QUNSRCwwVzs7Ozs7O0FDQUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYixxQkFBb0IsNENBQTRDO0FBQ2hFLFVBQVM7OztBQUdUO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7O0FDOUJBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVCw0REFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQXlCOztBQUV6QixzQkFBcUI7QUFDckIsY0FBYTtBQUNiO0FBQ0E7QUFDQSxFIiwiZmlsZSI6IjUuNS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciAkID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XHJcblxyXG5mdW5jdGlvbiBXZXBBcGkodXJsKSB7XHJcbiAgICB0aGlzLm9wdHMgPSB7XHJcbiAgICAgICAgdXJsOiB1cmwsXHJcbiAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuUHV0ID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiZGF0YVwiPjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiZnVuY1wiPjwvcGFyYW0+XHJcblxyXG4gICAgICAgIHZhciBvcHRzID0gdGhpcy5leHQuY2FsbCh0aGlzLCBcIlBVVFwiLCBkYXRhKTtcclxuXHJcbiAgICAgICAgcmV0dXJuICQuYWpheChvcHRzKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5EZWxldGUgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJkYXRhXCI+PC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJmdW5jXCI+PC9wYXJhbT5cclxuICAgICAgICB2YXIgb3B0cyA9IHRoaXMuZXh0LmNhbGwodGhpcywgXCJERUxFVEVcIiwgZGF0YSk7XHJcbiAgICAgICAgaWYgKGRhdGEuaWQpIHtcclxuICAgICAgICAgICAgb3B0cy51cmwgKz0gXCIvXCIgKyBkYXRhLmlkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gJC5hamF4KG9wdHMpO1xyXG4gICAgfTtcclxuICAgIHRoaXMuUG9zdCA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImRhdGFcIj48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImZ1bmNcIj48L3BhcmFtPlxyXG4gICAgICAgIHZhciBvcHRzID0gdGhpcy5leHQuY2FsbCh0aGlzLCBcIlBPU1RcIiwgZGF0YSk7XHJcbiAgICAgICAgcmV0dXJuICQuYWpheChvcHRzKTtcclxuICAgIH07XHJcbiAgICB0aGlzLkdldCA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImRhdGFcIj48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImZ1bmNcIj48L3BhcmFtPlxyXG4gICAgICAgIHZhciBvcHRzID0gdGhpcy5leHQuY2FsbCh0aGlzLCBcIkdFVFwiLCBkYXRhKTtcclxuICAgICAgICByZXR1cm4gJC5hamF4KG9wdHMpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgdGhpcy5leHQgPSBmdW5jdGlvbiAobWV0aG9kLCBkYXRhKSB7XHJcblxyXG4gICAgICAgIHZhciBhID0gJC5leHRlbmQoe30sIHRoaXMub3B0cywgeyB0eXBlOiBtZXRob2QgfSk7XHJcblxyXG4gICAgICAgIGEuZGF0YSA9IG1ldGhvZCAhPT0gXCJHRVRcIiA/IEpTT04uc3RyaW5naWZ5KGRhdGEpIDogZGF0YTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGE7XHJcbiAgICB9O1xyXG59O1xyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgY3JlYXRlOiBmdW5jdGlvbiAodXJsKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBXZXBBcGkodXJsKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vd3d3cm9vdC9fc3JjL2pzL21vZHVsZXMvd2ViYXBpLmpzXG4gKiogbW9kdWxlIGlkID0gMTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gNCA1XG4gKiovIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uLy4uL21vZHVsZXMvbWVtYmVyc2hpcC9vcmdzZXJ2aWNlLmpzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uLy4uL21vZHVsZXMvYXZhbG9uL21zLXRyZWUvbXMtdHJlZS5qc1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi8uLi9tb2R1bGVzL21lbWJlcnNoaXAvb3Jnc2VydmljZS5qc1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi8uLi9tb2R1bGVzL3ZhZm9ybS5qc1wiIC8+XHJcbnZhciBPcmdTZXJ2aWNlID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uL21vZHVsZXMvbWVtYmVyc2hpcC9vcmdzZXJ2aWNlLmpzXCIpO1xyXG5yZXF1aXJlKFwiLi4vLi4vLi4vLi4vbW9kdWxlcy9hdmFsb24vbXMtdHJlZS9tcy10cmVlLmpzXCIpO1xyXG5yZXF1aXJlKFwiLi4vLi4vLi4vLi4vbW9kdWxlcy9hdmFsb24vbXMtcGFuZWwvbXMtcGFuZWwuanNcIilcclxuXHJcbnZhciBhdmFsb24gPSByZXF1aXJlKCdhdmFsb24nKTtcclxudmFyICQgPSByZXF1aXJlKCdqcXVlcnknKTtcclxuXHJcbnZhciBPcmdUcmVlID0gcmVxdWlyZShcIi4vX29yZ1RyZWVcIik7XHJcbnZhciBFZGl0b3IgPSByZXF1aXJlKFwiLi9fZWRpdG9yXCIpXHJcblxyXG5cclxuZnVuY3Rpb24gT25sb2FkKGNvbnRlbnRMb2FkaW5nQXJlYSkge1xyXG4gICAgdmFyIGVkaXRvck9yZz1udWxsO1xyXG4gICAgdmFyIGVkaXRvciA9IEVkaXRvci5jcmVhdGUoXCJvcmdFZGl0b3JcIixmdW5jdGlvbihyZXR1cm5WYWwpe1xyXG4gICAgICAgIGF2YWxvbi5taXgoZWRpdG9yT3JnLHJldHVyblZhbCk7XHJcbiAgICB9KVxyXG4gICAgdmFyIHRyZWUgPSBPcmdUcmVlLmNyZWF0ZSgnb3JnVHJlZScsIGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgIGVkaXRvck9yZz1lbDtcclxuICAgICAgICBlZGl0b3Iub3JnID0gZWw7XHJcbiAgICB9KVxyXG5cclxuICAgIGF2YWxvbi5zY2FuKGNvbnRlbnRMb2FkaW5nQXJlYSlcclxufVxyXG5cclxuZnVuY3Rpb24gVW5sb2FkKCkge1xyXG4gICAgT3JnVHJlZS5kZXN0b3J5KCdvcmdUcmVlJyk7XHJcbiAgICBFZGl0b3IuZGVzdG9yeSgnb3JnRWRpdG9yJyk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgbG9hZDogT25sb2FkLFxyXG4gICAgdW5sb2FkOiBVbmxvYWRcclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi93d3dyb290L19zcmMvanMvdmlld3MvYXJlYXMvbWVtYmVyc2hpcC9PcmcvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAxNlxuICoqIG1vZHVsZSBjaHVua3MgPSA1XG4gKiovIiwidmFyIFdlYmFwaSA9IHJlcXVpcmUoXCIuLi93ZWJhcGkuanNcIikuY3JlYXRlKFwiL2FwaS9vcmdzXCIpO1xyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGxpc3Q6IGZ1bmN0aW9uIChwYXJlbnRJZCkge1xyXG4gICAgICAgIHJldHVybiBXZWJhcGkuR2V0KHsgcGFyZW50SWQ6IHBhcmVudElkIH0pO1xyXG4gICAgfSxcclxuICAgIHNhdmU6IGZ1bmN0aW9uIChvcmcpIHsgICAgICBcclxuICAgICAgICByZXR1cm4gV2ViYXBpLlBvc3Qob3JnKTtcclxuICAgIH1cclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi93d3dyb290L19zcmMvanMvbW9kdWxlcy9tZW1iZXJzaGlwL29yZ3NlcnZpY2UuanNcbiAqKiBtb2R1bGUgaWQgPSAxN1xuICoqIG1vZHVsZSBjaHVua3MgPSA1XG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgdHJlZUlEID0gMDtcclxuYXZhbG9uLmNvbXBvbmVudCgnbXMtdHJlZScsIHtcclxuICAgIHRlbXBsYXRlOiByZXF1aXJlKCdodG1sIS4vcm9vdF90cmVlLmh0bWwnKSxcclxuICAgIGRlZmF1bHRzOiB7XHJcbiAgICAgICAgaWNvbnM6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBhZGRlZDogW1wiZmFcIiwgXCJmYS1sYXJnZVwiXSxcclxuICAgICAgICAgICAgY2xvc2U6IFwiZmEtcGx1cy1jaXJjbGVcIixcclxuICAgICAgICAgICAgb3BlbjogJ2ZhLW1pbnVzLWNpcmNsZScsXHJcbiAgICAgICAgICAgIHdpdGhvdXRDaGlsZDogJ2ljb24tbGVhZicsXHJcbiAgICAgICAgICAgIHdpdGhDaGlsZDogXCJwYXJlbnRfbGlcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0Q2hhbmdlSWNvbjogZnVuY3Rpb24gKGVsKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgcyA9IHRoaXMuaWNvbnMuYWRkZWQuc2xpY2UoMCk7XHJcbiAgICAgICAgICAgIHZhciBhZGRDbGFzcyA9IFwiXCI7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5oYXNTdWJUcmVlKGVsKSl7XHJcbiAgICAgICAgICAgICAgICBhZGRDbGFzcyA9IHRoaXMuaWNvbnMud2l0aG91dENoaWxkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWRkQ2xhc3MgPSBlbC5vcGVuID8gdGhpcy5pY29ucy5vcGVuIDogdGhpcy5pY29ucy5jbG9zZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzLnB1c2goYWRkQ2xhc3MpO1xyXG4gICAgICAgICAgICByZXR1cm4gcztcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uU2VsZWN0OmZ1bmN0aW9uKGVsKXtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKFwi6K+36K6+572udHJlZeaOp+S7tueahG9uU2VsZWN05pa55rOVXCIpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBoYXNTdWJUcmVlOiBmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgICAgICAgdmFyIHN1YlRyZWUgPSBlbFt0aGlzLnN1YlByb3BOYW1lXTtcclxuICAgICAgICAgICAgcmV0dXJuIHN1YlRyZWUubGVuZ3RoICE9IDA7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0cmVlOiBbXSxcclxuICAgICAgICBzdWJQcm9wTmFtZTogXCJzdWJ0cmVlXCIsXHJcbiAgICAgICAgcmVuZGVyU3ViVHJlZTogZnVuY3Rpb24gKGVsKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgc3ViVHJlZSA9IGVsW3RoaXMuc3ViUHJvcE5hbWVdO1xyXG4gICAgICAgICAgICByZXR1cm4gc3ViVHJlZS5sZW5ndGhcclxuICAgICAgICAgICAgICAgID8gJzx3YnIgaXM9XCJtcy10cmVlXCIgbXMtd2lkZ2V0PVwieyRpZDpcInRyZWVfJyArXHJcbiAgICAgICAgICAgICAgICAoKyt0cmVlSUQpICtcclxuICAgICAgICAgICAgICAgICdcIiwgdHJlZTogZWwuJyArXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN1YlByb3BOYW1lICtcclxuICAgICAgICAgICAgICAgICcsY2x6OlwicGFyZW50X2xpXCJ9XCIgLz4nXHJcbiAgICAgICAgICAgICAgICA6ICcnO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb3BlblN1YlRyZWU6IGZ1bmN0aW9uIChlbCwgZSkge1xyXG4gICAgICAgICAgICB0aGlzLm9uU2VsZWN0KGVsKTtcclxuICAgICAgICAgICAgZWwub3BlbiA9ICFlbC5vcGVuO1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0VGV4dDogZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlbC5OYW1lXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KVxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vd3d3cm9vdC9fc3JjL2pzL21vZHVsZXMvYXZhbG9uL21zLXRyZWUvbXMtdHJlZS5qc1xuICoqIG1vZHVsZSBpZCA9IDE4XG4gKiogbW9kdWxlIGNodW5rcyA9IDVcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPHVsPlxcclxcbiAgICA8bGkgbXMtZm9yPVxcXCIoaW5kZXgsIGVsKSBpbiBAdHJlZSB8IGdldCgwKVxcXCIgbXMtY2xpY2s9XFxcIkBvcGVuU3ViVHJlZShlbCwkZXZlbnQpXFxcIiBcXHJcXG4gICAgICAgIG1zLWNsYXNzPVxcXCJAaGFzU3ViVHJlZShlbCk/J3BhcmVudF9saSc6JydcXFwiIHN0eWxlPVxcXCJjdXJzb3I6cG9pbnRlclxcXCI+XFxyXFxuXFxyXFxuICAgICAgICA8c3Bhbj5cXHJcXG4gICAgICAgICAgICA8aSBtcy1jbGFzcz1cXFwiQGdldENoYW5nZUljb24oZWwpXFxcIj48L2k+XFxyXFxuICAgICAgICAgICAge3tAZ2V0VGV4dChlbCl9fVxcclxcbiAgICAgICAgPC9zcGFuPlxcclxcbiAgICAgICAgPGRpdiBtcy1odG1sPVxcXCJAcmVuZGVyU3ViVHJlZShlbClcXFwiIG1zLXZpc2libGU9XFxcIiEhZWwub3BlblxcXCI+PC9kaXY+XFxyXFxuICAgIDwvbGk+XFxyXFxuPC91bD4gXCI7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vLm5wbWluc3RhbGwvaHRtbC1sb2FkZXIvMC40LjMvaHRtbC1sb2FkZXIhLi93d3dyb290L19zcmMvanMvbW9kdWxlcy9hdmFsb24vbXMtdHJlZS9yb290X3RyZWUuaHRtbFxuICoqIG1vZHVsZSBpZCA9IDE5XG4gKiogbW9kdWxlIGNodW5rcyA9IDVcbiAqKi8iLCJcclxuYXZhbG9uLmNvbXBvbmVudCgnbXMtcGFuZWwnLCB7XHJcbiAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnaHRtbCEuL3BhbmVsLmh0bWwnKSxcclxuICAgIGRlZmF1bHRzOiB7XHJcbiAgICAgXHJcbiAgICAgICBcclxuICAgIH0sXHJcbiAgIFxyXG59KTtcclxuXHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi93d3dyb290L19zcmMvanMvbW9kdWxlcy9hdmFsb24vbXMtcGFuZWwvbXMtcGFuZWwuanNcbiAqKiBtb2R1bGUgaWQgPSAyMFxuICoqIG1vZHVsZSBjaHVua3MgPSA1XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgY2xhc3M9XFxcImphcnZpc3dpZGdldFxcXCI+XFxyXFxuICAgIDxoZWFkZXI+XFxyXFxuICAgICAgIDxzbG90IG5hbWU9J3RpdGxlJz48L3Nsb3Q+XFxyXFxuXFxyXFxuICAgIDwvaGVhZGVyPlxcclxcbiAgICA8ZGl2PlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiamFydmlzd2lkZ2V0LWVkaXRib3hcXFwiPlxcclxcbiAgICAgICAgICAgPHNsb3QgbmFtZT0nYm94Jy8+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIndpZGdldC1ib2R5XFxcIj5cXHJcXG4gICAgICAgICAgICA8c2xvdCBuYW1lPVxcXCJjb250ZW50XFxcIj48L3Nsb3Q+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuPC9kaXY+XCI7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vLm5wbWluc3RhbGwvaHRtbC1sb2FkZXIvMC40LjMvaHRtbC1sb2FkZXIhLi93d3dyb290L19zcmMvanMvbW9kdWxlcy9hdmFsb24vbXMtcGFuZWwvcGFuZWwuaHRtbFxuICoqIG1vZHVsZSBpZCA9IDIxXG4gKiogbW9kdWxlIGNodW5rcyA9IDVcbiAqKi8iLCJ2YXIgT3JnU2VydmljZSA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9tb2R1bGVzL21lbWJlcnNoaXAvb3Jnc2VydmljZS5qc1wiKTtcclxudmFyIGF2YWxvbiA9IHJlcXVpcmUoJ2F2YWxvbicpO1xyXG52YXIgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgY3JlYXRlOiBmdW5jdGlvbiAoaWQsIGZuT25jbGljaykge1xyXG4gICAgICAgdmFyIHJlc3VsdD0gYXZhbG9uLmRlZmluZSh7XHJcbiAgICAgICAgICAgICRpZDogaWQsXHJcbiAgICAgICAgICAgIG9yZ0NvbmZpZzoge1xyXG4gICAgICAgICAgICAgICAgc3ViUHJvcE5hbWU6IFwic3ViT3Jnc1wiLFxyXG4gICAgICAgICAgICAgICAgZ2V0VGV4dDogZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsLm5hbWU7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgb25TZWxlY3Q6IGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZuT25jbGljayAmJiBmbk9uY2xpY2soZWwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvcmdzOiBbeyBuYW1lOiAnJywgc3ViT3JnczogW10sIG9wZW46IGZhbHNlLCBpZDogMCB9XSAvL2F2YWxvbuaXoOazleiHquWKqHBhcnNl77yM5Zug5q2k6KaB5aSE55CG5aW95a+56LGh5o6l5ZOm5Y+kXHJcbiAgICAgICAgfSlcclxuXHJcblxyXG4gICAgICAgIE9yZ1NlcnZpY2UubGlzdChudWxsKS5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5vcmdzID0gZGF0YTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9LFxyXG4gICAgZGVzdG9yeTogZnVuY3Rpb24gKGlkKSB7XHJcbiAgICAgICAgZGVsZXRlIGF2YWxvbi52bW9kZWxzW2lkXTtcclxuICAgIH1cclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi93d3dyb290L19zcmMvanMvdmlld3MvYXJlYXMvbWVtYmVyc2hpcC9PcmcvX29yZ1RyZWUuanNcbiAqKiBtb2R1bGUgaWQgPSAyMlxuICoqIG1vZHVsZSBjaHVua3MgPSA1XG4gKiovIiwidmFyIGF2YWxvbiA9IHJlcXVpcmUoJ2F2YWxvbicpO1xyXG52YXIgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xyXG52YXIgT3JnU2VydmljZSA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9tb2R1bGVzL21lbWJlcnNoaXAvb3Jnc2VydmljZS5qc1wiKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgZGVzdG9yeTpmdW5jdGlvbihzdHJFZGl0b3JJZCl7XHJcbiAgICAgICAgZGVsZXRlIGF2YWxvbi52bW9kZWxzW3N0ckVkaXRvcklkXTtcclxuICAgIH0sXHJcbiAgICBjcmVhdGU6IGZ1bmN0aW9uIChzdHJFZGl0b3JJZCxmblNhdmVkQ2FsbGJhY2spIHtcclxuICAgICAgICB2YXIgZWRpdG9yID0gYXZhbG9uLmRlZmluZSh7XHJcbiAgICAgICAgICAgICRpZDogc3RyRWRpdG9ySWQsXHJcbiAgICAgICAgICAgIG9yZzoge1xyXG4gICAgICAgICAgICAgICAgaWQ6IDAsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgcmVtYXJrOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgcGFyZW50SWQ6IFwiXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXF1aXJlLmVuc3VyZShbXCIuLi8uLi8uLi8uLi9tb2R1bGVzL3ZhZm9ybS5qc1wiXSxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHZhZm9ybSA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9tb2R1bGVzL3ZhZm9ybS5qc1wiKTtcclxuICAgICAgICAgICAgICAgIHZhciAkZm9ybSA9ICQoXCIjXCIgKyBzdHJFZGl0b3JJZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFmb3JtLmZvcldlYkFwaSgkZm9ybSxcclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcmcgPSBhdmFsb24udm1vZGVsc1tzdHJFZGl0b3JJZF0ub3JnLiRtb2RlbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBvc3REYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IG9yZy5pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG9yZy5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtYXJrOiBvcmcucmVtYXJrLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50OiBvcmcucGFyZW50SWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgT3JnU2VydmljZS5zYXZlKHBvc3REYXRhKS5kb25lKGZ1bmN0aW9uIChyZXR1cm5EYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIuS/neWtmOaIkOWKn1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuU2F2ZWRDYWxsYmFjayAmJiBmblNhdmVkQ2FsbGJhY2socmV0dXJuRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGVkaXRvcjtcclxuICAgIH1cclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi93d3dyb290L19zcmMvanMvdmlld3MvYXJlYXMvbWVtYmVyc2hpcC9PcmcvX2VkaXRvci5qc1xuICoqIG1vZHVsZSBpZCA9IDIzXG4gKiogbW9kdWxlIGNodW5rcyA9IDVcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9