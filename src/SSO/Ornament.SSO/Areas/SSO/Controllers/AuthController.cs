using System;
using System.Web.Mvc;
using System.Web.Security;

namespace Ornament.SSO.Areas.SSO.Controllers
{
    public class AuthController : Controller
    {
        public ActionResult IsAuth(string loginid, string sessionId, string redirectUrl)
        {
            try
            {
                ViewData["url"] = redirectUrl;
                return View(User.Identity.IsAuthenticated);
            }
            catch (Exception)
            {
                return View(false);
            }
        }

        public ActionResult BackendAuth(string publicKey)
        {
            try
            {
                FormsAuthenticationTicket ticket = FormsAuthentication.Decrypt(publicKey);
                if (ticket == null || ticket.Expired)
                    return Json(new { success = false });
                return Json(new { success = true, loginId = ticket.Name }, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(new { success = false }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}