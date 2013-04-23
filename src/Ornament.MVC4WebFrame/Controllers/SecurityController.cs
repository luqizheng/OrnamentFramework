using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Ornament.MVCWebFrame.Controllers
{
    public class SecrityController : Controller
    {
        //
        // GET: /Secrity/

        public ActionResult VerifyEmailAndChangePassword()
        {
            return View();
        }

    }
}
