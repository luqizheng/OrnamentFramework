webpackJsonp([4],{

/***/ 12:
/***/ function(module, exports, __webpack_require__) {

	var avalon=__webpack_require__(6);
	var roleServices = __webpack_require__(13);
	var editor = null; //roleEditor;
	var $editorDialog; //dialog of editor
	function createList(listId) {
	    var model = avalon.define({
	        $id: listId,
	        roles: [],
	        edit: function (el) {
	            editor.role = el;
	            editor.title="編輯角色";
	            $editorDialog.modal('show');
	        },
	        create: function () {
	            editor.title="新增角色";
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
	            $editorDialog.modal('close');
	        });
	        avalon.scan(loadContent);
	    },
	    unload: function () {
	        delete avalon.vmodels[listId];
	        delete avalon.vmodels[editorId];
	    }
	};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi93d3dyb290L19zcmMvanMvdmlld3MvYXJlYXMvbWVtYmVyc2hpcC9Sb2xlL2luZGV4LmpzIiwid2VicGFjazovLy8uL3d3d3Jvb3QvX3NyYy9qcy9tb2R1bGVzL21lbWJlcnNoaXAvUm9sZVNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vd3d3cm9vdC9fc3JjL2pzL21vZHVsZXMvd2ViYXBpLmpzIiwid2VicGFjazovLy8uL3d3d3Jvb3QvX3NyYy9qcy92aWV3cy9hcmVhcy9tZW1iZXJzaGlwL1JvbGUvZWRpdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQSxtQkFBa0I7QUFDbEIsbUJBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLDRCQUEyQjtBQUMzQjtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUEsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7Ozs7QUFJVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRzs7Ozs7OztBQ25EQTs7QUFFQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVCxNQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBLEU7Ozs7Ozs7QUNsQkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0NBQXVDO0FBQ3ZDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUEsNEJBQTJCLGNBQWMsZUFBZTs7QUFFeEQ7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUNsRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdEQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUI7O0FBRXJCLGtCQUFpQjtBQUNqQixVQUFTO0FBQ1Q7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLCtCQUErQjtBQUM5QztBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsTUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQSxtRDtBQUNBO0FBQ0E7O0FBRUEsTUFBSztBQUNMLEUiLCJmaWxlIjoiNC40LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGF2YWxvbj1yZXF1aXJlKCdhdmFsb24nKTtcclxudmFyIHJvbGVTZXJ2aWNlcyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9tb2R1bGVzL21lbWJlcnNoaXAvUm9sZVNlcnZpY2UuanNcIik7XHJcbnZhciBlZGl0b3IgPSBudWxsOyAvL3JvbGVFZGl0b3I7XHJcbnZhciAkZWRpdG9yRGlhbG9nOyAvL2RpYWxvZyBvZiBlZGl0b3JcclxuZnVuY3Rpb24gY3JlYXRlTGlzdChsaXN0SWQpIHtcclxuICAgIHZhciBtb2RlbCA9IGF2YWxvbi5kZWZpbmUoe1xyXG4gICAgICAgICRpZDogbGlzdElkLFxyXG4gICAgICAgIHJvbGVzOiBbXSxcclxuICAgICAgICBlZGl0OiBmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgICAgICAgZWRpdG9yLnJvbGUgPSBlbDtcclxuICAgICAgICAgICAgZWRpdG9yLnRpdGxlPVwi57eo6Lyv6KeS6ImyXCI7XHJcbiAgICAgICAgICAgICRlZGl0b3JEaWFsb2cubW9kYWwoJ3Nob3cnKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNyZWF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBlZGl0b3IudGl0bGU9XCLmlrDlop7op5LoibJcIjtcclxuICAgICAgICAgICAgZWRpdG9yLnJvbGUgPSB7IElkOiBcIlwiLCBOYW1lOiBcIlwiLCBSZW1hcms6IFwiXCIgfVxyXG4gICAgICAgICAgICAkZWRpdG9yRGlhbG9nLm1vZGFsKCdzaG93Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgcm9sZVNlcnZpY2VzLmxpc3QoMCwgMzApXHJcbiAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBtb2RlbC5yb2xlcyA9IHJlc3VsdDtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gJGVkaXRvckRpYWxvZyA9ICQoJyNyb2xlLWVkaXRvci1kaWFsb2cnKVxyXG4gICAgICAgIC5tb2RhbCh7XHJcbiAgICAgICAgICAgIGtleWJvYXJkOiBmYWxzZSxcclxuICAgICAgICAgICAgc2hvdzogZmFsc2VcclxuICAgICAgICB9KTtcclxuXHJcblxyXG5cclxufVxyXG5cclxudmFyIGxpc3RJZCA9IFwicm9sZUluZGV4XCI7XHJcbnZhciBlZGl0b3JJZCA9IFwicm9sZUVkaXRvclwiO1xyXG52YXIgUm9sZUVkaXRvciA9IHJlcXVpcmUoXCIuL2VkaXQuanNcIik7XHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgbG9hZDogZnVuY3Rpb24gKGxvYWRDb250ZW50KSB7XHJcbiAgICAgICAgY3JlYXRlTGlzdChsaXN0SWQpO1xyXG4gICAgICAgIGVkaXRvciA9IFJvbGVFZGl0b3IuY3JlYXRlKGVkaXRvcklkLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICRlZGl0b3JEaWFsb2cubW9kYWwoJ2Nsb3NlJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYXZhbG9uLnNjYW4obG9hZENvbnRlbnQpO1xyXG4gICAgfSxcclxuICAgIHVubG9hZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGRlbGV0ZSBhdmFsb24udm1vZGVsc1tsaXN0SWRdO1xyXG4gICAgICAgIGRlbGV0ZSBhdmFsb24udm1vZGVsc1tlZGl0b3JJZF07XHJcbiAgICB9XHJcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3d3d3Jvb3QvX3NyYy9qcy92aWV3cy9hcmVhcy9tZW1iZXJzaGlwL1JvbGUvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAxMlxuICoqIG1vZHVsZSBjaHVua3MgPSA0XG4gKiovIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3dlYmFwaS5qc1wiIC8+XHJcblxyXG52YXIgdXJsID0gXCIvYXBpL3JvbGVzXCI7XHJcbnZhciB3ZWJhcGkgPSByZXF1aXJlKFwiLi4vd2ViYXBpLmpzXCIpLmNyZWF0ZSh1cmwpO1xyXG5cclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGxpc3Q6IGZ1bmN0aW9uIChwYWdlSW5kZXgsIHBhZ2VTaXplKSB7XHJcbiAgICAgICAgcmV0dXJuIHdlYmFwaS5HZXQoe1xyXG4gICAgICAgICAgICBwYWdlSW5kZXg6IHBhZ2VJbmRleCxcclxuICAgICAgICAgICAgcGFnZVNpemU6IHBhZ2VTaXplXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgc2F2ZTogZnVuY3Rpb24gKGFwcGxpY2F0aW9uUm9sZSkge1xyXG4gICAgICAgIHJldHVybiB3ZWJhcGkuUG9zdChhcHBsaWNhdGlvblJvbGUpO1xyXG4gICAgfVxyXG5cclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi93d3dyb290L19zcmMvanMvbW9kdWxlcy9tZW1iZXJzaGlwL1JvbGVTZXJ2aWNlLmpzXG4gKiogbW9kdWxlIGlkID0gMTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gNFxuICoqLyIsInZhciAkID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XHJcblxyXG5mdW5jdGlvbiBXZXBBcGkodXJsKSB7XHJcbiAgICB0aGlzLm9wdHMgPSB7XHJcbiAgICAgICAgdXJsOiB1cmwsXHJcbiAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuUHV0ID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiZGF0YVwiPjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiZnVuY1wiPjwvcGFyYW0+XHJcblxyXG4gICAgICAgIHZhciBvcHRzID0gdGhpcy5leHQuY2FsbCh0aGlzLCBcIlBVVFwiLCBkYXRhKTtcclxuXHJcbiAgICAgICAgcmV0dXJuICQuYWpheChvcHRzKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5EZWxldGUgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJkYXRhXCI+PC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJmdW5jXCI+PC9wYXJhbT5cclxuICAgICAgICB2YXIgb3B0cyA9IHRoaXMuZXh0LmNhbGwodGhpcywgXCJERUxFVEVcIiwgZGF0YSk7XHJcbiAgICAgICAgaWYgKGRhdGEuaWQpIHtcclxuICAgICAgICAgICAgb3B0cy51cmwgKz0gXCIvXCIgKyBkYXRhLmlkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gJC5hamF4KG9wdHMpO1xyXG4gICAgfTtcclxuICAgIHRoaXMuUG9zdCA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImRhdGFcIj48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImZ1bmNcIj48L3BhcmFtPlxyXG4gICAgICAgIHZhciBvcHRzID0gdGhpcy5leHQuY2FsbCh0aGlzLCBcIlBPU1RcIiwgZGF0YSk7XHJcbiAgICAgICAgcmV0dXJuICQuYWpheChvcHRzKTtcclxuICAgIH07XHJcbiAgICB0aGlzLkdldCA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImRhdGFcIj48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImZ1bmNcIj48L3BhcmFtPlxyXG4gICAgICAgIHZhciBvcHRzID0gdGhpcy5leHQuY2FsbCh0aGlzLCBcIkdFVFwiLCBkYXRhKTtcclxuICAgICAgICByZXR1cm4gJC5hamF4KG9wdHMpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgdGhpcy5leHQgPSBmdW5jdGlvbiAobWV0aG9kLCBkYXRhKSB7XHJcblxyXG4gICAgICAgIHZhciBhID0gJC5leHRlbmQoe30sIHRoaXMub3B0cywgeyB0eXBlOiBtZXRob2QgfSk7XHJcblxyXG4gICAgICAgIGEuZGF0YSA9IG1ldGhvZCAhPT0gXCJHRVRcIiA/IEpTT04uc3RyaW5naWZ5KGRhdGEpIDogZGF0YTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGE7XHJcbiAgICB9O1xyXG59O1xyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgY3JlYXRlOiBmdW5jdGlvbiAodXJsKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBXZXBBcGkodXJsKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vd3d3cm9vdC9fc3JjL2pzL21vZHVsZXMvd2ViYXBpLmpzXG4gKiogbW9kdWxlIGlkID0gMTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gNCA1XG4gKiovIiwiXHJcbnZhciByb2xlU2VydmljZXMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vbW9kdWxlcy9tZW1iZXJzaGlwL1JvbGVTZXJ2aWNlLmpzXCIpXHJcblxyXG5mdW5jdGlvbiBnZXRGb3JtKHN0ckVkaXRvcklkKVxyXG57XHJcbiAgICByZXR1cm4gJChcImZvcm1cIiwkKFwiI1wiK3N0ckVkaXRvcklkKSk7XHJcbn1cclxuZnVuY3Rpb24gSW5pdFZhRm9ybShzdHJFZGl0b3JJZCwgZm5TYXZlZENhbGxiYWNrKSB7XHJcbiAgICByZXF1aXJlLmVuc3VyZShbXCIuLi8uLi8uLi8uLi9tb2R1bGVzL3ZhZm9ybS5qc1wiXSxcclxuICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciB2YWZvcm0gPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vbW9kdWxlcy92YWZvcm0uanNcIik7XHJcbiAgICAgICAgICAgIHZhciAkZm9ybT1nZXRGb3JtKHN0ckVkaXRvcklkKTtcclxuICAgICAgICAgICAgdmFmb3JtLmZvcldlYkFwaSgkZm9ybSxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICByb2xlU2VydmljZXMuc2F2ZShhdmFsb24udm1vZGVsc1tzdHJFZGl0b3JJZF0ucm9sZS4kbW9kZWwpLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIuS/neWtmOaIkOWKn1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm5TYXZlZENhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBDcmVhdGVFZGl0b3Ioc3RyRWRpdG9ySWQpIHtcclxuICAgIHZhciBlZGl0b3IgPSBhdmFsb24uZGVmaW5lKHtcclxuICAgICAgICAkaWQ6IHN0ckVkaXRvcklkLFxyXG4gICAgICAgIHJvbGU6IHsgSWQ6IFwiXCIsIE5hbWU6IFwiXCIsIFJlbWFyazogXCJcIiB9LFxyXG4gICAgICAgIHNhdmU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZ2V0Rm9ybShzdHJFZGl0b3JJZCkuc3VibWl0KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0aXRsZTpcIlwiXHJcbiAgICB9KTtcclxuICAgIHJldHVybiBlZGl0b3I7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgY3JlYXRlOiBmdW5jdGlvbiAoZWRpdG9ySWQsIGZuU2F2ZWRDYWxsYmFjaykgeyAgICAgICBcclxuICAgICAgICBJbml0VmFGb3JtKGVkaXRvcklkLCBmblNhdmVkQ2FsbGJhY2spO1xyXG4gICAgICAgIHJldHVybiBDcmVhdGVFZGl0b3IoZWRpdG9ySWQpO1xyXG5cclxuICAgIH0gLy9lZGl0b3JJZCDkuZ/mmK9mb3Jt55qESWTvvIzkuZ/mmK9jb250cm9sbGVy55qESWRcclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi93d3dyb290L19zcmMvanMvdmlld3MvYXJlYXMvbWVtYmVyc2hpcC9Sb2xlL2VkaXQuanNcbiAqKiBtb2R1bGUgaWQgPSAxNVxuICoqIG1vZHVsZSBjaHVua3MgPSA0XG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==