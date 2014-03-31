using System.Web.Mvc;
using Ornament.Web.MemberShips;
using Qi.Web.Mvc;

namespace Ornament.Information.Plugin.Areas.Information.Controllers
{
    [Session]
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
