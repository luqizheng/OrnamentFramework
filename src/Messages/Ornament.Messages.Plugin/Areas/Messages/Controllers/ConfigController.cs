using System;
using System.Linq;
using System.Web.Mvc;
using Ornament.Messages.Config;
using Ornament.Web.MemberShips;

namespace Ornament.Messages.Plugin.Areas.Messages.Controllers
{
    public class ConfigController : Controller
    {
        //
        // GET: /Messages/Config/
        [OrnamentMvcSiteMapNode(Title = "Variable Setting", Key = "VariableSetting",
            ParentKey = "Messages")]
        public ActionResult Index()
        {
            return View(NotifySenderManager.Instance.Variables);
        }

        public ActionResult Reload()
        {
            NotifySenderManager.Instance.ReloadVariables();

            return Json(from a in NotifySenderManager.Instance.Variables select new { Name = a.Key, Value = a.Value });

        }
        [HttpPost]
        public ActionResult SaveVariable(VariablesModels models)
        {
            foreach (var variable in models.Variables)
            {
                string key = variable.Name;
                string val = variable.Value;
                if (NotifySenderManager.Instance.Variables.ContainsKey(key))
                {
                    NotifySenderManager.Instance.Variables[key] = val;
                }
                else
                {
                    NotifySenderManager.Instance.Variables.Add(key, val);
                }
                NotifySenderManager.Instance.SaveVariable();

            }
            return Json(true);
        }

        public class VairableModel
        {
            public string Name { get; set; }
            public string Value { get; set; }
        }

        public class VariablesModels
        {
            public VairableModel[] Variables { get; set; }
        }
    }
}