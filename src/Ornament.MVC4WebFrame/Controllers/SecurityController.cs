using System.Web.Mvc;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Plugin.Models.Security;
using Ornament.MemberShip.Security;
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

        [Authorize, Session]
        public ActionResult VerifyEmail(string id, string token)
        {
            EmailVerifier userToken = _factory.CreateEmailVerifierDao().Get(id);
            try
            {
                if (userToken == null)
                {
                    return View("~/Views/HttpErrors/404.cshtml");
                }
                var verifyEmailModel = new VerifyEmailModel(userToken);
                return View(verifyEmailModel.Verify(OrnamentContext.MemberShip.CurrentUser(), token, _factory));
            }
            finally
            {
                if (userToken != null)
                {
                    _factory.CreateEmailVerifierDao().SaveOrUpdate(userToken);
                }
            }
        }

        [Session]
        public ActionResult RetrievePassword(string id, string token)
        {
            EmailVerifier userToken = _factory.CreateEmailVerifierDao().Get(id);
            if (userToken == null)
            {
                return View("~/Views/HttpErrors/404.cshtml");
            }
            var result = userToken.Verify(token);
            ViewData["VerifyResult"] = result;

            var model = new ResetPasswordModel
            {
                Id = id,
                TokenId = token
            };
            return View(model);
        }


        [Session, HttpPost]
        public ActionResult RetrievePassword(ResetPasswordModel model)
        {
            if (ModelState.IsValid)
            {
                model.Save(_factory);
                return View("RetrievePasswordResult", true);
            }
            return View(model);
        }

        public ActionResult TokenError()
        {
            return View();
        }
    }
}