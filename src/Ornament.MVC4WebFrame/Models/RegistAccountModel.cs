using System;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;
using System.Web.Security;
using MultiLanguage;
using Ornament.MVCWebFrame.Controllers;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Languages;
using Ornament.Web;

namespace Ornament.MVCWebFrame.Models
{
    public class RegistAccountModel
    {
        /// <summary>
        /// 
        /// </summary>
        [Display(Name = "LoginId", ResourceType = typeof (MembershipCommon))]
        [Required(ErrorMessageResourceName = "error_MissLoginId", ErrorMessageResourceType = typeof (Message))]
        [RegularExpression(@"^[a-zA-z1-9_-]{1,20}", ErrorMessageResourceName = "LoginNotCorrectFormat",
            ErrorMessageResourceType = typeof (ErrorMessage))]
        public string LoginId { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [Display(Name = "Email", ResourceType = typeof (MembershipCommon))]
        [Required(ErrorMessageResourceName = "error_missingEmailAddress", ErrorMessageResourceType = typeof (Message))]
        [RegularExpression(@"\b[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,4}\b",
            ErrorMessageResourceName = "EmailNotRightFormat",
            ErrorMessageResourceType = typeof (ErrorMessage))]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Display(Name = "Password", ResourceType = typeof (MembershipCommon))]
        [Required(ErrorMessageResourceName = "alertMsg_Require_NewPassword",
            ErrorMessageResourceType = typeof (Message))]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [Display(Name = "ConfirmPassword", ResourceType = typeof (MembershipCommon))]
        [DataType(DataType.Password)]
        [Required(ErrorMessageResourceType = typeof (Message), ErrorMessageResourceName = "error_MissPassword")]
        [System.Web.Mvc.Compare("Password", ErrorMessageResourceName = "alertMsg_Confirm_Password_Not_Equal_New_password",
            ErrorMessageResourceType = typeof (Message))]
        public string ConfirmPassword { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [Display(Name = "PasswordQuestion", ResourceType = typeof (MembershipCommon)),
         Required(AllowEmptyStrings = false,
             ErrorMessageResourceName = "RequirePasswordQuestion", ErrorMessageResourceType = typeof (ErrorMessage))]
        public string PasswordQuestion { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [Display(Name = "PasswordAnswer", ResourceType = typeof (MembershipCommon)),
         Required(AllowEmptyStrings = false, ErrorMessageResourceName = "RequirePasswordAnswer",
             ErrorMessageResourceType = typeof (ErrorMessage)),
         StringLength(50, MinimumLength = 0, ErrorMessageResourceName = "PasswordQuestionAnswerOverMaxLength",
             ErrorMessageResourceType = typeof (ErrorMessage))]
        public string PasswordAnswer { get; set; }

        public bool IsApproved { get; set; }

        public virtual bool Regist(IFormsAuthentication formsAuth, ModelStateDictionary modelState)
        {
            if (!modelState.IsValid)
                return false;

            if (!System.Web.Security.Membership.RequiresQuestionAndAnswer)
            {
                modelState["PasswordAnswer"].Errors.Clear();
                modelState["PasswordQuestion"].Errors.Clear();
            }

            IUserDao memberShipDao = OrnamentContext.Current.MemberShipFactory().CreateUserDao();
            User user = memberShipDao.GetByLoginId(LoginId);

            if (user != null)
            {
                modelState["LoginId"].Errors.Add(Message.alertMsg_duplicate_loginId);
                return false;
            }

            //check duplicate email address
            user = memberShipDao.GetUserByEmail(Email);
            if (user != null)
            {
                modelState["Email"].Errors.Add(Message.alertMsg_duplicate_Email);
                return false;
            }

            try
            {
                user = new User(LoginId, Password)
                    {
                        IsApproved = IsApproved,
                        Email = Email,
                    };
                if (System.Web.Security.Membership.RequiresQuestionAndAnswer)
                {
                    user.SetQuestionAndAnswer(PasswordQuestion, PasswordAnswer);
                }
                memberShipDao.SaveOrUpdate(user);
                memberShipDao.Flush();
                LoginByUser(formsAuth, user);
                return true;
            }
            catch (Exception ex)
            {
                modelState.AddModelError("_FORM", ex.Message);
                return false;
            }
        }

        protected virtual void LoginByUser(IFormsAuthentication formsAuth, User user)
        {
            formsAuth.SignIn(user.Id.ToString(), false /* createPersistentCookie */);
        }
    }
}