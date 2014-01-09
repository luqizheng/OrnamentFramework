using System.ComponentModel.DataAnnotations;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Plugin.Properties;
using Ornament.Validations;

using Resources = Ornament.MemberShip.Plugin.Properties.Resources;

namespace Ornament.MemberShip.Plugin.Models.Memberships
{
    public class LogonModel
    {
        public string ReturnUrl { get; set; }

        [Required(ErrorMessageResourceName = "error_MissLoginId", ErrorMessageResourceType = typeof(Ornament.MemberShip.Plugin.Properties.Resources))]
        [Display(Name = "LoginId", ResourceType = typeof (Properties.Resources))]
        public string User { get; set; }

        [Required(ErrorMessageResourceName = "error_MissPassword", ErrorMessageResourceType = typeof(Properties.Resources))]
        [Display(Name = "Password", ResourceType = typeof (Properties.Resources))]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Display(Name = "RememberMe", ResourceType = typeof(Properties.Resources))]
        public bool RememberMe { get; set; }

        [Display(Name = "VerifyCode", ResourceType = typeof(Properties.Resources))]
        [VerifyCodeRequire(ErrorMessageResourceName = "alertMsg_requireVerifyCode",
            ErrorMessageResourceType = typeof(Properties.Resources))]
        [UIHint("VerifyCode")]
        public string VerifyCodde { get; set; }

        public bool Validate(out string errorMessage, IUserDao userDao, string expectVerifyCode)
        {
            if (OrnamentContext.Configuration.ApplicationSetting.EnableVerifyCode)
            {
                if (expectVerifyCode.ToLower() != VerifyCodde.ToLower())
                {
                    errorMessage = Properties.Resources.error_notMatchVerifyCode;
                    return false;
                }
            }

            errorMessage = null;
            User u = userDao.GetByLoginId(User);
            if (u == null)
            {
                errorMessage = Properties.Resources.error_LoginError;
                return false;
            }
            if (u.IsLockout)
            {
                errorMessage = Properties.Resources.error_UserIsLockout;
                return false;
            }

            if (!u.IsApproved)
            {
                errorMessage = Properties.Resources.error_UserIsNotApproved;
                return false;
            }


            bool result = u.Security.ValidateUser(Password);
            if (!result)
            {
                errorMessage = Properties.Resources.error_LoginError;
                return false;
            }
            return true;
        }
    }
}