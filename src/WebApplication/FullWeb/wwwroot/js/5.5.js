webpackJsonp([5],{

/***/ 14:
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

/***/ 16:
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../../../modules/avalon/ms-tree/ms-tree.js" />
	/// <reference path="../../../../modules/membership/orgservice.js" />
	/// <reference path="../../../../modules/vaform.js" />
	var OrgTree = __webpack_require__(17);
	var OrgService = __webpack_require__(19);
	var avalon = __webpack_require__(6);
	
	function InitVaForm(fnSavedCallback) {
	    var strEditorId = "orgEditor";
	    __webpack_require__.e/* nsure */(1/* duplicate */, function () {
	            var vaform = __webpack_require__(7);
	            var $form = $("#" + strEditorId);
	           
	            vaform.forWebApi($form,
	                function () {
	                    OrgService.save(avalon.vmodels[strEditorId].org.$model).done(function () {
	                        alert("保存成功");
	                        fnSavedCallback && fnSavedCallback();
	                    });
	
	                });
	        });
	}
	
	function init() {
	    var result = avalon.define({
	        $id: 'orgTree',
	        orgs: []
	    });
	    var editor = avalon.define({
	        $id: 'orgEditor',
	        org: {
	            name: "",
	            remark: "",
	            parentId: ""
	        }
	    });
	
	    InitVaForm(function() {
	        
	    });
	    return result;
	}
	
	
	function onload(contentLoadingArea) {
	    init();
	    avalon.scan(contentLoadingArea)
	}
	
	function unload() {
	    delete avalon.vmodels["orgTree"];
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


/***/ },

/***/ 18:
/***/ function(module, exports) {

	module.exports = "<ul>\r\n    <li ms-for=\"(index, el) in @tree | get(0)\" ms-click=\"@openSubTree(el,$event)\" \r\n        ms-class=\"@hasSubTree(el)?'parent_li':''\">\r\n\r\n        <span>\r\n            <i ms-class=\"@getChangeIcon(el)\"></i>\r\n            {{@getText(el)}}\r\n        </span>\r\n        <div ms-html=\"@renderSubTree(el)\" ms-visible=\"!!el.open\">\r\n\r\n        </div>\r\n    </li>\r\n</ul>";

/***/ },

/***/ 19:
/***/ function(module, exports, __webpack_require__) {

	var url = "/api/orgs";
	var webapi = __webpack_require__(14).create(url);
	module.exports = {
	    list: function (parentId) {
	        return webapi.Get({ parentId: parentId });
	    },
	    save: function (org,parentOgId) {
	        return webapi.Post({
	            org: org,
	            parentOrgId: parentOgId
	        });
	    }
	}

/***/ }

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi93d3dyb290L19zcmMvanMvbW9kdWxlcy93ZWJhcGkuanM/MGY1NCIsIndlYnBhY2s6Ly8vLi93d3dyb290L19zcmMvanMvdmlld3MvYXJlYXMvbWVtYmVyc2hpcC9PcmcvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vd3d3cm9vdC9fc3JjL2pzL21vZHVsZXMvYXZhbG9uL21zLXRyZWUvbXMtdHJlZS5qcyIsIndlYnBhY2s6Ly8vLi93d3dyb290L19zcmMvanMvbW9kdWxlcy9hdmFsb24vbXMtdHJlZS9yb290X3RyZWUuaHRtbCIsIndlYnBhY2s6Ly8vLi93d3dyb290L19zcmMvanMvbW9kdWxlcy9tZW1iZXJzaGlwL29yZ3NlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBdUM7QUFDdkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQSw0QkFBMkIsY0FBYyxlQUFlOztBQUV4RDs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0RBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUI7O0FBRXJCLGtCQUFpQjtBQUNqQixVQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMOztBQUVBLE1BQUs7QUFDTDtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7OztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLCtDQUE4QztBQUM5QztBQUNBO0FBQ0E7QUFDQSxtQ0FBa0M7QUFDbEM7QUFDQSxVQUFTO0FBQ1Q7O0FBRUE7O0FBRUE7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDOzs7Ozs7OztBQ3ZERCx3UUFBdVEsY0FBYywwSTs7Ozs7OztBQ0FyUjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUEyQixxQkFBcUI7QUFDaEQsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsRSIsImZpbGUiOiI1LjUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xyXG5cclxuZnVuY3Rpb24gV2VwQXBpKHVybCkge1xyXG4gICAgdGhpcy5vcHRzID0ge1xyXG4gICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIlxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLlB1dCA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImRhdGFcIj48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImZ1bmNcIj48L3BhcmFtPlxyXG5cclxuICAgICAgICB2YXIgb3B0cyA9IHRoaXMuZXh0LmNhbGwodGhpcywgXCJQVVRcIiwgZGF0YSk7XHJcblxyXG4gICAgICAgIHJldHVybiAkLmFqYXgob3B0cyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuRGVsZXRlID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiZGF0YVwiPjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiZnVuY1wiPjwvcGFyYW0+XHJcbiAgICAgICAgdmFyIG9wdHMgPSB0aGlzLmV4dC5jYWxsKHRoaXMsIFwiREVMRVRFXCIsIGRhdGEpO1xyXG4gICAgICAgIGlmIChkYXRhLmlkKSB7XHJcbiAgICAgICAgICAgIG9wdHMudXJsICs9IFwiL1wiICsgZGF0YS5pZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICQuYWpheChvcHRzKTtcclxuICAgIH07XHJcbiAgICB0aGlzLlBvc3QgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJkYXRhXCI+PC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJmdW5jXCI+PC9wYXJhbT5cclxuICAgICAgICB2YXIgb3B0cyA9IHRoaXMuZXh0LmNhbGwodGhpcywgXCJQT1NUXCIsIGRhdGEpO1xyXG4gICAgICAgIHJldHVybiAkLmFqYXgob3B0cyk7XHJcbiAgICB9O1xyXG4gICAgdGhpcy5HZXQgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJkYXRhXCI+PC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJmdW5jXCI+PC9wYXJhbT5cclxuICAgICAgICB2YXIgb3B0cyA9IHRoaXMuZXh0LmNhbGwodGhpcywgXCJHRVRcIiwgZGF0YSk7XHJcbiAgICAgICAgcmV0dXJuICQuYWpheChvcHRzKTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIHRoaXMuZXh0ID0gZnVuY3Rpb24gKG1ldGhvZCwgZGF0YSkge1xyXG5cclxuICAgICAgICB2YXIgYSA9ICQuZXh0ZW5kKHt9LCB0aGlzLm9wdHMsIHsgdHlwZTogbWV0aG9kIH0pO1xyXG5cclxuICAgICAgICBhLmRhdGEgPSBtZXRob2QgIT09IFwiR0VUXCIgPyBKU09OLnN0cmluZ2lmeShkYXRhKSA6IGRhdGE7XHJcblxyXG4gICAgICAgIHJldHVybiBhO1xyXG4gICAgfTtcclxufTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGNyZWF0ZTogZnVuY3Rpb24gKHVybCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgV2VwQXBpKHVybCk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3d3d3Jvb3QvX3NyYy9qcy9tb2R1bGVzL3dlYmFwaS5qc1xuICoqIG1vZHVsZSBpZCA9IDE0XG4gKiogbW9kdWxlIGNodW5rcyA9IDQgNVxuICoqLyIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi8uLi9tb2R1bGVzL2F2YWxvbi9tcy10cmVlL21zLXRyZWUuanNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vLi4vbW9kdWxlcy9tZW1iZXJzaGlwL29yZ3NlcnZpY2UuanNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vLi4vbW9kdWxlcy92YWZvcm0uanNcIiAvPlxyXG52YXIgT3JnVHJlZSA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9tb2R1bGVzL2F2YWxvbi9tcy10cmVlL21zLXRyZWUuanNcIik7XHJcbnZhciBPcmdTZXJ2aWNlID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uL21vZHVsZXMvbWVtYmVyc2hpcC9vcmdzZXJ2aWNlLmpzXCIpO1xyXG52YXIgYXZhbG9uID0gcmVxdWlyZSgnYXZhbG9uJyk7XHJcblxyXG5mdW5jdGlvbiBJbml0VmFGb3JtKGZuU2F2ZWRDYWxsYmFjaykge1xyXG4gICAgdmFyIHN0ckVkaXRvcklkID0gXCJvcmdFZGl0b3JcIjtcclxuICAgIHJlcXVpcmUuZW5zdXJlKFtcIi4uLy4uLy4uLy4uL21vZHVsZXMvdmFmb3JtLmpzXCJdLFxyXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHZhZm9ybSA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9tb2R1bGVzL3ZhZm9ybS5qc1wiKTtcclxuICAgICAgICAgICAgdmFyICRmb3JtID0gJChcIiNcIiArIHN0ckVkaXRvcklkKTtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFmb3JtLmZvcldlYkFwaSgkZm9ybSxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBPcmdTZXJ2aWNlLnNhdmUoYXZhbG9uLnZtb2RlbHNbc3RyRWRpdG9ySWRdLm9yZy4kbW9kZWwpLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIuS/neWtmOaIkOWKn1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm5TYXZlZENhbGxiYWNrICYmIGZuU2F2ZWRDYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0KCkge1xyXG4gICAgdmFyIHJlc3VsdCA9IGF2YWxvbi5kZWZpbmUoe1xyXG4gICAgICAgICRpZDogJ29yZ1RyZWUnLFxyXG4gICAgICAgIG9yZ3M6IFtdXHJcbiAgICB9KTtcclxuICAgIHZhciBlZGl0b3IgPSBhdmFsb24uZGVmaW5lKHtcclxuICAgICAgICAkaWQ6ICdvcmdFZGl0b3InLFxyXG4gICAgICAgIG9yZzoge1xyXG4gICAgICAgICAgICBuYW1lOiBcIlwiLFxyXG4gICAgICAgICAgICByZW1hcms6IFwiXCIsXHJcbiAgICAgICAgICAgIHBhcmVudElkOiBcIlwiXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgSW5pdFZhRm9ybShmdW5jdGlvbigpIHtcclxuICAgICAgICBcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIG9ubG9hZChjb250ZW50TG9hZGluZ0FyZWEpIHtcclxuICAgIGluaXQoKTtcclxuICAgIGF2YWxvbi5zY2FuKGNvbnRlbnRMb2FkaW5nQXJlYSlcclxufVxyXG5cclxuZnVuY3Rpb24gdW5sb2FkKCkge1xyXG4gICAgZGVsZXRlIGF2YWxvbi52bW9kZWxzW1wib3JnVHJlZVwiXTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBsb2FkOiBvbmxvYWQsXHJcbiAgICB1bmxvYWQ6IHVubG9hZFxyXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3d3d3Jvb3QvX3NyYy9qcy92aWV3cy9hcmVhcy9tZW1iZXJzaGlwL09yZy9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDE2XG4gKiogbW9kdWxlIGNodW5rcyA9IDVcbiAqKi8iLCJ2YXIgdHJlZUlEID0gMFxyXG5hdmFsb24uY29tcG9uZW50KCd0cmVlJywge1xyXG4gICAgdGVtcGxhdGU6IHJlcXVpcmUoJ2h0bWwhLi9yb290X3RyZWUuaHRtbCcpLFxyXG4gICAgZGVmYXVsdHM6IHtcclxuICAgICAgICBpY29uczpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYWRkZWQ6IFtcImZhXCIsIFwiZmEtbGFyZ2VcIl0sXHJcbiAgICAgICAgICAgICAgICBjbG9zZTogXCJmYS1wbHVzLWNpcmNsZVwiLFxyXG4gICAgICAgICAgICAgICAgb3BlbjogJ2ZhLW1pbnVzLWNpcmNsZScsXHJcbiAgICAgICAgICAgICAgICB3aXRob3V0Q2hpbGQ6ICdpY29uLWxlYWYnLFxyXG4gICAgICAgICAgICAgICAgd2l0aENoaWxkOiBcInBhcmVudF9saVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgZ2V0Q2hhbmdlSWNvbjogZnVuY3Rpb24gKGVsKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgcyA9IHRoaXMuaWNvbnMuYWRkZWQuc2xpY2UoMCk7XHJcbiAgICAgICAgICAgIHZhciBhZGRDbGFzcyA9IFwiXCI7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5oYXNTdWJUcmVlKGVsKSlcclxuICAgICAgICAgICAgICAgIGFkZENsYXNzID0gdGhpcy5pY29ucy53aXRob3V0Q2hpbGQ7XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVsLm9wZW4pXHJcbiAgICAgICAgICAgICAgICAgICAgYWRkQ2xhc3MgPSB0aGlzLmljb25zLm9wZW47XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhZGRDbGFzcyA9IHRoaXMuaWNvbnMuY2xvc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcy5wdXNoKGFkZENsYXNzKTtcclxuICAgICAgICAgICAgcmV0dXJuIHM7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBoYXNTdWJUcmVlOiBmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgICAgICAgdmFyIHN1YlRyZWUgPSBlbFt0aGlzLnN1YlByb3BOYW1lXTtcclxuICAgICAgICAgICAgcmV0dXJuIHN1YlRyZWUubGVuZ3RoICE9IDA7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0cmVlOiBbXSxcclxuICAgICAgICBzdWJQcm9wTmFtZTogXCJzdWJ0cmVlXCIsXHJcbiAgICAgICAgcmVuZGVyU3ViVHJlZTogZnVuY3Rpb24gKGVsKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgc3ViVHJlZSA9IGVsW3RoaXMuc3ViUHJvcE5hbWVdO1xyXG4gICAgICAgICAgICByZXR1cm4gc3ViVHJlZS5sZW5ndGhcclxuICAgICAgICAgICAgICAgID8gJzx3YnIgaXM9XCJ0cmVlXCIgbXMtd2lkZ2V0PVwieyRpZDpcInRyZWVfJyArXHJcbiAgICAgICAgICAgICAgICAoKyt0cmVlSUQpICtcclxuICAgICAgICAgICAgICAgICdcIiwgdHJlZTogZWwuJyArXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN1YlByb3BOYW1lICtcclxuICAgICAgICAgICAgICAgICcsY2x6OlwicGFyZW50X2xpXCJ9XCIgLz4nXHJcbiAgICAgICAgICAgICAgICA6ICcnO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb3BlblN1YlRyZWU6IGZ1bmN0aW9uIChlbCwgZSkge1xyXG5cclxuICAgICAgICAgICAgZWwub3BlbiA9ICFlbC5vcGVuO1xyXG5cclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldFRleHQ6IGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZWwuTmFtZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSlcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3d3d3Jvb3QvX3NyYy9qcy9tb2R1bGVzL2F2YWxvbi9tcy10cmVlL21zLXRyZWUuanNcbiAqKiBtb2R1bGUgaWQgPSAxN1xuICoqIG1vZHVsZSBjaHVua3MgPSA1XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBcIjx1bD5cXHJcXG4gICAgPGxpIG1zLWZvcj1cXFwiKGluZGV4LCBlbCkgaW4gQHRyZWUgfCBnZXQoMClcXFwiIG1zLWNsaWNrPVxcXCJAb3BlblN1YlRyZWUoZWwsJGV2ZW50KVxcXCIgXFxyXFxuICAgICAgICBtcy1jbGFzcz1cXFwiQGhhc1N1YlRyZWUoZWwpPydwYXJlbnRfbGknOicnXFxcIj5cXHJcXG5cXHJcXG4gICAgICAgIDxzcGFuPlxcclxcbiAgICAgICAgICAgIDxpIG1zLWNsYXNzPVxcXCJAZ2V0Q2hhbmdlSWNvbihlbClcXFwiPjwvaT5cXHJcXG4gICAgICAgICAgICB7e0BnZXRUZXh0KGVsKX19XFxyXFxuICAgICAgICA8L3NwYW4+XFxyXFxuICAgICAgICA8ZGl2IG1zLWh0bWw9XFxcIkByZW5kZXJTdWJUcmVlKGVsKVxcXCIgbXMtdmlzaWJsZT1cXFwiISFlbC5vcGVuXFxcIj5cXHJcXG5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICA8L2xpPlxcclxcbjwvdWw+XCI7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vLm5wbWluc3RhbGwvaHRtbC1sb2FkZXIvMC40LjMvaHRtbC1sb2FkZXIhLi93d3dyb290L19zcmMvanMvbW9kdWxlcy9hdmFsb24vbXMtdHJlZS9yb290X3RyZWUuaHRtbFxuICoqIG1vZHVsZSBpZCA9IDE4XG4gKiogbW9kdWxlIGNodW5rcyA9IDVcbiAqKi8iLCJ2YXIgdXJsID0gXCIvYXBpL29yZ3NcIjtcclxudmFyIHdlYmFwaSA9IHJlcXVpcmUoXCIuLi93ZWJhcGkuanNcIikuY3JlYXRlKHVybCk7XHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgbGlzdDogZnVuY3Rpb24gKHBhcmVudElkKSB7XHJcbiAgICAgICAgcmV0dXJuIHdlYmFwaS5HZXQoeyBwYXJlbnRJZDogcGFyZW50SWQgfSk7XHJcbiAgICB9LFxyXG4gICAgc2F2ZTogZnVuY3Rpb24gKG9yZyxwYXJlbnRPZ0lkKSB7XHJcbiAgICAgICAgcmV0dXJuIHdlYmFwaS5Qb3N0KHtcclxuICAgICAgICAgICAgb3JnOiBvcmcsXHJcbiAgICAgICAgICAgIHBhcmVudE9yZ0lkOiBwYXJlbnRPZ0lkXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vd3d3cm9vdC9fc3JjL2pzL21vZHVsZXMvbWVtYmVyc2hpcC9vcmdzZXJ2aWNlLmpzXG4gKiogbW9kdWxlIGlkID0gMTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gNVxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=