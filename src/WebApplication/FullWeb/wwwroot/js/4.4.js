webpackJsonp([4],{

/***/ 12:
/***/ function(module, exports, __webpack_require__) {

	
	
	var roleServices = __webpack_require__(13)
	var editor = null; //roleEditor;
	var $editorDialog; //dialog of editor
	function createList(listId) {
	    var model = avalon.define({
	        $id: listId,
	        roles: [],
	        edit: function (el) {
	            editor.role = el;
	            editor.title="編輯角色"
	            $editorDialog.modal('show');
	        },
	        create: function () {
	            editor.title="新增角色"
	            editor.role = { Id: "", Name: "", Remark: "" }
	            $editorDialog.modal('show');
	        }
	    });
	
	    roleServices.list(0, 30)
	        .done(function (result) {
	            model.roles = result;
	
	        });
	
	 $editorDialog = $('#role-editor-dialog')
	        .modal({
	            keyboard: false,
	            show: false
	        });
	
	
	
	}
	
	var listId = "roleIndex";
	var editorId = "roleEditor";
	var RoleEditor = __webpack_require__(15);
	module.exports = {
	    load: function (loadContent) {
	        createList(listId);
	        editor = RoleEditor.create(editorId,function(){
	            $editorDialog.modal('close')
	        });
	        avalon.scan(loadContent)
	    },
	    unload: function () {
	        delete avalon.vmodels[listId];
	        delete avalon.vmodels[editorId];
	    }
	}

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


/***/ },

/***/ 15:
/***/ function(module, exports, __webpack_require__) {

	
	var roleServices = __webpack_require__(13)
	function getForm(strEditorId)
	{
	    return $("form",$("#"+strEditorId));
	}
	function InitVaForm(strEditorId, fnSavedCallback) {
	    __webpack_require__.e/* nsure */(1/* duplicate */, function () {
	            var vaform = __webpack_require__(7);
	            var $form=getForm(strEditorId);
	            vaform.forWebApi($form,
	                function () {
	                    roleServices.save(avalon.vmodels[strEditorId].role.$model).done(function () {
	                        alert("保存成功");
	                        fnSavedCallback();
	                    });
	
	                });
	        });
	}
	
	
	function CreateEditor(strEditorId) {
	    var editor = avalon.define({
	        $id: strEditorId,
	        role: { Id: "", Name: "", Remark: "" },
	        save: function () {
	            getForm(strEditorId).submit();
	        },
	        title:""
	    });
	    return editor;
	}
	
	module.exports = {
	    create: function (editorId, fnSavedCallback) {       
	        InitVaForm(editorId, fnSavedCallback);
	        return CreateEditor(editorId);
	
	    } //editorId 也是form的Id，也是controller的Id
	}

/***/ }

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi93d3dyb290L19zcmMvanMvdmlld3MvYXJlYXMvbWVtYmVyc2hpcC9Sb2xlL2luZGV4LmpzIiwid2VicGFjazovLy8uL3d3d3Jvb3QvX3NyYy9qcy9tb2R1bGVzL01lbWJlcnNoaXBzL1JvbGVTZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3d3d3Jvb3QvX3NyYy9qcy9tb2R1bGVzL3dlYmFwaS5qcyIsIndlYnBhY2s6Ly8vLi93d3dyb290L19zcmMvanMvdmlld3MvYXJlYXMvbWVtYmVyc2hpcC9Sb2xlL2VkaXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBO0FBQ0EsbUJBQWtCO0FBQ2xCLG1CQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSw0QkFBMkI7QUFDM0I7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOzs7O0FBSVQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7Ozs7QUNwREE7O0FBRUE7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsTUFBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQSxFOzs7Ozs7O0FDbEJBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdDQUF1QztBQUN2Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBLDRCQUEyQixjQUFjLGVBQWU7O0FBRXhEOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdEQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUI7O0FBRXJCLGtCQUFpQjtBQUNqQixVQUFTO0FBQ1Q7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLCtCQUErQjtBQUM5QztBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsTUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQSxtRDtBQUNBO0FBQ0E7O0FBRUEsTUFBSztBQUNMLEUiLCJmaWxlIjoiNC40LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG52YXIgcm9sZVNlcnZpY2VzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uL21vZHVsZXMvTWVtYmVyc2hpcHMvUm9sZVNlcnZpY2UuanNcIilcclxudmFyIGVkaXRvciA9IG51bGw7IC8vcm9sZUVkaXRvcjtcclxudmFyICRlZGl0b3JEaWFsb2c7IC8vZGlhbG9nIG9mIGVkaXRvclxyXG5mdW5jdGlvbiBjcmVhdGVMaXN0KGxpc3RJZCkge1xyXG4gICAgdmFyIG1vZGVsID0gYXZhbG9uLmRlZmluZSh7XHJcbiAgICAgICAgJGlkOiBsaXN0SWQsXHJcbiAgICAgICAgcm9sZXM6IFtdLFxyXG4gICAgICAgIGVkaXQ6IGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgICAgICBlZGl0b3Iucm9sZSA9IGVsO1xyXG4gICAgICAgICAgICBlZGl0b3IudGl0bGU9XCLnt6jovK/op5LoibJcIlxyXG4gICAgICAgICAgICAkZWRpdG9yRGlhbG9nLm1vZGFsKCdzaG93Jyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZWRpdG9yLnRpdGxlPVwi5paw5aKe6KeS6ImyXCJcclxuICAgICAgICAgICAgZWRpdG9yLnJvbGUgPSB7IElkOiBcIlwiLCBOYW1lOiBcIlwiLCBSZW1hcms6IFwiXCIgfVxyXG4gICAgICAgICAgICAkZWRpdG9yRGlhbG9nLm1vZGFsKCdzaG93Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgcm9sZVNlcnZpY2VzLmxpc3QoMCwgMzApXHJcbiAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBtb2RlbC5yb2xlcyA9IHJlc3VsdDtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gJGVkaXRvckRpYWxvZyA9ICQoJyNyb2xlLWVkaXRvci1kaWFsb2cnKVxyXG4gICAgICAgIC5tb2RhbCh7XHJcbiAgICAgICAgICAgIGtleWJvYXJkOiBmYWxzZSxcclxuICAgICAgICAgICAgc2hvdzogZmFsc2VcclxuICAgICAgICB9KTtcclxuXHJcblxyXG5cclxufVxyXG5cclxudmFyIGxpc3RJZCA9IFwicm9sZUluZGV4XCI7XHJcbnZhciBlZGl0b3JJZCA9IFwicm9sZUVkaXRvclwiO1xyXG52YXIgUm9sZUVkaXRvciA9IHJlcXVpcmUoXCIuL2VkaXQuanNcIik7XHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgbG9hZDogZnVuY3Rpb24gKGxvYWRDb250ZW50KSB7XHJcbiAgICAgICAgY3JlYXRlTGlzdChsaXN0SWQpO1xyXG4gICAgICAgIGVkaXRvciA9IFJvbGVFZGl0b3IuY3JlYXRlKGVkaXRvcklkLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICRlZGl0b3JEaWFsb2cubW9kYWwoJ2Nsb3NlJylcclxuICAgICAgICB9KTtcclxuICAgICAgICBhdmFsb24uc2Nhbihsb2FkQ29udGVudClcclxuICAgIH0sXHJcbiAgICB1bmxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBkZWxldGUgYXZhbG9uLnZtb2RlbHNbbGlzdElkXTtcclxuICAgICAgICBkZWxldGUgYXZhbG9uLnZtb2RlbHNbZWRpdG9ySWRdO1xyXG4gICAgfVxyXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3d3d3Jvb3QvX3NyYy9qcy92aWV3cy9hcmVhcy9tZW1iZXJzaGlwL1JvbGUvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAxMlxuICoqIG1vZHVsZSBjaHVua3MgPSA0XG4gKiovIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3dlYmFwaS5qc1wiIC8+XHJcblxyXG52YXIgdXJsID0gXCIvYXBpL3JvbGVzXCI7XHJcbnZhciB3ZWJhcGkgPSByZXF1aXJlKFwiLi4vd2ViYXBpLmpzXCIpLmNyZWF0ZSh1cmwpO1xyXG5cclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGxpc3Q6IGZ1bmN0aW9uIChwYWdlSW5kZXgsIHBhZ2VTaXplKSB7XHJcbiAgICAgICAgcmV0dXJuIHdlYmFwaS5HZXQoe1xyXG4gICAgICAgICAgICBwYWdlSW5kZXg6IHBhZ2VJbmRleCxcclxuICAgICAgICAgICAgcGFnZVNpemU6IHBhZ2VTaXplXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgc2F2ZTogZnVuY3Rpb24gKGFwcGxpY2F0aW9uUm9sZSkge1xyXG4gICAgICAgIHJldHVybiB3ZWJhcGkuUG9zdChhcHBsaWNhdGlvblJvbGUpO1xyXG4gICAgfVxyXG5cclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi93d3dyb290L19zcmMvanMvbW9kdWxlcy9NZW1iZXJzaGlwcy9Sb2xlU2VydmljZS5qc1xuICoqIG1vZHVsZSBpZCA9IDEzXG4gKiogbW9kdWxlIGNodW5rcyA9IDRcbiAqKi8iLCJ2YXIgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xyXG5cclxuZnVuY3Rpb24gV2VwQXBpKHVybCkge1xyXG4gICAgdGhpcy5vcHRzID0ge1xyXG4gICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIlxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLlB1dCA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImRhdGFcIj48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImZ1bmNcIj48L3BhcmFtPlxyXG5cclxuICAgICAgICB2YXIgb3B0cyA9IHRoaXMuZXh0LmNhbGwodGhpcywgXCJQVVRcIiwgZGF0YSk7XHJcblxyXG4gICAgICAgIHJldHVybiAkLmFqYXgob3B0cyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuRGVsZXRlID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiZGF0YVwiPjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiZnVuY1wiPjwvcGFyYW0+XHJcbiAgICAgICAgdmFyIG9wdHMgPSB0aGlzLmV4dC5jYWxsKHRoaXMsIFwiREVMRVRFXCIsIGRhdGEpO1xyXG4gICAgICAgIGlmIChkYXRhLmlkKSB7XHJcbiAgICAgICAgICAgIG9wdHMudXJsICs9IFwiL1wiICsgZGF0YS5pZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICQuYWpheChvcHRzKTtcclxuICAgIH07XHJcbiAgICB0aGlzLlBvc3QgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJkYXRhXCI+PC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJmdW5jXCI+PC9wYXJhbT5cclxuICAgICAgICB2YXIgb3B0cyA9IHRoaXMuZXh0LmNhbGwodGhpcywgXCJQT1NUXCIsIGRhdGEpO1xyXG4gICAgICAgIHJldHVybiAkLmFqYXgob3B0cyk7XHJcbiAgICB9O1xyXG4gICAgdGhpcy5HZXQgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJkYXRhXCI+PC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJmdW5jXCI+PC9wYXJhbT5cclxuICAgICAgICB2YXIgb3B0cyA9IHRoaXMuZXh0LmNhbGwodGhpcywgXCJHRVRcIiwgZGF0YSk7XHJcbiAgICAgICAgcmV0dXJuICQuYWpheChvcHRzKTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIHRoaXMuZXh0ID0gZnVuY3Rpb24gKG1ldGhvZCwgZGF0YSkge1xyXG5cclxuICAgICAgICB2YXIgYSA9ICQuZXh0ZW5kKHt9LCB0aGlzLm9wdHMsIHsgdHlwZTogbWV0aG9kIH0pO1xyXG5cclxuICAgICAgICBhLmRhdGEgPSBtZXRob2QgIT09IFwiR0VUXCIgPyBKU09OLnN0cmluZ2lmeShkYXRhKSA6IGRhdGE7XHJcblxyXG4gICAgICAgIHJldHVybiBhO1xyXG4gICAgfTtcclxufTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGNyZWF0ZTogZnVuY3Rpb24gKHVybCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgV2VwQXBpKHVybCk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3d3d3Jvb3QvX3NyYy9qcy9tb2R1bGVzL3dlYmFwaS5qc1xuICoqIG1vZHVsZSBpZCA9IDE0XG4gKiogbW9kdWxlIGNodW5rcyA9IDRcbiAqKi8iLCJcclxudmFyIHJvbGVTZXJ2aWNlcyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9tb2R1bGVzL01lbWJlcnNoaXBzL1JvbGVTZXJ2aWNlLmpzXCIpXHJcbmZ1bmN0aW9uIGdldEZvcm0oc3RyRWRpdG9ySWQpXHJcbntcclxuICAgIHJldHVybiAkKFwiZm9ybVwiLCQoXCIjXCIrc3RyRWRpdG9ySWQpKTtcclxufVxyXG5mdW5jdGlvbiBJbml0VmFGb3JtKHN0ckVkaXRvcklkLCBmblNhdmVkQ2FsbGJhY2spIHtcclxuICAgIHJlcXVpcmUuZW5zdXJlKFtcIi4uLy4uLy4uLy4uL21vZHVsZXMvdmFmb3JtLmpzXCJdLFxyXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHZhZm9ybSA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9tb2R1bGVzL3ZhZm9ybS5qc1wiKTtcclxuICAgICAgICAgICAgdmFyICRmb3JtPWdldEZvcm0oc3RyRWRpdG9ySWQpO1xyXG4gICAgICAgICAgICB2YWZvcm0uZm9yV2ViQXBpKCRmb3JtLFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJvbGVTZXJ2aWNlcy5zYXZlKGF2YWxvbi52bW9kZWxzW3N0ckVkaXRvcklkXS5yb2xlLiRtb2RlbCkuZG9uZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwi5L+d5a2Y5oiQ5YqfXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmblNhdmVkQ2FsbGJhY2soKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIENyZWF0ZUVkaXRvcihzdHJFZGl0b3JJZCkge1xyXG4gICAgdmFyIGVkaXRvciA9IGF2YWxvbi5kZWZpbmUoe1xyXG4gICAgICAgICRpZDogc3RyRWRpdG9ySWQsXHJcbiAgICAgICAgcm9sZTogeyBJZDogXCJcIiwgTmFtZTogXCJcIiwgUmVtYXJrOiBcIlwiIH0sXHJcbiAgICAgICAgc2F2ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBnZXRGb3JtKHN0ckVkaXRvcklkKS5zdWJtaXQoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRpdGxlOlwiXCJcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGVkaXRvcjtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBjcmVhdGU6IGZ1bmN0aW9uIChlZGl0b3JJZCwgZm5TYXZlZENhbGxiYWNrKSB7ICAgICAgIFxyXG4gICAgICAgIEluaXRWYUZvcm0oZWRpdG9ySWQsIGZuU2F2ZWRDYWxsYmFjayk7XHJcbiAgICAgICAgcmV0dXJuIENyZWF0ZUVkaXRvcihlZGl0b3JJZCk7XHJcblxyXG4gICAgfSAvL2VkaXRvcklkIOS5n+aYr2Zvcm3nmoRJZO+8jOS5n+aYr2NvbnRyb2xsZXLnmoRJZFxyXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3d3d3Jvb3QvX3NyYy9qcy92aWV3cy9hcmVhcy9tZW1iZXJzaGlwL1JvbGUvZWRpdC5qc1xuICoqIG1vZHVsZSBpZCA9IDE1XG4gKiogbW9kdWxlIGNodW5rcyA9IDRcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9