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
	
	var OrgTree = __webpack_require__(17);
	var Panel=__webpack_require__(19)
	var OrgService = __webpack_require__(21);
	var avalon = __webpack_require__(6);
	var $ = __webpack_require__(2);
	
	function InitVaForm(fnSavedCallback) {
	  
	    __webpack_require__.e/* nsure */(1/* duplicate */, function () {
	            var strEditorId = "orgEditor";
	            var vaform = __webpack_require__(7);
	            var $form = $("#" + strEditorId);
	
	            vaform.forWebApi($form,
	                function () {
	                    var org=avalon.vmodels[strEditorId].org.$model;
	                    var postData={
	                        id:org.id,
	                        name:org.name,
	                        remark:org.remark,
	                        parent:org.parentId
	                    };
	                    OrgService.save(postData).done(function () {
	                        alert("保存成功");
	                        fnSavedCallback && fnSavedCallback();
	                    });
	
	                });
	        });
	}
	
	function Init() {
	    var result = avalon.define({
	        $id: 'orgTree',
	        orgConfig: {
	            subPropName: "subOrgs",
	            getText: function (el) {
	                return el.name
	            },
	            onSelect: function (el) {
	                editor.org=el;
	            }
	        },
	      
	        orgs: [{ name: '', subOrgs: [], open: false,id:0 }] //avalon无法自动parse，因此要处理好对象接哦古
	    }),
	        editor = avalon.define({
	            $id: 'orgEditor',
	            org: {
	                id:0,
	                name: "",
	                remark: "",
	                parentId: ""
	            }
	        });
	
	    InitVaForm();
	    OrgService.list(null).done(function (data) {
	        result.orgs = data;
	    })
	    return result;
	}
	
	
	function Onload(contentLoadingArea) {
	    Init();
	    avalon.scan(contentLoadingArea)
	}
	
	function Unload() {
	    delete avalon.vmodels["orgTree"];
	    delete avalon.vmodels["orgEditor"];
	}
	
	module.exports = {
	    load: Onload,
	    unload: Unload
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var treeID = 0;
	avalon.component('ms-tree', {
	    template: __webpack_require__(18),
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
/* 18 */
/***/ function(module, exports) {

	module.exports = "<ul>\r\n    <li ms-for=\"(index, el) in @tree | get(0)\" ms-click=\"@openSubTree(el,$event)\" \r\n        ms-class=\"@hasSubTree(el)?'parent_li':''\" style=\"cursor:pointer\">\r\n\r\n        <span>\r\n            <i ms-class=\"@getChangeIcon(el)\"></i>\r\n            {{@getText(el)}}\r\n        </span>\r\n        <div ms-html=\"@renderSubTree(el)\" ms-visible=\"!!el.open\"></div>\r\n    </li>\r\n</ul> ";

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	avalon.component('ms-panel', {
	    template: __webpack_require__(20),
	    defaults: {
	        title: 'title'
	       
	    },
	   
	});
	


/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = "<div class=\"jarviswidget\">\r\n    <header>\r\n        <h2>{{@title}}</h2>\r\n    </header>\r\n    <div>\r\n\r\n        <div class=\"jarviswidget-editbox\">\r\n           <slot name='box'/>\r\n        </div>\r\n        <div class=\"widget-body\">\r\n            <slot name=\"content\"></slot>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ },
/* 21 */
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

/***/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi93d3dyb290L19zcmMvanMvbW9kdWxlcy93ZWJhcGkuanM/MGY1NCIsIndlYnBhY2s6Ly8vLi93d3dyb290L19zcmMvanMvdmlld3MvYXJlYXMvbWVtYmVyc2hpcC9PcmcvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vd3d3cm9vdC9fc3JjL2pzL21vZHVsZXMvYXZhbG9uL21zLXRyZWUvbXMtdHJlZS5qcyIsIndlYnBhY2s6Ly8vLi93d3dyb290L19zcmMvanMvbW9kdWxlcy9hdmFsb24vbXMtdHJlZS9yb290X3RyZWUuaHRtbCIsIndlYnBhY2s6Ly8vLi93d3dyb290L19zcmMvanMvbW9kdWxlcy9hdmFsb24vbXMtcGFuZWwvbXMtcGFuZWwuanMiLCJ3ZWJwYWNrOi8vLy4vd3d3cm9vdC9fc3JjL2pzL21vZHVsZXMvYXZhbG9uL21zLXBhbmVsL3BhbmVsLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vd3d3cm9vdC9fc3JjL2pzL21vZHVsZXMvbWVtYmVyc2hpcC9vcmdzZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdDQUF1QztBQUN2Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBLDRCQUEyQixjQUFjLGVBQWU7O0FBRXhEOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSx3REFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUI7O0FBRXJCLGtCQUFpQjtBQUNqQixVQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVCxpQkFBZ0IsMENBQTBDO0FBQzFELE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7O0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQSxtQ0FBa0M7QUFDbEM7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDOzs7Ozs7O0FDdkRELGlTQUFnUyxjQUFjLDJIOzs7Ozs7QUNBOVM7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBSzs7QUFFTCxFQUFDOzs7Ozs7OztBQ1BELGlGQUFnRixRQUFRLDJROzs7Ozs7QUNBeEY7QUFDQTtBQUNBO0FBQ0EsNEJBQTJCLHFCQUFxQjtBQUNoRCxNQUFLO0FBQ0wsMkI7QUFDQTtBQUNBO0FBQ0EsRSIsImZpbGUiOiI1LjUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xyXG5cclxuZnVuY3Rpb24gV2VwQXBpKHVybCkge1xyXG4gICAgdGhpcy5vcHRzID0ge1xyXG4gICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIlxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLlB1dCA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImRhdGFcIj48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImZ1bmNcIj48L3BhcmFtPlxyXG5cclxuICAgICAgICB2YXIgb3B0cyA9IHRoaXMuZXh0LmNhbGwodGhpcywgXCJQVVRcIiwgZGF0YSk7XHJcblxyXG4gICAgICAgIHJldHVybiAkLmFqYXgob3B0cyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuRGVsZXRlID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiZGF0YVwiPjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiZnVuY1wiPjwvcGFyYW0+XHJcbiAgICAgICAgdmFyIG9wdHMgPSB0aGlzLmV4dC5jYWxsKHRoaXMsIFwiREVMRVRFXCIsIGRhdGEpO1xyXG4gICAgICAgIGlmIChkYXRhLmlkKSB7XHJcbiAgICAgICAgICAgIG9wdHMudXJsICs9IFwiL1wiICsgZGF0YS5pZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICQuYWpheChvcHRzKTtcclxuICAgIH07XHJcbiAgICB0aGlzLlBvc3QgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJkYXRhXCI+PC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJmdW5jXCI+PC9wYXJhbT5cclxuICAgICAgICB2YXIgb3B0cyA9IHRoaXMuZXh0LmNhbGwodGhpcywgXCJQT1NUXCIsIGRhdGEpO1xyXG4gICAgICAgIHJldHVybiAkLmFqYXgob3B0cyk7XHJcbiAgICB9O1xyXG4gICAgdGhpcy5HZXQgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJkYXRhXCI+PC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJmdW5jXCI+PC9wYXJhbT5cclxuICAgICAgICB2YXIgb3B0cyA9IHRoaXMuZXh0LmNhbGwodGhpcywgXCJHRVRcIiwgZGF0YSk7XHJcbiAgICAgICAgcmV0dXJuICQuYWpheChvcHRzKTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIHRoaXMuZXh0ID0gZnVuY3Rpb24gKG1ldGhvZCwgZGF0YSkge1xyXG5cclxuICAgICAgICB2YXIgYSA9ICQuZXh0ZW5kKHt9LCB0aGlzLm9wdHMsIHsgdHlwZTogbWV0aG9kIH0pO1xyXG5cclxuICAgICAgICBhLmRhdGEgPSBtZXRob2QgIT09IFwiR0VUXCIgPyBKU09OLnN0cmluZ2lmeShkYXRhKSA6IGRhdGE7XHJcblxyXG4gICAgICAgIHJldHVybiBhO1xyXG4gICAgfTtcclxufTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGNyZWF0ZTogZnVuY3Rpb24gKHVybCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgV2VwQXBpKHVybCk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3d3d3Jvb3QvX3NyYy9qcy9tb2R1bGVzL3dlYmFwaS5qc1xuICoqIG1vZHVsZSBpZCA9IDE0XG4gKiogbW9kdWxlIGNodW5rcyA9IDQgNVxuICoqLyIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi8uLi9tb2R1bGVzL21lbWJlcnNoaXAvb3Jnc2VydmljZS5qc1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi8uLi9tb2R1bGVzL2F2YWxvbi9tcy10cmVlL21zLXRyZWUuanNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vLi4vbW9kdWxlcy9tZW1iZXJzaGlwL29yZ3NlcnZpY2UuanNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vLi4vbW9kdWxlcy92YWZvcm0uanNcIiAvPlxyXG5cclxudmFyIE9yZ1RyZWUgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vbW9kdWxlcy9hdmFsb24vbXMtdHJlZS9tcy10cmVlLmpzXCIpO1xyXG52YXIgUGFuZWw9cmVxdWlyZShcIi4uLy4uLy4uLy4uL21vZHVsZXMvYXZhbG9uL21zLXBhbmVsL21zLXBhbmVsLmpzXCIpXHJcbnZhciBPcmdTZXJ2aWNlID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uL21vZHVsZXMvbWVtYmVyc2hpcC9vcmdzZXJ2aWNlLmpzXCIpO1xyXG52YXIgYXZhbG9uID0gcmVxdWlyZSgnYXZhbG9uJyk7XHJcbnZhciAkID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XHJcblxyXG5mdW5jdGlvbiBJbml0VmFGb3JtKGZuU2F2ZWRDYWxsYmFjaykge1xyXG4gIFxyXG4gICAgcmVxdWlyZS5lbnN1cmUoW1wiLi4vLi4vLi4vLi4vbW9kdWxlcy92YWZvcm0uanNcIl0sXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHN0ckVkaXRvcklkID0gXCJvcmdFZGl0b3JcIjtcclxuICAgICAgICAgICAgdmFyIHZhZm9ybSA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9tb2R1bGVzL3ZhZm9ybS5qc1wiKTtcclxuICAgICAgICAgICAgdmFyICRmb3JtID0gJChcIiNcIiArIHN0ckVkaXRvcklkKTtcclxuXHJcbiAgICAgICAgICAgIHZhZm9ybS5mb3JXZWJBcGkoJGZvcm0sXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9yZz1hdmFsb24udm1vZGVsc1tzdHJFZGl0b3JJZF0ub3JnLiRtb2RlbDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcG9zdERhdGE9e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDpvcmcuaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6b3JnLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbWFyazpvcmcucmVtYXJrLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6b3JnLnBhcmVudElkXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBPcmdTZXJ2aWNlLnNhdmUocG9zdERhdGEpLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIuS/neWtmOaIkOWKn1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm5TYXZlZENhbGxiYWNrICYmIGZuU2F2ZWRDYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBJbml0KCkge1xyXG4gICAgdmFyIHJlc3VsdCA9IGF2YWxvbi5kZWZpbmUoe1xyXG4gICAgICAgICRpZDogJ29yZ1RyZWUnLFxyXG4gICAgICAgIG9yZ0NvbmZpZzoge1xyXG4gICAgICAgICAgICBzdWJQcm9wTmFtZTogXCJzdWJPcmdzXCIsXHJcbiAgICAgICAgICAgIGdldFRleHQ6IGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsLm5hbWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25TZWxlY3Q6IGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgICAgICAgICAgZWRpdG9yLm9yZz1lbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgIFxyXG4gICAgICAgIG9yZ3M6IFt7IG5hbWU6ICcnLCBzdWJPcmdzOiBbXSwgb3BlbjogZmFsc2UsaWQ6MCB9XSAvL2F2YWxvbuaXoOazleiHquWKqHBhcnNl77yM5Zug5q2k6KaB5aSE55CG5aW95a+56LGh5o6l5ZOm5Y+kXHJcbiAgICB9KSxcclxuICAgICAgICBlZGl0b3IgPSBhdmFsb24uZGVmaW5lKHtcclxuICAgICAgICAgICAgJGlkOiAnb3JnRWRpdG9yJyxcclxuICAgICAgICAgICAgb3JnOiB7XHJcbiAgICAgICAgICAgICAgICBpZDowLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJcIixcclxuICAgICAgICAgICAgICAgIHJlbWFyazogXCJcIixcclxuICAgICAgICAgICAgICAgIHBhcmVudElkOiBcIlwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICBJbml0VmFGb3JtKCk7XHJcbiAgICBPcmdTZXJ2aWNlLmxpc3QobnVsbCkuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHJlc3VsdC5vcmdzID0gZGF0YTtcclxuICAgIH0pXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gT25sb2FkKGNvbnRlbnRMb2FkaW5nQXJlYSkge1xyXG4gICAgSW5pdCgpO1xyXG4gICAgYXZhbG9uLnNjYW4oY29udGVudExvYWRpbmdBcmVhKVxyXG59XHJcblxyXG5mdW5jdGlvbiBVbmxvYWQoKSB7XHJcbiAgICBkZWxldGUgYXZhbG9uLnZtb2RlbHNbXCJvcmdUcmVlXCJdO1xyXG4gICAgZGVsZXRlIGF2YWxvbi52bW9kZWxzW1wib3JnRWRpdG9yXCJdO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGxvYWQ6IE9ubG9hZCxcclxuICAgIHVubG9hZDogVW5sb2FkXHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vd3d3cm9vdC9fc3JjL2pzL3ZpZXdzL2FyZWFzL21lbWJlcnNoaXAvT3JnL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gNVxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIHRyZWVJRCA9IDA7XHJcbmF2YWxvbi5jb21wb25lbnQoJ21zLXRyZWUnLCB7XHJcbiAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnaHRtbCEuL3Jvb3RfdHJlZS5odG1sJyksXHJcbiAgICBkZWZhdWx0czoge1xyXG4gICAgICAgIGljb25zOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYWRkZWQ6IFtcImZhXCIsIFwiZmEtbGFyZ2VcIl0sXHJcbiAgICAgICAgICAgIGNsb3NlOiBcImZhLXBsdXMtY2lyY2xlXCIsXHJcbiAgICAgICAgICAgIG9wZW46ICdmYS1taW51cy1jaXJjbGUnLFxyXG4gICAgICAgICAgICB3aXRob3V0Q2hpbGQ6ICdpY29uLWxlYWYnLFxyXG4gICAgICAgICAgICB3aXRoQ2hpbGQ6IFwicGFyZW50X2xpXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldENoYW5nZUljb246IGZ1bmN0aW9uIChlbCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHMgPSB0aGlzLmljb25zLmFkZGVkLnNsaWNlKDApO1xyXG4gICAgICAgICAgICB2YXIgYWRkQ2xhc3MgPSBcIlwiO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaGFzU3ViVHJlZShlbCkpe1xyXG4gICAgICAgICAgICAgICAgYWRkQ2xhc3MgPSB0aGlzLmljb25zLndpdGhvdXRDaGlsZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFkZENsYXNzID0gZWwub3BlbiA/IHRoaXMuaWNvbnMub3BlbiA6IHRoaXMuaWNvbnMuY2xvc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcy5wdXNoKGFkZENsYXNzKTtcclxuICAgICAgICAgICAgcmV0dXJuIHM7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvblNlbGVjdDpmdW5jdGlvbihlbCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIuivt+iuvue9rnRyZWXmjqfku7bnmoRvblNlbGVjdOaWueazlVwiKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGFzU3ViVHJlZTogZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgICAgICAgIHZhciBzdWJUcmVlID0gZWxbdGhpcy5zdWJQcm9wTmFtZV07XHJcbiAgICAgICAgICAgIHJldHVybiBzdWJUcmVlLmxlbmd0aCAhPSAwO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdHJlZTogW10sXHJcbiAgICAgICAgc3ViUHJvcE5hbWU6IFwic3VidHJlZVwiLFxyXG4gICAgICAgIHJlbmRlclN1YlRyZWU6IGZ1bmN0aW9uIChlbCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHN1YlRyZWUgPSBlbFt0aGlzLnN1YlByb3BOYW1lXTtcclxuICAgICAgICAgICAgcmV0dXJuIHN1YlRyZWUubGVuZ3RoXHJcbiAgICAgICAgICAgICAgICA/ICc8d2JyIGlzPVwibXMtdHJlZVwiIG1zLXdpZGdldD1cInskaWQ6XCJ0cmVlXycgK1xyXG4gICAgICAgICAgICAgICAgKCsrdHJlZUlEKSArXHJcbiAgICAgICAgICAgICAgICAnXCIsIHRyZWU6IGVsLicgK1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdWJQcm9wTmFtZSArXHJcbiAgICAgICAgICAgICAgICAnLGNsejpcInBhcmVudF9saVwifVwiIC8+J1xyXG4gICAgICAgICAgICAgICAgOiAnJztcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9wZW5TdWJUcmVlOiBmdW5jdGlvbiAoZWwsIGUpIHtcclxuICAgICAgICAgICAgdGhpcy5vblNlbGVjdChlbCk7XHJcbiAgICAgICAgICAgIGVsLm9wZW4gPSAhZWwub3BlbjtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldFRleHQ6IGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZWwuTmFtZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSlcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3d3d3Jvb3QvX3NyYy9qcy9tb2R1bGVzL2F2YWxvbi9tcy10cmVlL21zLXRyZWUuanNcbiAqKiBtb2R1bGUgaWQgPSAxN1xuICoqIG1vZHVsZSBjaHVua3MgPSA1XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBcIjx1bD5cXHJcXG4gICAgPGxpIG1zLWZvcj1cXFwiKGluZGV4LCBlbCkgaW4gQHRyZWUgfCBnZXQoMClcXFwiIG1zLWNsaWNrPVxcXCJAb3BlblN1YlRyZWUoZWwsJGV2ZW50KVxcXCIgXFxyXFxuICAgICAgICBtcy1jbGFzcz1cXFwiQGhhc1N1YlRyZWUoZWwpPydwYXJlbnRfbGknOicnXFxcIiBzdHlsZT1cXFwiY3Vyc29yOnBvaW50ZXJcXFwiPlxcclxcblxcclxcbiAgICAgICAgPHNwYW4+XFxyXFxuICAgICAgICAgICAgPGkgbXMtY2xhc3M9XFxcIkBnZXRDaGFuZ2VJY29uKGVsKVxcXCI+PC9pPlxcclxcbiAgICAgICAgICAgIHt7QGdldFRleHQoZWwpfX1cXHJcXG4gICAgICAgIDwvc3Bhbj5cXHJcXG4gICAgICAgIDxkaXYgbXMtaHRtbD1cXFwiQHJlbmRlclN1YlRyZWUoZWwpXFxcIiBtcy12aXNpYmxlPVxcXCIhIWVsLm9wZW5cXFwiPjwvZGl2PlxcclxcbiAgICA8L2xpPlxcclxcbjwvdWw+IFwiO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+Ly5ucG1pbnN0YWxsL2h0bWwtbG9hZGVyLzAuNC4zL2h0bWwtbG9hZGVyIS4vd3d3cm9vdC9fc3JjL2pzL21vZHVsZXMvYXZhbG9uL21zLXRyZWUvcm9vdF90cmVlLmh0bWxcbiAqKiBtb2R1bGUgaWQgPSAxOFxuICoqIG1vZHVsZSBjaHVua3MgPSA1XG4gKiovIiwiYXZhbG9uLmNvbXBvbmVudCgnbXMtcGFuZWwnLCB7XHJcbiAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnaHRtbCEuL3BhbmVsLmh0bWwnKSxcclxuICAgIGRlZmF1bHRzOiB7XHJcbiAgICAgICAgdGl0bGU6ICd0aXRsZSdcclxuICAgICAgIFxyXG4gICAgfSxcclxuICAgXHJcbn0pO1xyXG5cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3d3d3Jvb3QvX3NyYy9qcy9tb2R1bGVzL2F2YWxvbi9tcy1wYW5lbC9tcy1wYW5lbC5qc1xuICoqIG1vZHVsZSBpZCA9IDE5XG4gKiogbW9kdWxlIGNodW5rcyA9IDVcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBjbGFzcz1cXFwiamFydmlzd2lkZ2V0XFxcIj5cXHJcXG4gICAgPGhlYWRlcj5cXHJcXG4gICAgICAgIDxoMj57e0B0aXRsZX19PC9oMj5cXHJcXG4gICAgPC9oZWFkZXI+XFxyXFxuICAgIDxkaXY+XFxyXFxuXFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJqYXJ2aXN3aWRnZXQtZWRpdGJveFxcXCI+XFxyXFxuICAgICAgICAgICA8c2xvdCBuYW1lPSdib3gnLz5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwid2lkZ2V0LWJvZHlcXFwiPlxcclxcbiAgICAgICAgICAgIDxzbG90IG5hbWU9XFxcImNvbnRlbnRcXFwiPjwvc2xvdD5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICA8L2Rpdj5cXHJcXG48L2Rpdj5cIjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi8ubnBtaW5zdGFsbC9odG1sLWxvYWRlci8wLjQuMy9odG1sLWxvYWRlciEuL3d3d3Jvb3QvX3NyYy9qcy9tb2R1bGVzL2F2YWxvbi9tcy1wYW5lbC9wYW5lbC5odG1sXG4gKiogbW9kdWxlIGlkID0gMjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gNVxuICoqLyIsInZhciBXZWJhcGkgPSByZXF1aXJlKFwiLi4vd2ViYXBpLmpzXCIpLmNyZWF0ZShcIi9hcGkvb3Jnc1wiKTtcclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBsaXN0OiBmdW5jdGlvbiAocGFyZW50SWQpIHtcclxuICAgICAgICByZXR1cm4gV2ViYXBpLkdldCh7IHBhcmVudElkOiBwYXJlbnRJZCB9KTtcclxuICAgIH0sXHJcbiAgICBzYXZlOiBmdW5jdGlvbiAob3JnKSB7ICAgICAgXHJcbiAgICAgICAgcmV0dXJuIFdlYmFwaS5Qb3N0KG9yZyk7XHJcbiAgICB9XHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vd3d3cm9vdC9fc3JjL2pzL21vZHVsZXMvbWVtYmVyc2hpcC9vcmdzZXJ2aWNlLmpzXG4gKiogbW9kdWxlIGlkID0gMjFcbiAqKiBtb2R1bGUgY2h1bmtzID0gNVxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=