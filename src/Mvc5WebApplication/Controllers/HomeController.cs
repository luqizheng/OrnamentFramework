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
            var ad=Request.Cookies[FormsAuthentication.FormsCookieName].Value;
            var a = FormsAuthentication.Decrypt(ad);
            return View();
        }
       
        public ActionResult Config()
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