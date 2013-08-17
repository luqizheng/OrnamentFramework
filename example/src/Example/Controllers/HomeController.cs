using System.Web.Mvc;
using System.Web.Profile;
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

        [Authorize]
        public ActionResult Admin()
        {
            return View();
        }

        [Session]
        public ActionResult SwitchLanguage(string id)
        {
            OrnamentContext.MemberShip.SwitchLanguage(id);
                
            if (Request.UrlReferrer != null)
                return Redirect(Request.UrlReferrer.ToString());
            return RedirectToAction("Index");
        }
    }
}