using System;
using System.Web.Mvc;
using Ornament.Templates;
using Qi.Web.Mvc;

namespace Ornament.MVCWebFrame.Areas.Settings.Controllers
{
    [Session]
    [Authorize(Roles = "admin")]
    public class EmailSettingController : Controller
    {
        //
        // GET: /Settings/EmailSetting/

        public ActionResult CreateUser()
        {
            var t = new EmailTemplateManager();
            return View("Email", t.GetCreateUser());
        }

        public ActionResult ForgetPassword()
        {
            var t = new EmailTemplateManager();
            return View("Email", t.ForgetPassword());
        }

        public ActionResult Index()
        {
            return View();
        }


        [HttpPost]
        public ActionResult Save(EmailTemplate template)
        {
            try
            {
                var t = new EmailTemplateManager();
                t.SaveCreateUser(template);
                return Json(new { success = true });
            }
            catch (Exception ex)
            {
                return Json(new { scuccess = false, message = ex.Message });
            }
        }
    }
}