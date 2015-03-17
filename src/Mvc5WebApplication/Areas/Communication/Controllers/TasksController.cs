using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication.Areas.Communication.Controllers
{
    public class TasksController : Controller
    {
        //
        // GET: /Communication/Task/
        public ActionResult Index()
        {
            return View();
        }
	}
}