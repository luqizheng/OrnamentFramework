using System.Web.Mvc;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Secret;

namespace Ornament.MVCWebFrame.Controllers
{
    public class SecurityController : Controller
    {
        private readonly IMemberShipFactory _factory;

        public SecurityController(IMemberShipFactory factory)
        {
            _factory = factory;
        }

        //
        // GET: /Secrity/
        [Authorize]
        public ActionResult VerifyEmailAndChangePassword(string id, string token)
        {
            UserSecretToken userToken = _factory.CreateUserSecortTokeDao().Get(id);
            if (userToken == null)
            {
                ViewData["resource"] = "NotFoundToken";
            }
            else
            {
                userToken.Verify(token);
            }
            return View();
        }
    }
}