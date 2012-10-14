using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;
using MultiLanguage;
using Ornament.MVCWebFrame.Controllers;
using Ornament.MemberShip;
using Ornament.MemberShip.Languages;
using Ornament.Web;

namespace Ornament.MVCWebFrame.Models
{
    public class LogonModel
    {
        public string ReturnUrl { get; set; }

        [Required(ErrorMessageResourceName = "error_MissLoginId", ErrorMessageResourceType = typeof (Message))]
        [Display(Name = "LoginId", ResourceType = typeof (MembershipCommon))]
        public string User { get; set; }

        [Required(ErrorMessageResourceName = "error_MissPassword", ErrorMessageResourceType = typeof (Message))]
        [Display(Name = "Password", ResourceType = typeof (MembershipCommon))]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Display(Name = "RememberMe", ResourceType = typeof (Message))]
        public bool RememberMe { get; set; }

        public bool Validate(IFormsAuthentication formsAuth, ModelStateDictionary modelState)
        {
            User u = OrnamentContext.Current.MemberShipFactory().CreateUserDao().GetByLoginId(User);
            if (u == null)
            {
                modelState.AddModelError("_FORM", Message.error_LoginError);
                return false;
            }
            if (u.IsLockout)
            {
                modelState.AddModelError("_FORM", Message.error_UserIsLockout);
                return false;
            }

            if (!u.IsApproved)
            {
                modelState.AddModelError("_FORM", Message.error_UserIsNotApproved);
                return false;
            }

            bool result = u.ValidateUser(Password);

            if (result)
            {
                formsAuth.SignIn(u.LoginId, RememberMe);
            }
            else
            {
                modelState.AddModelError("_FORM", Message.error_LoginError);
            }
            return result;
        }
    }
}