using System.ComponentModel.DataAnnotations;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.Validations;

namespace Ornament.Models.Memberships
{
    public class LogonModel
    {
        public string ReturnUrl { get; set; }

        [Required(ErrorMessageResourceName = "error_MissLoginId", ErrorMessageResourceType = typeof(Ornament.Properties.Resources))]
        [Display(Name = "LoginId", ResourceType = typeof(Ornament.Properties.Resources))]
        public string User { get; set; }

        [Required(ErrorMessageResourceName = "error_MissPassword", ErrorMessageResourceType = typeof(Ornament.Properties.Resources))]
        [Display(Name = "Password", ResourceType = typeof(Ornament.Properties.Resources))]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Display(Name = "RememberMe", ResourceType = typeof(Ornament.Properties.Resources))]
        public bool RememberMe { get; set; }

        [Display(Name = "VerifyCode", ResourceType = typeof (Ornament.Properties.Resources))]
        [VerifyCodeRequire(ErrorMessageResourceName = "alertMsg_requireVerifyCode",
            ErrorMessageResourceType = typeof (Ornament.Properties.Resources))]
        [UIHint("VerifyCode")]
        public string VerifyCodde { get; set; }

        public bool Validate(out string errorMessage, IUserDao userDao, string expectVerifyCode)
        {
            if (OrnamentContext.Configuration.ApplicationSetting.EnableVerifyCode)
            {
                if (expectVerifyCode.ToLower() != VerifyCodde.ToLower())
                {
                    errorMessage = Ornament.Properties.Resources.error_notMatchVerifyCode;
                    return false;
                }
            }

            errorMessage = null;
            User u = userDao.GetByLoginId(User);
            if (u == null)
            {
                errorMessage = Ornament.Properties.Resources.error_LoginError;
                return false;
            }
            if (u.IsLockout)
            {
                errorMessage = Ornament.Properties.Resources.error_UserIsLockout;
                return false;
            }

            if (!u.IsApproved)
            {
                errorMessage = Ornament.Properties.Resources.error_UserIsNotApproved;
                return false;
            }


            bool result = u.ValidateUser(Password);
            if (!result)
            {
                errorMessage = Ornament.Properties.Resources.error_LoginError;
                return false;
            }
            return true;
        }
    }
}