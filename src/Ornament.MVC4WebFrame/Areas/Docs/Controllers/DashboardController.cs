using System.Web.Mvc;

namespace Ornament.MVCWebFrame.Areas.Docs.Controllers
{
    public class DashboardController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
        //
        // GET: /Sample/Dashboard/
        public ActionResult Bootstrap()
        {
            return View();
        }

    }
}
