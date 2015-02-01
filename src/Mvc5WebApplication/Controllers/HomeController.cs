using System.Globalization;
using System.Web.Mvc;
using Ornament;
using Qi.Web.Mvc;

namespace WebApplication.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/
        [Session, Authorize]
        public ActionResult Index()
        {
            ;
            return View();
        }


        public ActionResult Config()
        {
            Response.ContentType = "text/javascript";
            return View();
        }

        public ActionResult Dashboard()
        {
            return View();
        }

        public ActionResult SwitchLanguage(string id,string href)
        {
            CultureInfo culture = CultureInfo.GetCultureInfo(id);
            OrnamentContext.MemberShip.SwitchLanguage(culture);
            if (!string.IsNullOrEmpty(href))
            {
                return Redirect(href);
            }
            if (Request.UrlReferrer != null)
                return Redirect(Request.UrlReferrer.ToString());
            return RedirectToAction("Index");
        }
    }
}