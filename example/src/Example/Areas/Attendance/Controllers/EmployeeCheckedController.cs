using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Ornament.MVCWebFrame.Areas.Attendance.Controllers
{
    public class EmployeeCheckedController : Controller
    {
        //
        // GET: /Attendance/EmployeeChecked/

        public ActionResult Index(DateTime? start,DateTime? end)
        {
            return View();
        }

    }
}
