using System.ComponentModel.DataAnnotations;
using System.Globalization;
using System.Runtime.InteropServices;
using System.Web.Mvc;
using System.Web.Profile;
using Ornament.MemberShip;
using Ornament.Web;
using Ornament.Web.HttpModel;
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
            var culture = CultureInfo.GetCultureInfo(id);
            OrnamentContext.MemberShip.SwitchLanguage(culture);
            if (Request.UrlReferrer != null)
                return Redirect(Request.UrlReferrer.ToString());
            return RedirectToAction("Index");
        }
    }
}