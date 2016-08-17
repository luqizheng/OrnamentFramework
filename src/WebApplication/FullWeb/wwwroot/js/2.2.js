webpackJsonp([2],{

/***/ 6:
/***/ function(module, exports) {

	module.exports = avalon;

/***/ },

/***/ 7:
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../../../../../lib/jquery-validation-unobtrusive/jquery.validate.unobtrusive.min.js" />
	/// <reference path="../../../../../../lib/jquery-validation-unobtrusive/jquery.validate.unobtrusive.js" />
	/// <reference path="../../../../../../lib/jquery-validation/dist/jquery.validate.min.js" />
	/// <reference path="../../../../../../lib/jquery-validation/dist/jquery.validate.js" />
	/// <reference path="../../../../modules/vaform.js" />
	var avalon = __webpack_require__(6);
	
	var vm = {
	    EmailConfirmed: $("#EmailConfirmed").val() == 'True',
	    PhoneNumberConfirmed: $("#PhoneNumberConfirmed").val() == 'True'
	
	}
	
	var model = avalon.define({
	    $id: "editUser",
	    vm: vm,
	    changeEmailState: function () {
	        model.vm.EmailConfirmed = !model.vm.EmailConfirmed;
	    },
	    changePhoneState: function () {
	        model.vm.PhoneNumberConfirmed = !model.vm.PhoneNumberConfirmed;
	    }
	});
	
	
	function initVaForm() {
	    __webpack_require__.e/* nsure */(3, function () {
	            var vaform = __webpack_require__(8);
	            vaform.for("#user-edit-form",
	                function () {
	                    alert("保存成功");
	                });
	        });
	}
	
	
	
	module.exports = {
	    onEntry: function () {
	        initVaForm();
	        avalon.scan($("#content")[0]);
	    },
	    onLeave: function () {
	        try {
	            model = null;
	            delete avalon.vmodels["editUser"];
	        } catch (e) {
	            console.warn(e);
	        }
	    }
	}

/***/ }

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhdmFsb25cIj9hOWEzIiwid2VicGFjazovLy8uL3d3d3Jvb3QvX3NyYy9qcy92aWV3cy9hcmVhcy9tZW1iZXJzaGlwL3VzZXIvZWRpdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHlCOzs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEVBQUM7OztBQUdEO0FBQ0EseUNBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQixVQUFTO0FBQ1Q7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxFIiwiZmlsZSI6IjIuMi5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gYXZhbG9uO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJhdmFsb25cIlxuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMSAyXG4gKiovIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uLy4uLy4uLy4uL2xpYi9qcXVlcnktdmFsaWRhdGlvbi11bm9idHJ1c2l2ZS9qcXVlcnkudmFsaWRhdGUudW5vYnRydXNpdmUubWluLmpzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uLy4uLy4uLy4uL2xpYi9qcXVlcnktdmFsaWRhdGlvbi11bm9idHJ1c2l2ZS9qcXVlcnkudmFsaWRhdGUudW5vYnRydXNpdmUuanNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vLi4vLi4vLi4vbGliL2pxdWVyeS12YWxpZGF0aW9uL2Rpc3QvanF1ZXJ5LnZhbGlkYXRlLm1pbi5qc1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi8uLi8uLi8uLi9saWIvanF1ZXJ5LXZhbGlkYXRpb24vZGlzdC9qcXVlcnkudmFsaWRhdGUuanNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vLi4vbW9kdWxlcy92YWZvcm0uanNcIiAvPlxyXG52YXIgYXZhbG9uID0gcmVxdWlyZSgnYXZhbG9uJyk7XHJcblxyXG52YXIgdm0gPSB7XHJcbiAgICBFbWFpbENvbmZpcm1lZDogJChcIiNFbWFpbENvbmZpcm1lZFwiKS52YWwoKSA9PSAnVHJ1ZScsXHJcbiAgICBQaG9uZU51bWJlckNvbmZpcm1lZDogJChcIiNQaG9uZU51bWJlckNvbmZpcm1lZFwiKS52YWwoKSA9PSAnVHJ1ZSdcclxuXHJcbn1cclxuXHJcbnZhciBtb2RlbCA9IGF2YWxvbi5kZWZpbmUoe1xyXG4gICAgJGlkOiBcImVkaXRVc2VyXCIsXHJcbiAgICB2bTogdm0sXHJcbiAgICBjaGFuZ2VFbWFpbFN0YXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbW9kZWwudm0uRW1haWxDb25maXJtZWQgPSAhbW9kZWwudm0uRW1haWxDb25maXJtZWQ7XHJcbiAgICB9LFxyXG4gICAgY2hhbmdlUGhvbmVTdGF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIG1vZGVsLnZtLlBob25lTnVtYmVyQ29uZmlybWVkID0gIW1vZGVsLnZtLlBob25lTnVtYmVyQ29uZmlybWVkO1xyXG4gICAgfVxyXG59KTtcclxuXHJcblxyXG5mdW5jdGlvbiBpbml0VmFGb3JtKCkge1xyXG4gICAgcmVxdWlyZS5lbnN1cmUoW1wiLi4vLi4vLi4vLi4vbW9kdWxlcy92YWZvcm0uanNcIl0sXHJcbiAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgdmFmb3JtID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uL21vZHVsZXMvdmFmb3JtLmpzXCIpO1xyXG4gICAgICAgICAgICB2YWZvcm0uZm9yKFwiI3VzZXItZWRpdC1mb3JtXCIsXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCLkv53lrZjmiJDlip9cIik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxufVxyXG5cclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIG9uRW50cnk6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpbml0VmFGb3JtKCk7XHJcbiAgICAgICAgYXZhbG9uLnNjYW4oJChcIiNjb250ZW50XCIpWzBdKTtcclxuICAgIH0sXHJcbiAgICBvbkxlYXZlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbW9kZWwgPSBudWxsO1xyXG4gICAgICAgICAgICBkZWxldGUgYXZhbG9uLnZtb2RlbHNbXCJlZGl0VXNlclwiXTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vd3d3cm9vdC9fc3JjL2pzL3ZpZXdzL2FyZWFzL21lbWJlcnNoaXAvdXNlci9lZGl0LmpzXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAyXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==