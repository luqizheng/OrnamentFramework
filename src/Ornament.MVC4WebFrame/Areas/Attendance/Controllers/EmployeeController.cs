using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Qi.Attendance;
using Qi.Attendance.Dao;

namespace Ornament.MVCWebFrame.Areas.Attendance.Controllers
{
    public class EmployeeController : Controller
    {
        private readonly IAttendanceFactory _attendanceFactory;

        public EmployeeController(IAttendanceFactory attendanceFactory)
        {
            _attendanceFactory = attendanceFactory;
        }

        //
        // GET: /Attendance/Employee/employeeGroupId

        public ActionResult Index(string employeeGroupId)
        {
            IList<Employee> all = _attendanceFactory.GetEmployeeDao().GetAll();
            return View(all);
        }

        public ActionResult Create()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Create(Employee employee)
        {
            if(this.ModelState.IsValid)
            {
                _attendanceFactory.GetEmployeeDao().SaveOrUpdate(employee);
                return RedirectToAction("Create");
            }
            return View(employee);
        }

        public ActionResult Edit(string id)
        {
            return View(_attendanceFactory.GetEmployeeDao().Get(new Guid(id)));
        }

        public ActionResult Delete(string id)
        {
            return View();
        }
    }
}