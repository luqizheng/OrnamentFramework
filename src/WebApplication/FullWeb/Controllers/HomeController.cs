#region Using

using FullWeb.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using System;
using Ornament.Web;

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

     

    }
}