#region Using

using FullWeb.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using System;

#endregion

namespace FullWeb.Controllers
{
    public class HomeController : Controller
    {
        public HomeController()
        {

        }
        // GET: home/index
        [Authorize]
        public ActionResult Index()
        {
            ViewBag.PageClass = "fixed-navigation fixed-header fixed-ribbon";
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

        [HttpPost]
        public IActionResult SetLanguage(string culture, string returnUrl)
        {
            Response.Cookies.Append(
                CookieRequestCultureProvider.DefaultCookieName,
                CookieRequestCultureProvider.MakeCookieValue(new RequestCulture(culture)),
                new CookieOptions { Expires = DateTimeOffset.UtcNow.AddYears(1) }
            );

            return LocalRedirect(returnUrl);
        }
        public IActionResult Error(int? id)
        {
            var a = "~/Views/Shared/Error/" + (id ?? 500) + ".cshtml";
            return View(a);
        }
    }
}