﻿using System.Globalization;
using System.Web.Mvc;
using Ornament;
using Ornament.MemberShip.Web.Plugin.Models.SampleData;
using Qi.Web.Mvc;

namespace WebApplication.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/
        [Session]
        public ActionResult Index()
        {
            //ViewData["view"] = Request.Cookies[System.Web.Security.FormsAuthentication.FormsCookieName].Value;
            var d = new MemberShipData();
            d.CreateData();
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