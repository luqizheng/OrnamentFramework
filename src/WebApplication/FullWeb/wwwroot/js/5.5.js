webpackJsonp([5],{

/***/ 6:
/***/ function(module, exports) {

	module.exports = avalon;

/***/ },

/***/ 12:
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../../../modules/memberships/roleservice.js" />
	/// <reference path="../../../../modules/vaform.js" />
	var avalon = __webpack_require__(6);
	var $ = __webpack_require__(2);
	var roleServices = __webpack_require__(13);
	
	
	__webpack_require__.e/* nsure */(3/* duplicate */, function () {
	        var vaform = __webpack_require__(8);
	        vaform.forWebApi("#role-edit-form", function () {
	            roleServices.save(editor.role.$model).
	            done(function () {
	                    alert('保存成功');
	                });
	        });
	    });
	
	
	var model = avalon.define({
	    $id: 'roleIndex',
	    roles: [],
	    edit: function (el) {
	        editor.role = el;
	        $editorDialog.modal('show');
	    },
	    create: function () {
	        editor.role = { Id: "", Name: "", Remark: "" }
	        $editorDialog.modal('show');
	    }
	});
	
	var $editorDialog = $('#role_editor')
	    .modal({
	        keyboard: false,
	        show: false
	    });
	
	var editor = avalon.define({
	    $id: 'roleEditor',
	    role: { Id: "", Name: "", Remark: "" },
	    save: function () {
	        $("form", $editorDialog).submit();
	    },
	    cancel: function () {
	
	    }
	});
	
	roleServices.list(0, 30)
	    .done(function (result) {
	        model.roles = result;
	        avalon.scan($("#content")[0]);
	    });
	
	
	


/***/ },

/***/ 13:
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../webapi.js" />
	
	var url = "/api/roles";
	var webapi = __webpack_require__(14).create(url);
	
	
	
	module.exports = {
	    list: function (pageIndex, pageSize) {
	        return webapi.Get({
	            pageIndex: pageIndex,
	            pageSize: pageSize
	        });
	    },
	    save: function (applicationRole) {
	        return webapi.Post(applicationRole);
	    }
	
	}

/***/ },

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


