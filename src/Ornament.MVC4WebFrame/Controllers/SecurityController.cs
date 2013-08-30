using System;
using System.Web.Mvc;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Security;
using Ornament.Models.Security;
using Ornament.Web;
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
                if (userToken.Status == SecretTokenStatus.Expire)
                {
                    return View(VerifyResult.Expire);
                }
                if (userToken.Verify(token))
                {
                    if (OrnamentContext.MemberShip.CurrentUser().LoginId == userToken.Account.LoginId)
                    {
                        userToken.Account.IsApproved = true;
                        _factory.CreateUserDao().SaveOrUpdate(userToken.Account);
                        return View(VerifyResult.Success);
                    }
                    else
                    {
                        return View(VerifyResult.Failed);
                    }
                }
                return View(VerifyResult.Failed);
            }
            finally
            {
                if (userToken != null)
                {
                    _factory.CreateUserSecurityTokenDao().SaveOrUpdate(userToken);
                }
            }
        }

        [Session]
        public ActionResult RetrievePassword(string id, string token)
        {
            UserSecretToken userToken = _factory.CreateUserSecurityTokenDao().Get(id);
            if (userToken == null)
            {
                return View("~/Views/HttpErrors/404.cshtml");
            }

            if (userToken.Status == SecretTokenStatus.Expire || userToken.Status == SecretTokenStatus.Success)
            {
                _factory.CreateUserSecurityTokenDao().SaveOrUpdate(userToken);
                ViewData["VerifyResult"] = VerifyResult.Expire;
                return View(new RetrievePasswordModel
                {
                    Id = id,
                    TokenId = token
                });
            }

            ViewData["VerifyResult"] = VerifyResult.Success;
            return View(new RetrievePasswordModel
                {
                    Id = id,
                    TokenId = token
                });
        }

        [Session, HttpPost]
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