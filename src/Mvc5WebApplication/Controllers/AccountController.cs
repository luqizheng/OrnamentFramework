using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication.Controllers
{
    public class AccountController : Controller
    {
        //
        // GET: /Account/
        public ActionResult Logon()
        {
            return View();
        }

        public ActionResult Logout()
        {
            return View();
        }
	}
}