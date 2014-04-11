using System.ComponentModel.DataAnnotations;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.MemberShipProviders;
using Ornament.MemberShip.Plugin.Properties;

namespace Ornament.MemberShip.Plugin.Models.Memberships
{
    public class LogonModel
    {
        public string ReturnUrl { get; set; }

        [Required(ErrorMessageResourceName = "error_MissLoginId", ErrorMessageResourceType = typeof(Resources))]
        [Display(Name = "LoginId", ResourceType = typeof(MemberShip.Properties.Resources))]
        public string User { get; set; }

        [Required(ErrorMessageResourceName = "error_MissPassword", ErrorMessageResourceType = typeof(Resources))]
        [Display(Name = "Password", ResourceType = typeof(MemberShip.Properties.Resources))]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Display(Name = "RememberMe", ResourceType = typeof(Resources))]
        public bool RememberMe { get; set; }

        [Display(Name = "VerifyCode", ResourceType = typeof(Resources))]
        [VerifyCodeRequire(ErrorMessageResourceName = "alertMsg_requireVerifyCode",
            ErrorMessageResourceType = typeof(Resources))]
        [UIHint("VerifyCode")]
        public string VerifyCodde { get; set; }

        public bool Validate(out string errorMessage, IUserDao userDao, string expectVerifyCode)
        {
            if (OrnamentContext.Configuration.ApplicationSetting.EnableVerifyCode)
            {
                if (string.IsNullOrEmpty(expectVerifyCode))
                {
                    errorMessage = Resources.error_expireVerifyCode;
                    return false;
                }
                if (expectVerifyCode.ToLower() != VerifyCodde.ToLower())
                {
                    errorMessage = Resources.error_notMatchVerifyCode;
                    return false;
                }
            }
            User u = userDao.GetByLoginId(User);
            if (u == null)
            {
                errorMessage = MemberShip.Properties.Resources.error_LoginError;
                return false;
            }
            ValidateUserResult result = u.Security.ValidateUser(Password, out errorMessage);
            OrnamentContext.MemberShip.SwitchLanguage(u.Language);
            return result == ValidateUserResult.Success;
        }
    }
}