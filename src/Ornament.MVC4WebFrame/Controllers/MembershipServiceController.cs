using System.Web.Mvc;
using System.Web.Security;

namespace Ornament.MVCWebFrame.Controllers
{
    public class MembershipServiceController : Controller
    {
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Validate(string user, string password)
        {
            bool result = Membership.ValidateUser(user, password);
            return Json(result);
        }
    }
}