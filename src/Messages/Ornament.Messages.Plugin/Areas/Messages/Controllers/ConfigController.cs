using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Ornament.Messages.Config;

namespace Ornament.Messages.Plugin.Areas.Messages.Controllers
{
    public class ConfigController : Controller
    {
        //
        // GET: /Messages/Config/

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult SaveVariable(string key, string val)
        {
            if (NotifySenderManager.Instance.Variables.ContainsKey(key))
            {
                NotifySenderManager.Instance.Variables[key] = val;
            }
            else
            {
                NotifySenderManager.Instance.Variables.Add(key, val);
            }
            NotifySenderManager.Instance.SaveVariable();
            return Json(true);
        }
    }
}
