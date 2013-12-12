using System;
using System.Web.Mvc;
using Ornament.MVCWebFrame.Areas.Doc.Models;
using Qi;

namespace Doc.Areas.Doc.Controllers
{
    [Authorize]
    public class TypeLayoutController : Controller
    {
        public ActionResult ExtenderType()
        {
            DateTime now = DateTime.Now;
            var a = new ExtenderTypeModel
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
            BaseTypeModel output = input ?? new BaseTypeModel();
            return View(output);
        }
    }
}