using System;
using System.IO;
using System.Linq;
using System.Web.Mvc;
using Ornament.MVCWebFrame.Areas.Docs.Models;
using Qi;
using Qi.IO;

namespace Ornament.MVCWebFrame.Areas.Docs.Controllers
{
    [Authorize]
    public class TypeLayoutController : Controller
    {
        public ActionResult ExtenderType()
        {
            var now = DateTime.Now;
            var a = new ExtenderTypeModel()
             {
                 TimeNow = new Time(now.Hour, now.Minute, now.Second)
             };
            return View(a);
        }
        [HttpPost]
        public ActionResult ExtenderType(ExtenderTypeModel input)
        {
            return View(input);
        }



        public ActionResult BaseType(BaseTypeModel input)
        {
            var output = input ?? new BaseTypeModel();
            return View(output);
        }
    }
}