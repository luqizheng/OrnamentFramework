using System.Web.Mvc;
using Ornament.Web.MemberShips;

namespace Ornament.Information.Plugin.Areas.Information.Controllers
{
    public class SiteController : Controller
    {
        //
        // GET: /Settings/SiteInfo/
        [OrnamentMvcSiteMapNode(Title="Site Information",ParentKey = "System")]
        public ActionResult Index()
        {
            return View();
        }

    }
}
