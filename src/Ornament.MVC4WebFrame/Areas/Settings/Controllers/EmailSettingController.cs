using System;
using System.Web.Mvc;
using Ornament.Templates;
using Qi.Web.Mvc;

namespace Ornament.MVCWebFrame.Areas.Settings.Controllers
{
    [Session]
    public class EmailSettingController : Controller
    {
        //
        // GET: /Settings/EmailSetting/

        public ActionResult CreateUser()
        {
            var t = new EmailTemplateManager();
            return View(t.GetCreateUser());
        }

        [HttpPost]
        public ActionResult Save(EmailTemplate template)
        {
            try
            {
                var t = new EmailTemplateManager();
                t.SaveCreateUser(template);
                return Json("成功");
            }
            catch (Exception ex)
            {
                return Json(ex.Message);
            }
        }

        public ActionResult ForgetPassword()
        {
            return View();
        }
    }
}