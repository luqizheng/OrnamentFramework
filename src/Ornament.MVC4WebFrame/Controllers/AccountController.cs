using System;
using System.Diagnostics.CodeAnalysis;
using System.Security.Principal;
using System.Web.Mvc;
using System.Web.Security;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Plugin.Models;
using Ornament.MemberShip.Plugin.Models.Memberships;
using Ornament.Web.MemberShips;
using Qi.Web.Mvc;

namespace Ornament.MVCWebFrame.Controllers
{
    /// <summary>
    ///     account controller.
    /// </summary>
    [HandleError, Session]
    public class AccountController : Controller
    {
        private readonly IMemberShipFactory _memberShipFactory;

        /// <summary>
        ///     Initializes a new instance of the <see cref="AccountController" /> class.
        /// </summary>
        public AccountController(IMemberShipFactory memberShipFactory)
            : this(null, null)
        {
            _memberShipFactory = memberShipFactory;
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

      
        public ActionResult GetView(string viewName)
        {
            return View(viewName);
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
            var a = new LogonModel
            {
                ReturnUrl = Request.QueryString["ReturnUrl"]
            };
            return View(a);
        }

        [Authorize]
        public ActionResult Index()
        {
            return View(OrnamentContext.MemberShip.CurrentUser());
        }


        [Authorize]
        [HttpPost, Session]
        public ActionResult SaveBaseInfo(FormCollection data)
        {
            bool emailChanged = false;
            OrnamentContext.MemberShip.CurrentUser().Name = data["Name"];
            if (OrnamentContext.MemberShip.CurrentUser().Contact.Email != data["Email"])
            {
                emailChanged = true;
                OrnamentContext.MemberShip.CurrentUser().Contact.Email = data["Email"];
              
            }
            OrnamentContext.MemberShip.CurrentUser().Contact.Phone = data["Phone"];
            return Json(new { success = true, emailChanged });
        }

        /// <summary>
        ///     log on.
        /// </summary>
        /// <returns>
        /// </returns>
        [AcceptVerbs(HttpVerbs.Post)]
        [SuppressMessage("Microsoft.Design", "CA1054:UriParametersShouldNotBeStrings",
            Justification = "Needs to take same parameter type as Controller.Redirect()")]
        public ActionResult LogOn(LogonModel model)
        {
            string errorMessage = null;
            if (!ModelState.IsValid ||
                !model.Validate(out errorMessage, OrnamentContext.DaoFactory.MemberShipFactory.CreateUserDao(),
                    OrnamentContext.MemberShip.CurrentVerifyCode()))
            {
                if (errorMessage != null)
                {
                    ModelState.AddModelError("_form", errorMessage);
                }
                return View(model);
            }
            var result=Membership.ValidateUser(model.User, model.Password);
            model.ReturnUrl = model.ReturnUrl;
            FormsAuth.SignIn(model.User, model.RememberMe);
            return !String.IsNullOrEmpty(model.ReturnUrl)
                ? (ActionResult)Redirect(model.ReturnUrl)
                : RedirectToAction("Index", "Home");
        }

        /// <summary>
        ///     Send emial and try to get account
        /// </summary>
        /// <returns></returns>
        public ActionResult ForgetPassword()
        {
            return View();
        }

        /// <summary>
        /// </summary>
        /// <param name="forget"></param>
        /// <returns></returns>
        [HttpPost, Session]
        public ActionResult ForgetPassword(ForgetPasswordModel forget)
        {
            if (ModelState.IsValid)
            {
                forget.Retrieve(OrnamentContext.DaoFactory.MemberShipFactory);
                return RedirectToAction("ForgetPasswordSucccess");
            }
            return View();
        }

        /// <summary>
        /// </summary>
        /// <returns></returns>
        public ActionResult ForgetPasswordSucccess()
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
                MembershipService.CreateUser(model.LoginId, model.Password.Password,
                    model.Email);

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
            return View(OrnamentContext.MemberShip.CurrentUser());
        }
    }
}