using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
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
            EmailTemplateManager t = new EmailTemplateManager();
            return View(t.GetCreateUser());
        }
        [HttpPost]
        public ActionResult CreateUser(EmailTemplate template)
        {
            EmailTemplateManager t = new EmailTemplateManager();
            t.SaveCreateUser(template);
            return View();
        }

        public ActionResult ForgetPassword()
        {
            return View();
        }

    }
}
