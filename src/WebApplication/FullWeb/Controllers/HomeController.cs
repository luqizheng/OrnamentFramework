#region Using

using FullWeb.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

#endregion
 
namespace FullWeb.Controllers
{
    public class HomeController : Controller
    {
        public HomeController(IUserStore<ApplicationUser> store)
        {

        }
        // GET: home/index
        [Authorize]
        public ActionResult Index()
        {
            return View();
        }

        // GET: home/social
        public ActionResult Social()
        {
            return View();
        }

        // GET: home/inbox
        public ActionResult Inbox()
        {
            return View();
        }

        // GET: home/widgets
        public ActionResult Widgets()
        {
            return View();
        }

        // GET: home/chat
        public ActionResult Chat()
        {
            return View();
        }
    }
}