using System.Web.Mvc;
using Ornament.MemberShip.Dao;
using Ornament.Models.Security;
using Qi.Web.Mvc;

namespace Ornament.MVCWebFrame.Controllers
{
    public class SecurityController : Controller
    {
        private readonly IMemberShipFactory _factory;

        public SecurityController(IMemberShipFactory factory)
        {
            _factory = factory;
        }
        [Authorize,Session]
        public ActionResult VerifyEmail(string id, string token)
        {
            var userToken = _factory.CreateUserSecurityTokenDao().Get(id);
            try
            {

                if (userToken == null)
                {
                    return View("~/Views/HttpErrors/404.cshtml");
                }
                if (userToken.IsExpire)
                {
                    return View("VerifyEmailResult", VerifyResutl.Expire);
                }
                if (userToken.Verify(token))
                {
                    return View("VerifyEmailResult", VerifyResutl.Success);
                }
                return View("VerifyEmailResult", VerifyResutl.Failed);
            }
            finally
            {
                _factory.CreateUserSecurityTokenDao().SaveOrUpdate(userToken);
            }

        }


    }
}