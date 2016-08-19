webpackJsonp([4],{

/***/ 12:
/***/ function(module, exports, __webpack_require__) {

	
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
	
	    var $editorDialog = $('#role-editor-dialog')
	        .modal({
	            keyboard: false,
	            show: false
	        });
	
	
	  
	}
	
	var listId="roleIndex";
	var editorId="roleEditor";
	var RoleEditor=__webpack_require__(13);
	module.exports = {
	    load: function (loadContent) {
	        createList(listId);
	        RoleEditor.create(editorId);
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

	
	
	function InitVaForm(roleEditorId) {
	    __webpack_require__.e/* nsure */(1/* duplicate */, function () {
	            var vaform = __webpack_require__(7);
	            vaform.for($("#"+roleEditorId+" form",
	                function () {
	                    alert("保存成功");
	                }));
	        });
	}
	
	
	function CreateEditor(strEditorId)
	{
	    var editor = avalon.define({
		    $id: 'roleEditor',
		    role: { Id: "", Name: "", Remark: "" },
		    save: function () {
		        $("form", $editorDialog).submit();
		    },
		    cancel: function () {
		
		    }
		});
	    return editor;
	}
	
	module.exports={
	    create:function(editorId){
			InitVaForm(editorId);
			return CreateEditor(editorId);
	
		} //editorId 也是form的Id，也是controller的Id
	}

/***/ }

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi93d3dyb290L19zcmMvanMvdmlld3MvYXJlYXMvbWVtYmVyc2hpcC9Sb2xlL2luZGV4LmpzIiwid2VicGFjazovLy8uL3d3d3Jvb3QvX3NyYy9qcy92aWV3cy9hcmVhcy9tZW1iZXJzaGlwL1JvbGUvZWRpdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLDRCQUEyQjtBQUMzQjtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUEsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7Ozs7QUFJVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7O0FDMUNBO0FBQ0Esd0RBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQixVQUFTO0FBQ1Q7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBWSwrQkFBK0I7QUFDM0M7QUFDQTtBQUNBLE9BQU07QUFDTjs7QUFFQTtBQUNBLEdBQUU7QUFDRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUU7QUFDRixFIiwiZmlsZSI6IjQuNC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5mdW5jdGlvbiBjcmVhdGVMaXN0KGxpc3RJZCkge1xyXG4gICAgdmFyIG1vZGVsID0gYXZhbG9uLmRlZmluZSh7XHJcbiAgICAgICAgJGlkOiBsaXN0SWQsXHJcbiAgICAgICAgcm9sZXM6IFtdLFxyXG4gICAgICAgIGVkaXQ6IGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgICAgICBlZGl0b3Iucm9sZSA9IGVsO1xyXG4gICAgICAgICAgICAkZWRpdG9yRGlhbG9nLm1vZGFsKCdzaG93Jyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZWRpdG9yLnJvbGUgPSB7IElkOiBcIlwiLCBOYW1lOiBcIlwiLCBSZW1hcms6IFwiXCIgfVxyXG4gICAgICAgICAgICAkZWRpdG9yRGlhbG9nLm1vZGFsKCdzaG93Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgcm9sZVNlcnZpY2VzLmxpc3QoMCwgMzApXHJcbiAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBtb2RlbC5yb2xlcyA9IHJlc3VsdDtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgdmFyICRlZGl0b3JEaWFsb2cgPSAkKCcjcm9sZS1lZGl0b3ItZGlhbG9nJylcclxuICAgICAgICAubW9kYWwoe1xyXG4gICAgICAgICAgICBrZXlib2FyZDogZmFsc2UsXHJcbiAgICAgICAgICAgIHNob3c6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICBcclxufVxyXG5cclxudmFyIGxpc3RJZD1cInJvbGVJbmRleFwiO1xyXG52YXIgZWRpdG9ySWQ9XCJyb2xlRWRpdG9yXCI7XHJcbnZhciBSb2xlRWRpdG9yPXJlcXVpcmUoXCIuL2VkaXQuanNcIik7XHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgbG9hZDogZnVuY3Rpb24gKGxvYWRDb250ZW50KSB7XHJcbiAgICAgICAgY3JlYXRlTGlzdChsaXN0SWQpO1xyXG4gICAgICAgIFJvbGVFZGl0b3IuY3JlYXRlKGVkaXRvcklkKTtcclxuICAgICAgICBhdmFsb24uc2Nhbihsb2FkQ29udGVudClcclxuICAgIH0sXHJcbiAgICB1bmxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBkZWxldGUgYXZhbG9uLnZtb2RlbHNbbGlzdElkXTtcclxuICAgICAgICBkZWxldGUgYXZhbG9uLnZtb2RlbHNbZWRpdG9ySWRdO1xyXG4gICAgfVxyXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3d3d3Jvb3QvX3NyYy9qcy92aWV3cy9hcmVhcy9tZW1iZXJzaGlwL1JvbGUvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAxMlxuICoqIG1vZHVsZSBjaHVua3MgPSA0XG4gKiovIiwiXHJcblxyXG5mdW5jdGlvbiBJbml0VmFGb3JtKHJvbGVFZGl0b3JJZCkge1xyXG4gICAgcmVxdWlyZS5lbnN1cmUoW1wiLi4vLi4vLi4vLi4vbW9kdWxlcy92YWZvcm0uanNcIl0sXHJcbiAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgdmFmb3JtID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uL21vZHVsZXMvdmFmb3JtLmpzXCIpO1xyXG4gICAgICAgICAgICB2YWZvcm0uZm9yKCQoXCIjXCIrcm9sZUVkaXRvcklkK1wiIGZvcm1cIixcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChcIuS/neWtmOaIkOWKn1wiKTtcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9KTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIENyZWF0ZUVkaXRvcihzdHJFZGl0b3JJZClcclxue1xyXG4gICAgdmFyIGVkaXRvciA9IGF2YWxvbi5kZWZpbmUoe1xyXG5cdCAgICAkaWQ6ICdyb2xlRWRpdG9yJyxcclxuXHQgICAgcm9sZTogeyBJZDogXCJcIiwgTmFtZTogXCJcIiwgUmVtYXJrOiBcIlwiIH0sXHJcblx0ICAgIHNhdmU6IGZ1bmN0aW9uICgpIHtcclxuXHQgICAgICAgICQoXCJmb3JtXCIsICRlZGl0b3JEaWFsb2cpLnN1Ym1pdCgpO1xyXG5cdCAgICB9LFxyXG5cdCAgICBjYW5jZWw6IGZ1bmN0aW9uICgpIHtcclxuXHRcclxuXHQgICAgfVxyXG5cdH0pO1xyXG4gICAgcmV0dXJuIGVkaXRvcjtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHM9e1xyXG4gICAgY3JlYXRlOmZ1bmN0aW9uKGVkaXRvcklkKXtcclxuXHRcdEluaXRWYUZvcm0oZWRpdG9ySWQpO1xyXG5cdFx0cmV0dXJuIENyZWF0ZUVkaXRvcihlZGl0b3JJZCk7XHJcblxyXG5cdH0gLy9lZGl0b3JJZCDkuZ/mmK9mb3Jt55qESWTvvIzkuZ/mmK9jb250cm9sbGVy55qESWRcclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi93d3dyb290L19zcmMvanMvdmlld3MvYXJlYXMvbWVtYmVyc2hpcC9Sb2xlL2VkaXQuanNcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSA0XG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==