using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication.Controllers
{
    public class SetupController : Controller
    {
        //
        // GET: /Setup/
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Index(string connectionString, string admin, string password)
        {
            return View();
        }
	}
}