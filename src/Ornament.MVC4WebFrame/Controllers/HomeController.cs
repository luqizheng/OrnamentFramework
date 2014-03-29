using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;
using System.Web.Mvc;
using System.Web.Profile;
using Ornament.MemberShip;
using Ornament.Web;
using Ornament.Web.HttpModel;
using Qi.Web.Mvc;

namespace Ornament.MVCWebFrame.Controllers
{
    public class Test
    {
        [UIHint("~/Views/Shared/User[].cshtml")]
        public User[] Users
        {
            get
            {
                return new User[]
                {
                    new User("kkk"), 
                };
            }
        }
    }
    [HandleError, Session(Tag="Controller")]
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

            return View(new Test());
        }

        [Session(Tag="Action")]
        public ActionResult SwitchLanguage(string id)
        {
            OrnamentContext.MemberShip.SwitchLanguage(id);
            
            if (Request.UrlReferrer != null)
                return Redirect(Request.UrlReferrer.ToString());
            return RedirectToAction("Index");
        }
    }
}