using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Ornament.Files.Plugin.Areas.File.Controllers
{
    public class ManagerController : Controller
    {
        //
        // GET: /File/Manager/

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult FileCtrl()
        {
            return View();
        }
    }
}
