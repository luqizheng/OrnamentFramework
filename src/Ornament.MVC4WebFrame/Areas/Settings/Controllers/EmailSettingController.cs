using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Ornament.MVCWebFrame.Areas.Settings.Controllers
{
    public class EmailSettingController : Controller
    {
        //
        // GET: /Settings/EmailSetting/

        public ActionResult CreateUser()
        {
            return View();
        }

        public ActionResult ForgetPassword()
        {
            return View();
        }

    }
}
