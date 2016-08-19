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
	            $editorDialog.modal('show');
	        },
	        create: function () {
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
	        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi93d3dyb290L19zcmMvanMvdmlld3MvYXJlYXMvbWVtYmVyc2hpcC9Sb2xlL2luZGV4LmpzIiwid2VicGFjazovLy8uL3d3d3Jvb3QvX3NyYy9qcy9tb2R1bGVzL01lbWJlcnNoaXBzL1JvbGVTZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3d3d3Jvb3QvX3NyYy9qcy9tb2R1bGVzL3dlYmFwaS5qcyIsIndlYnBhY2s6Ly8vLi93d3dyb290L19zcmMvanMvdmlld3MvYXJlYXMvbWVtYmVyc2hpcC9Sb2xlL2VkaXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBO0FBQ0EsbUJBQWtCO0FBQ2xCLG1CQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLDRCQUEyQjtBQUMzQjtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUEsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7Ozs7QUFJVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7OztBQ2xEQTs7QUFFQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVCxNQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBLEU7Ozs7Ozs7QUNsQkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0NBQXVDO0FBQ3ZDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUEsNEJBQTJCLGNBQWMsZUFBZTs7QUFFeEQ7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0RBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQjs7QUFFckIsa0JBQWlCO0FBQ2pCLFVBQVM7QUFDVDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsK0JBQStCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0EsbUQ7QUFDQTtBQUNBOztBQUVBLE1BQUs7QUFDTCxFIiwiZmlsZSI6IjQuNC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxudmFyIHJvbGVTZXJ2aWNlcyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9tb2R1bGVzL01lbWJlcnNoaXBzL1JvbGVTZXJ2aWNlLmpzXCIpXHJcbnZhciBlZGl0b3IgPSBudWxsOyAvL3JvbGVFZGl0b3I7XHJcbnZhciAkZWRpdG9yRGlhbG9nOyAvL2RpYWxvZyBvZiBlZGl0b3JcclxuZnVuY3Rpb24gY3JlYXRlTGlzdChsaXN0SWQpIHtcclxuICAgIHZhciBtb2RlbCA9IGF2YWxvbi5kZWZpbmUoe1xyXG4gICAgICAgICRpZDogbGlzdElkLFxyXG4gICAgICAgIHJvbGVzOiBbXSxcclxuICAgICAgICBlZGl0OiBmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgICAgICAgZWRpdG9yLnJvbGUgPSBlbDtcclxuICAgICAgICAgICAgJGVkaXRvckRpYWxvZy5tb2RhbCgnc2hvdycpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY3JlYXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGVkaXRvci5yb2xlID0geyBJZDogXCJcIiwgTmFtZTogXCJcIiwgUmVtYXJrOiBcIlwiIH1cclxuICAgICAgICAgICAgJGVkaXRvckRpYWxvZy5tb2RhbCgnc2hvdycpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJvbGVTZXJ2aWNlcy5saXN0KDAsIDMwKVxyXG4gICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgbW9kZWwucm9sZXMgPSByZXN1bHQ7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICRlZGl0b3JEaWFsb2cgPSAkKCcjcm9sZS1lZGl0b3ItZGlhbG9nJylcclxuICAgICAgICAubW9kYWwoe1xyXG4gICAgICAgICAgICBrZXlib2FyZDogZmFsc2UsXHJcbiAgICAgICAgICAgIHNob3c6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbn1cclxuXHJcbnZhciBsaXN0SWQgPSBcInJvbGVJbmRleFwiO1xyXG52YXIgZWRpdG9ySWQgPSBcInJvbGVFZGl0b3JcIjtcclxudmFyIFJvbGVFZGl0b3IgPSByZXF1aXJlKFwiLi9lZGl0LmpzXCIpO1xyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGxvYWQ6IGZ1bmN0aW9uIChsb2FkQ29udGVudCkge1xyXG4gICAgICAgIGNyZWF0ZUxpc3QobGlzdElkKTtcclxuICAgICAgICBlZGl0b3IgPSBSb2xlRWRpdG9yLmNyZWF0ZShlZGl0b3JJZCxmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAkZWRpdG9yRGlhbG9nLm1vZGFsKCdjbG9zZScpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYXZhbG9uLnNjYW4obG9hZENvbnRlbnQpXHJcbiAgICB9LFxyXG4gICAgdW5sb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZGVsZXRlIGF2YWxvbi52bW9kZWxzW2xpc3RJZF07XHJcbiAgICAgICAgZGVsZXRlIGF2YWxvbi52bW9kZWxzW2VkaXRvcklkXTtcclxuICAgIH1cclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi93d3dyb290L19zcmMvanMvdmlld3MvYXJlYXMvbWVtYmVyc2hpcC9Sb2xlL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gNFxuICoqLyIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi93ZWJhcGkuanNcIiAvPlxyXG5cclxudmFyIHVybCA9IFwiL2FwaS9yb2xlc1wiO1xyXG52YXIgd2ViYXBpID0gcmVxdWlyZShcIi4uL3dlYmFwaS5qc1wiKS5jcmVhdGUodXJsKTtcclxuXHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBsaXN0OiBmdW5jdGlvbiAocGFnZUluZGV4LCBwYWdlU2l6ZSkge1xyXG4gICAgICAgIHJldHVybiB3ZWJhcGkuR2V0KHtcclxuICAgICAgICAgICAgcGFnZUluZGV4OiBwYWdlSW5kZXgsXHJcbiAgICAgICAgICAgIHBhZ2VTaXplOiBwYWdlU2l6ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIHNhdmU6IGZ1bmN0aW9uIChhcHBsaWNhdGlvblJvbGUpIHtcclxuICAgICAgICByZXR1cm4gd2ViYXBpLlBvc3QoYXBwbGljYXRpb25Sb2xlKTtcclxuICAgIH1cclxuXHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vd3d3cm9vdC9fc3JjL2pzL21vZHVsZXMvTWVtYmVyc2hpcHMvUm9sZVNlcnZpY2UuanNcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSA0XG4gKiovIiwidmFyICQgPSByZXF1aXJlKCdqcXVlcnknKTtcclxuXHJcbmZ1bmN0aW9uIFdlcEFwaSh1cmwpIHtcclxuICAgIHRoaXMub3B0cyA9IHtcclxuICAgICAgICB1cmw6IHVybCxcclxuICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCJcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5QdXQgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJkYXRhXCI+PC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJmdW5jXCI+PC9wYXJhbT5cclxuXHJcbiAgICAgICAgdmFyIG9wdHMgPSB0aGlzLmV4dC5jYWxsKHRoaXMsIFwiUFVUXCIsIGRhdGEpO1xyXG5cclxuICAgICAgICByZXR1cm4gJC5hamF4KG9wdHMpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLkRlbGV0ZSA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImRhdGFcIj48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImZ1bmNcIj48L3BhcmFtPlxyXG4gICAgICAgIHZhciBvcHRzID0gdGhpcy5leHQuY2FsbCh0aGlzLCBcIkRFTEVURVwiLCBkYXRhKTtcclxuICAgICAgICBpZiAoZGF0YS5pZCkge1xyXG4gICAgICAgICAgICBvcHRzLnVybCArPSBcIi9cIiArIGRhdGEuaWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAkLmFqYXgob3B0cyk7XHJcbiAgICB9O1xyXG4gICAgdGhpcy5Qb3N0ID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiZGF0YVwiPjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiZnVuY1wiPjwvcGFyYW0+XHJcbiAgICAgICAgdmFyIG9wdHMgPSB0aGlzLmV4dC5jYWxsKHRoaXMsIFwiUE9TVFwiLCBkYXRhKTtcclxuICAgICAgICByZXR1cm4gJC5hamF4KG9wdHMpO1xyXG4gICAgfTtcclxuICAgIHRoaXMuR2V0ID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiZGF0YVwiPjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiZnVuY1wiPjwvcGFyYW0+XHJcbiAgICAgICAgdmFyIG9wdHMgPSB0aGlzLmV4dC5jYWxsKHRoaXMsIFwiR0VUXCIsIGRhdGEpO1xyXG4gICAgICAgIHJldHVybiAkLmFqYXgob3B0cyk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICB0aGlzLmV4dCA9IGZ1bmN0aW9uIChtZXRob2QsIGRhdGEpIHtcclxuXHJcbiAgICAgICAgdmFyIGEgPSAkLmV4dGVuZCh7fSwgdGhpcy5vcHRzLCB7IHR5cGU6IG1ldGhvZCB9KTtcclxuXHJcbiAgICAgICAgYS5kYXRhID0gbWV0aG9kICE9PSBcIkdFVFwiID8gSlNPTi5zdHJpbmdpZnkoZGF0YSkgOiBkYXRhO1xyXG5cclxuICAgICAgICByZXR1cm4gYTtcclxuICAgIH07XHJcbn07XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBjcmVhdGU6IGZ1bmN0aW9uICh1cmwpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFdlcEFwaSh1cmwpO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi93d3dyb290L19zcmMvanMvbW9kdWxlcy93ZWJhcGkuanNcbiAqKiBtb2R1bGUgaWQgPSAxNFxuICoqIG1vZHVsZSBjaHVua3MgPSA0XG4gKiovIiwiXHJcbnZhciByb2xlU2VydmljZXMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vbW9kdWxlcy9NZW1iZXJzaGlwcy9Sb2xlU2VydmljZS5qc1wiKVxyXG5mdW5jdGlvbiBnZXRGb3JtKHN0ckVkaXRvcklkKVxyXG57XHJcbiAgICByZXR1cm4gJChcImZvcm1cIiwkKFwiI1wiK3N0ckVkaXRvcklkKSk7XHJcbn1cclxuZnVuY3Rpb24gSW5pdFZhRm9ybShzdHJFZGl0b3JJZCwgZm5TYXZlZENhbGxiYWNrKSB7XHJcbiAgICByZXF1aXJlLmVuc3VyZShbXCIuLi8uLi8uLi8uLi9tb2R1bGVzL3ZhZm9ybS5qc1wiXSxcclxuICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciB2YWZvcm0gPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vbW9kdWxlcy92YWZvcm0uanNcIik7XHJcbiAgICAgICAgICAgIHZhciAkZm9ybT1nZXRGb3JtKHN0ckVkaXRvcklkKTtcclxuICAgICAgICAgICAgdmFmb3JtLmZvcldlYkFwaSgkZm9ybSxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICByb2xlU2VydmljZXMuc2F2ZShhdmFsb24udm1vZGVsc1tzdHJFZGl0b3JJZF0ucm9sZS4kbW9kZWwpLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIuS/neWtmOaIkOWKn1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm5TYXZlZENhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBDcmVhdGVFZGl0b3Ioc3RyRWRpdG9ySWQpIHtcclxuICAgIHZhciBlZGl0b3IgPSBhdmFsb24uZGVmaW5lKHtcclxuICAgICAgICAkaWQ6IHN0ckVkaXRvcklkLFxyXG4gICAgICAgIHJvbGU6IHsgSWQ6IFwiXCIsIE5hbWU6IFwiXCIsIFJlbWFyazogXCJcIiB9LFxyXG4gICAgICAgIHNhdmU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZ2V0Rm9ybShzdHJFZGl0b3JJZCkuc3VibWl0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gZWRpdG9yO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGNyZWF0ZTogZnVuY3Rpb24gKGVkaXRvcklkLCBmblNhdmVkQ2FsbGJhY2spIHsgICAgICAgXHJcbiAgICAgICAgSW5pdFZhRm9ybShlZGl0b3JJZCwgZm5TYXZlZENhbGxiYWNrKTtcclxuICAgICAgICByZXR1cm4gQ3JlYXRlRWRpdG9yKGVkaXRvcklkKTtcclxuXHJcbiAgICB9IC8vZWRpdG9ySWQg5Lmf5pivZm9ybeeahElk77yM5Lmf5pivY29udHJvbGxlcueahElkXHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vd3d3cm9vdC9fc3JjL2pzL3ZpZXdzL2FyZWFzL21lbWJlcnNoaXAvUm9sZS9lZGl0LmpzXG4gKiogbW9kdWxlIGlkID0gMTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gNFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=