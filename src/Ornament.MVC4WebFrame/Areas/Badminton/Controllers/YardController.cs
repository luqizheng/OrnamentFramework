using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Ornament.MVCWebFrame.Areas.Badminton.Controllers
{
    public class YardController : Controller
    {
        //
        // GET: /Badminton/Yard/

        public ActionResult Create(int? gymasiumId)
        {
            return View();
        }

    }
}
