using System.Web.Mvc;
using DeveloperHelperCenter.Areas.Develop.Models;

namespace DeveloperHelperCenter.Areas.Develop.Controllers
{
    public class HtmlController : Controller
    {
        public ActionResult BasicType()
        {
            return View(new BasicEditors());
        }

        [HttpPost]
        public ActionResult BasicType(BasicEditors model)
        {
            model = model ?? new BasicEditors();
            return View(model);
        }

        //
        // GET: /Docs/Editors/
        public ActionResult Index()
        {
            return View();
        }
    }
}