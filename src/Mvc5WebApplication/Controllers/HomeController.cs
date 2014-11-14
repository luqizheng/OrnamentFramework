using System.Globalization;
using System.Web.Mvc;
using System.Web.Security;
using Ornament;

namespace WebApplication.Controllers
{

    public class HomeController : Controller
    {
        //
        // GET: /Home/
        [Authorize]
        public ActionResult Index()
        {
            ViewData["view"] = Request.Cookies[System.Web.Security.FormsAuthentication.FormsCookieName].Value;
            return View();
        }

        public ActionResult Config()
        {
            return View();
        }

        public ActionResult Dashboard()
        {
            return View();
        }
        public ActionResult SwitchLanguage(string id)
        {
            CultureInfo culture = CultureInfo.GetCultureInfo(id);
            OrnamentContext.MemberShip.SwitchLanguage(culture);
            if (Request.UrlReferrer != null)
                return Redirect(Request.UrlReferrer.ToString());
            return RedirectToAction("Index");
        }
    }
}