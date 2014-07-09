using System.Globalization;
using System.Web.Mvc;
using Qi.Web.Mvc;

namespace Ornament.MVCWebFrame.Controllers
{
    [HandleError, Session]
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            //var prjects = _projectDaoFactory.ProjectDao.List(OrnamentContext.Current.CurrentUser());
            return View();
        }

        [Session]
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