/***/ }

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhdmFsb25cIj9hOWEzKiIsIndlYnBhY2s6Ly8vLi93d3dyb290L19zcmMvanMvdmlld3MvYXJlYXMvbWVtYmVyc2hpcC9yb2xlL2luZGV4LmpzIiwid2VicGFjazovLy8uL3d3d3Jvb3QvX3NyYy9qcy9tb2R1bGVzL21lbWJlcnNoaXBzL3JvbGVzZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3d3d3Jvb3QvX3NyYy9qcy9tb2R1bGVzL3dlYmFwaS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHlCOzs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0Esb0RBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCLFVBQVM7QUFDVCxNQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSx3QkFBdUI7QUFDdkI7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQSxZQUFXLCtCQUErQjtBQUMxQztBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0EsRUFBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7Ozs7Ozs7Ozs7O0FDckRMOztBQUVBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNULE1BQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUEsRTs7Ozs7OztBQ2xCQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBdUM7QUFDdkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQSw0QkFBMkIsY0FBYyxlQUFlOztBQUV4RDs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiNS41LmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBhdmFsb247XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImF2YWxvblwiXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAxIDIgNVxuICoqLyIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi8uLi9tb2R1bGVzL21lbWJlcnNoaXBzL3JvbGVzZXJ2aWNlLmpzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uLy4uL21vZHVsZXMvdmFmb3JtLmpzXCIgLz5cclxudmFyIGF2YWxvbiA9IHJlcXVpcmUoJ2F2YWxvbicpO1xyXG52YXIgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xyXG52YXIgcm9sZVNlcnZpY2VzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uL21vZHVsZXMvbWVtYmVyc2hpcHMvcm9sZXNlcnZpY2UuanNcIik7XHJcblxyXG5cclxucmVxdWlyZS5lbnN1cmUoW1wiLi4vLi4vLi4vLi4vbW9kdWxlcy92YWZvcm0uanNcIl0sXHJcbiAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHZhZm9ybSA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9tb2R1bGVzL3ZhZm9ybS5qc1wiKTtcclxuICAgICAgICB2YWZvcm0uZm9yV2ViQXBpKFwiI3JvbGUtZWRpdC1mb3JtXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcm9sZVNlcnZpY2VzLnNhdmUoZWRpdG9yLnJvbGUuJG1vZGVsKS5cclxuICAgICAgICAgICAgZG9uZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ+S/neWtmOaIkOWKnycpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcblxyXG52YXIgbW9kZWwgPSBhdmFsb24uZGVmaW5lKHtcclxuICAgICRpZDogJ3JvbGVJbmRleCcsXHJcbiAgICByb2xlczogW10sXHJcbiAgICBlZGl0OiBmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgICBlZGl0b3Iucm9sZSA9IGVsO1xyXG4gICAgICAgICRlZGl0b3JEaWFsb2cubW9kYWwoJ3Nob3cnKTtcclxuICAgIH0sXHJcbiAgICBjcmVhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBlZGl0b3Iucm9sZSA9IHsgSWQ6IFwiXCIsIE5hbWU6IFwiXCIsIFJlbWFyazogXCJcIiB9XHJcbiAgICAgICAgJGVkaXRvckRpYWxvZy5tb2RhbCgnc2hvdycpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbnZhciAkZWRpdG9yRGlhbG9nID0gJCgnI3JvbGVfZWRpdG9yJylcclxuICAgIC5tb2RhbCh7XHJcbiAgICAgICAga2V5Ym9hcmQ6IGZhbHNlLFxyXG4gICAgICAgIHNob3c6IGZhbHNlXHJcbiAgICB9KTtcclxuXHJcbnZhciBlZGl0b3IgPSBhdmFsb24uZGVmaW5lKHtcclxuICAgICRpZDogJ3JvbGVFZGl0b3InLFxyXG4gICAgcm9sZTogeyBJZDogXCJcIiwgTmFtZTogXCJcIiwgUmVtYXJrOiBcIlwiIH0sXHJcbiAgICBzYXZlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJChcImZvcm1cIiwgJGVkaXRvckRpYWxvZykuc3VibWl0KCk7XHJcbiAgICB9LFxyXG4gICAgY2FuY2VsOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgfVxyXG59KTtcclxuXHJcbnJvbGVTZXJ2aWNlcy5saXN0KDAsIDMwKVxyXG4gICAgLmRvbmUoZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgIG1vZGVsLnJvbGVzID0gcmVzdWx0O1xyXG4gICAgICAgIGF2YWxvbi5zY2FuKCQoXCIjY29udGVudFwiKVswXSk7XHJcbiAgICB9KTtcclxuXHJcblxyXG5cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3d3d3Jvb3QvX3NyYy9qcy92aWV3cy9hcmVhcy9tZW1iZXJzaGlwL3JvbGUvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAxMlxuICoqIG1vZHVsZSBjaHVua3MgPSA1XG4gKiovIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3dlYmFwaS5qc1wiIC8+XHJcblxyXG52YXIgdXJsID0gXCIvYXBpL3JvbGVzXCI7XHJcbnZhciB3ZWJhcGkgPSByZXF1aXJlKFwiLi4vd2ViYXBpLmpzXCIpLmNyZWF0ZSh1cmwpO1xyXG5cclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGxpc3Q6IGZ1bmN0aW9uIChwYWdlSW5kZXgsIHBhZ2VTaXplKSB7XHJcbiAgICAgICAgcmV0dXJuIHdlYmFwaS5HZXQoe1xyXG4gICAgICAgICAgICBwYWdlSW5kZXg6IHBhZ2VJbmRleCxcclxuICAgICAgICAgICAgcGFnZVNpemU6IHBhZ2VTaXplXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgc2F2ZTogZnVuY3Rpb24gKGFwcGxpY2F0aW9uUm9sZSkge1xyXG4gICAgICAgIHJldHVybiB3ZWJhcGkuUG9zdChhcHBsaWNhdGlvblJvbGUpO1xyXG4gICAgfVxyXG5cclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi93d3dyb290L19zcmMvanMvbW9kdWxlcy9tZW1iZXJzaGlwcy9yb2xlc2VydmljZS5qc1xuICoqIG1vZHVsZSBpZCA9IDEzXG4gKiogbW9kdWxlIGNodW5rcyA9IDVcbiAqKi8iLCJ2YXIgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xyXG5cclxuZnVuY3Rpb24gV2VwQXBpKHVybCkge1xyXG4gICAgdGhpcy5vcHRzID0ge1xyXG4gICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIlxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLlB1dCA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImRhdGFcIj48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImZ1bmNcIj48L3BhcmFtPlxyXG5cclxuICAgICAgICB2YXIgb3B0cyA9IHRoaXMuZXh0LmNhbGwodGhpcywgXCJQVVRcIiwgZGF0YSk7XHJcblxyXG4gICAgICAgIHJldHVybiAkLmFqYXgob3B0cyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuRGVsZXRlID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiZGF0YVwiPjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiZnVuY1wiPjwvcGFyYW0+XHJcbiAgICAgICAgdmFyIG9wdHMgPSB0aGlzLmV4dC5jYWxsKHRoaXMsIFwiREVMRVRFXCIsIGRhdGEpO1xyXG4gICAgICAgIGlmIChkYXRhLmlkKSB7XHJcbiAgICAgICAgICAgIG9wdHMudXJsICs9IFwiL1wiICsgZGF0YS5pZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICQuYWpheChvcHRzKTtcclxuICAgIH07XHJcbiAgICB0aGlzLlBvc3QgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJkYXRhXCI+PC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJmdW5jXCI+PC9wYXJhbT5cclxuICAgICAgICB2YXIgb3B0cyA9IHRoaXMuZXh0LmNhbGwodGhpcywgXCJQT1NUXCIsIGRhdGEpO1xyXG4gICAgICAgIHJldHVybiAkLmFqYXgob3B0cyk7XHJcbiAgICB9O1xyXG4gICAgdGhpcy5HZXQgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJkYXRhXCI+PC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJmdW5jXCI+PC9wYXJhbT5cclxuICAgICAgICB2YXIgb3B0cyA9IHRoaXMuZXh0LmNhbGwodGhpcywgXCJHRVRcIiwgZGF0YSk7XHJcbiAgICAgICAgcmV0dXJuICQuYWpheChvcHRzKTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIHRoaXMuZXh0ID0gZnVuY3Rpb24gKG1ldGhvZCwgZGF0YSkge1xyXG5cclxuICAgICAgICB2YXIgYSA9ICQuZXh0ZW5kKHt9LCB0aGlzLm9wdHMsIHsgdHlwZTogbWV0aG9kIH0pO1xyXG5cclxuICAgICAgICBhLmRhdGEgPSBtZXRob2QgIT09IFwiR0VUXCIgPyBKU09OLnN0cmluZ2lmeShkYXRhKSA6IGRhdGE7XHJcblxyXG4gICAgICAgIHJldHVybiBhO1xyXG4gICAgfTtcclxufTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGNyZWF0ZTogZnVuY3Rpb24gKHVybCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgV2VwQXBpKHVybCk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3d3d3Jvb3QvX3NyYy9qcy9tb2R1bGVzL3dlYmFwaS5qc1xuICoqIG1vZHVsZSBpZCA9IDE0XG4gKiogbW9kdWxlIGNodW5rcyA9IDVcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9