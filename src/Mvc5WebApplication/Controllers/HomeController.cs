using System.Web.Mvc;
using Ornament.Web.PortableAreas.InputBuilder.ViewEngine;

namespace WebApplication.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/
        public ActionResult Index()
        {
            return View();
        }
        [Route("Home/Config.js")]
        public ActionResult Config()
        {
            return View();
        }
    }
}