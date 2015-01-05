using System;
using System.Diagnostics.CodeAnalysis;
using System.Web;
using System.Web.Mvc;
using Ornament;
using Ornament.MemberShip.Web.Plugin.Models.Memberships;
using Ornament.MemberShip.Web.Plugin.Models.Security;
using Ornament.Web.MemberShips;
using Ornament.Web.UI;

namespace WebApplication.Controllers
{
    public class AccountController : Controller
    {
        /// <summary>
        ///     Initializes a new instance of the <see cref="AccountController" /> class.
        /// </summary>
        public AccountController()
            : this(null, null)
        {
        }

        // This constructor is not used by the MVC framework but is instead provided for ease
        // of unit testing this type. See the comments at the end of this file for more
        // information.
        /// <summary>
        ///     Initializes a new instance of the <see cref="AccountController" /> class.
        /// </summary>
        /// <param name="formsAuth">
        ///     The forms auth.
        /// </param>
        /// <param name="service">
        ///     The service.
        /// </param>
        public AccountController(IFormsAuthentication formsAuth, IMembershipService service)
        {
            FormsAuth = formsAuth ?? new FormsAuthenticationService();
            MembershipService = service ?? new AccountMembershipService();

        }

        /// <summary>
        ///     Gets FormsAuth.
        /// </summary>
        public IFormsAuthentication FormsAuth { get; private set; }

        /// <summary>
        ///     Gets MembershipService.
        /// </summary>
        public IMembershipService MembershipService { get; private set; }

        //
        // GET: /Account/
        public ActionResult Logon()
        {
            return View();
        }

        public ActionResult AjaxLogon()
        {
            return View();
        }
        public ActionResult Logout()
        {
            FormsAuth.SignOut();
            return RedirectToAction("Logon");
        }

        [AcceptVerbs(HttpVerbs.Post)]
        [ValidateAjax]
        [SuppressMessage("Microsoft.Design", "CA1054:UriParametersShouldNotBeStrings",
            Justification = "Needs to take same parameter type as Controller.Redirect()")]
        public ActionResult LogOn(LogonModel model)
        {
            string errorMessage = null;
            if (!ModelState.IsValid ||
                !model.Validate(out errorMessage, OrnamentContext.DaoFactory.MemberShipDaoFactory.CreateUserDao(),
                    OrnamentContext.MemberShip.CurrentVerifyCode()))
            {
                if (errorMessage != null)
                {
                    ModelState.AddModelError("User", errorMessage);
                }
                if (!Request.IsAjaxRequest())
                    return View(model);
                return Json(false);
            }
            FormsAuth.SignIn(model.User, model.RememberMe);
            if (!Request.IsAjaxRequest())
            {
                return !String.IsNullOrEmpty(model.ReturnUrl)
                    ? (ActionResult)Redirect(model.ReturnUrl)
                    : RedirectToAction("Index", "Home");
            }
            else
            {
                return Json(true);
            }
        }

        public ActionResult Register()
        {
            return View();
        }

        public ActionResult ForgetPassword()
        {
            return View();
        }

        [HttpPost]
        public ActionResult ForgetPassword(ForgetPasswordModel model)
        {

            return RedirectToAction("Logon");
        }
    }
}