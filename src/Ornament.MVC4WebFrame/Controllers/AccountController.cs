using System;
using System.Diagnostics.CodeAnalysis;
using System.Security.Principal;
using System.Web.Mvc;
using Ornament.MVCWebFrame.Models;
using Ornament.MVCWebFrame.Models.Membership;
using Ornament.Web;
using Ornament.Web.MemberShips;
using Ornament.Web.MemberShips.Models;
using Qi.Web.Mvc;

namespace Ornament.MVCWebFrame.Controllers
{
    /// <summary>
    ///     account controller.
    /// </summary>
    [HandleError, Session]
    public class AccountController : Controller
    {
        // This constructor is used by the MVC framework to instantiate the controller using
        // the default forms authentication and membership providers.

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


        /// <summary>
        ///     change password.
        /// </summary>
        /// <param name="model"> </param>
        /// <returns>
        /// </returns>
        [Authorize]
        [AcceptVerbs(HttpVerbs.Post),
         ResourceAuthorize(UserOperator.SetPassword, "Member")]
        public ActionResult ChangePassword([ModelBinder(typeof (NHModelBinder))] ChangePasswordModel model)
        {
            if (ModelState.IsValid)
            {
                model.Change(ModelState);
            }
            return PartialView("_changePassword", model);
        }

        /// <summary>
        ///     log off.
        /// </summary>
        /// <returns>
        /// </returns>
        public ActionResult LogOff()
        {
            FormsAuth.SignOut();
            return RedirectToAction("Index", "Home");
        }

        /// <summary>
        ///     log on.
        /// </summary>
        /// <returns>
        /// </returns>
        public ActionResult LogOn()
        {
            return View();
        }

        [Authorize]
        public ActionResult Index()
        {
            return View(OrnamentContext.Current.CurrentUser);
        }


        [Authorize]
        [HttpPost, Session]
        public ActionResult SaveBaseInfo(FormCollection data)
        {
            try
            {
                OrnamentContext.Current.CurrentUser.Name = data["Name"];
                OrnamentContext.Current.CurrentUser.Email = data["Email"];
                OrnamentContext.Current.CurrentUser.Phone = data["Phone"];
                return Json("true");
            }
            catch
            {
                return Json("false");
            }
        }

        /// <summary>
        ///     log on.
        /// </summary>
        /// <returns>
        /// </returns>
        [AcceptVerbs(HttpVerbs.Post)]
        [SuppressMessage("Microsoft.Design", "CA1054:UriParametersShouldNotBeStrings",
            Justification = "Needs to take same parameter type as Controller.Redirect()")]
        public ActionResult LogOn([ModelBinder(typeof (NHModelBinder))] LogonModel model)
        {
            if (!ModelState.IsValid || !model.Validate(FormsAuth, ModelState))
            {
                return View(model);
            }
            model.ReturnUrl = Request["ReturnUrl"];
            return !String.IsNullOrEmpty(model.ReturnUrl)
                       ? (ActionResult) Redirect(model.ReturnUrl)
                       : RedirectToAction("Index", "Home");
        }

        public ActionResult ForgetPassword()
        {
            return View();
        }

        /// <summary>
        ///     register.
        /// </summary>
        /// <returns>
        /// </returns>
        public ActionResult Regist()
        {
            ViewData["PasswordLength"] = MembershipService.MinPasswordLength;
            return View();
        }

        /// <summary>
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Regist(RegistAccount model)
        {
            if (ModelState.IsValid)
            {
                MembershipService.CreateUser(model.UserBasicInfo.LoginId, model.Password.Password,
                                             model.UserBasicInfo.Email);

                return RedirectToAction("Index", "Home");
            }
            return View();
        }

        /// <summary>
        ///     on action executing.
        /// </summary>
        /// <param name="filterContext">
        ///     The filter context.
        /// </param>
        /// <exception cref="InvalidOperationException">
        /// </exception>
        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            if (filterContext.HttpContext.User.Identity is WindowsIdentity)
            {
                throw new InvalidOperationException("Windows authentication is not supported.");
            }
        }


        public ActionResult PersonalInfo()
        {
            return View(OrnamentContext.Current.CurrentUser);
        }
    }

    // The FormsAuthentication type is sealed and contains static members, so it is difficult to
    // unit test code that calls its members. The interface and helper class below demonstrate
    // how to create an abstract wrapper around such a type in order to make the AccountController
    // code unit testable.
}