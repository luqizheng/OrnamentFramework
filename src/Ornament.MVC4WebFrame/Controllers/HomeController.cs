using System.Web.Mvc;
using System.Web.Profile;
using Ornament.Web;
using Ornament.Web.Languages;
using Qi.IO;
using Qi.Web.Mvc;
using QiProject.Dao;

namespace Ornament.MVCWebFrame.Controllers
{
    [HandleError, Session,Authorize]
    public class HomeController : Controller
    {
        private readonly IProjectDaoFactory _projectDaoFactory;

        public HomeController(IProjectDaoFactory projectDaoFactory)
        {
            _projectDaoFactory = projectDaoFactory;
        }

        public ActionResult Index()
        {
            //var prjects = _projectDaoFactory.ProjectDao.List(OrnamentContext.Current.CurrentUser);
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
            ProfileBase profile = HttpContext.Profile;
            profile["Language"] = id;
            profile.Save();
            LanguageManager.SiwtchTo(id);
            if (Request.UrlReferrer != null)
                return Redirect(Request.UrlReferrer.ToString());
            return RedirectToAction("Index");
        }

        
      
    }
}