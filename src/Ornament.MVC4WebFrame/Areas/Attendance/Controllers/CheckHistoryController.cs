using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Qi.Attendance;
using Qi.Attendance.Dao;

namespace Ornament.MVCWebFrame.Areas.Attendance.Controllers
{
    public class CheckHistoryController : Controller
    {
        private readonly IAttendanceFactory _checkHistoryDao;

        public CheckHistoryController(IAttendanceFactory attendanceFactory)
        {
            _checkHistoryDao = attendanceFactory;
        }

        //
        // GET: /Attendance/CheckHistory/
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Index(DateTime? startTime, DateTime? endTime, EmployeeGroup employeeGroup)
        {
            IList<CheckHistory> entities = _checkHistoryDao.GetCheckHistoryDao()
                                                           .GetList(employeeGroup, startTime ?? DateTime.Now,
                                                                    endTime ?? DateTime.Now);
            return View(entities);
        }

        

        
    }
}