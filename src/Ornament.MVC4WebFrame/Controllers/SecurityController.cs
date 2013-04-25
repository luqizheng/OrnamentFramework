using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Ornament.MemberShip.Dao;

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
            var userToken=_factory.CreateUserSecortTokeDao().Get(id);
            if (userToken == null)
            {
                ViewData["resource"] = "NotFoundToken";
            }
            userToken.Verify(token);
            return View();
        }

    }
}
