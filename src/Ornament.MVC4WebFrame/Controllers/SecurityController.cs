using System;
using System.Web.Mvc;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Security;
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

        [Authorize, Session]
        public ActionResult VerifyEmail(string id, string token)
        {
            UserSecretToken userToken = _factory.CreateUserSecurityTokenDao().Get(id);
            try
            {
                if (userToken == null)
                {
                    return View("~/Views/HttpErrors/404.cshtml");
                }
                if (userToken.Status == SecretTokemStatus.Expire)
                {
                    return View(VerifyResult.Expire);
                }
                if (userToken.Verify(token))
                {
                    return View(VerifyResult.Success);
                }
                return View(VerifyResult.Failed);
            }
            finally
            {
                if (userToken != null)
                {
                    userToken.VerifyTime = DateTime.Now;
                    _factory.CreateUserSecurityTokenDao().SaveOrUpdate(userToken);
                }
            }
        }

        [ Session]
        public ActionResult RetrievePassword(string id, string token)
        {
            UserSecretToken userToken = _factory.CreateUserSecurityTokenDao().Get(id);
            if (userToken == null)
            {
                return View("~/Views/HttpErrors/404.cshtml");
            }
            if (userToken.Status == SecretTokemStatus.Expire)
            {
                _factory.CreateUserSecurityTokenDao().SaveOrUpdate(userToken);
                ViewData["VerifyResult"] = VerifyResult.Expire;
                return View();
            }
            ViewData["VerifyResult"] = VerifyResult.Success;
            return View(new RetrievePasswordModel
                {
                    Id = id,
                    TokenId = token
                });
        }

        [ Session, HttpPost]
        public ActionResult RetrievePassword(RetrievePasswordModel model)
        {
            if (ModelState.IsValid)
            {
                model.Save(_factory);
                return View("RetrievePasswordResult", true);
            }
            return View(model);
        }
    }
}