using System.Web.Mvc;
using Ornament;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Plugin.Models.Security;
using Ornament.MemberShip.Security;
using Ornament.MemberShip.Web.Plugin.Models.Security;
using Qi.Web.Mvc;

namespace WebApplication.Controllers
{
    public class SecurityController : Controller
    {
        private readonly IMemberShipDaoFactory _daoFactory;

        public SecurityController(IMemberShipDaoFactory daoFactory)
        {
            _daoFactory = daoFactory;
        }

        [Authorize, Session]
        public ActionResult VerifyEmail(string id, string token)
        {
            EmailVerifier userToken = _daoFactory.CreateEmailVerifierDao().Get(id);
            try
            {
                if (userToken == null)
                {
                    return View("~/Views/HttpErrors/404.cshtml");
                }
                var verifyEmailModel = new VerifyEmailModel(userToken);
                return View(verifyEmailModel.Verify(OrnamentContext.MemberShip.CurrentUser(), token, _daoFactory));
            }
            finally
            {
                if (userToken != null)
                {
                    _daoFactory.CreateEmailVerifierDao().SaveOrUpdate(userToken);
                }
            }
        }

        [Session]
        public ActionResult RetrievePassword(string id, string token)
        {
            EmailVerifier userToken = _daoFactory.CreateEmailVerifierDao().Get(id);
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
                model.Save(_daoFactory);
                return View("RetrievePasswordResult", true);
            }
            return View(model);
        }

      
    }
}