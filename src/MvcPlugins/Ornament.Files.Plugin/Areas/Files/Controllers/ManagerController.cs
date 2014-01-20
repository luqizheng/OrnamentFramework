using System.Web.Mvc;
using Ornament.Web.MemberShips;

namespace Ornament.Files.Plugin.Areas.Files.Controllers
{
    public class ManagerController : Controller
    {
        //
        // GET: /File/Manager/
        [OrnamentMvcSiteMapNode(Title = "File Manager", ParentKey = "System")]
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