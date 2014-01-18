using System.Web.Mvc;
using MvcSiteMapProvider;

namespace Ornament.Files.Plugin.Areas.File.Controllers
{
    public class ManagerController : Controller
    {
        //
        // GET: /File/Manager/
        [MvcSiteMapNode(Title = "File Manager", ParentKey = "System")]
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult FileCtrl()
        {
            return View();
        }
    }
}