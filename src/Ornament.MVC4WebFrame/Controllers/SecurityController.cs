using System.Web.Mvc;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Secret;
using Ornament.Models.Security;

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
            var result = new VerifyEmailAndChangePasswordResutl();

            if (userToken == null)
            {
                result.Type = VerifyEmailAndChangePasswordResutlType.NotFoundTokenId;
            }
            else
            {
                result.Type = userToken.Verify(token)
                    ? VerifyEmailAndChangePasswordResutlType.Success
                    : VerifyEmailAndChangePasswordResutlType.Failed;
            }
            return View(result);
        }
    }
}