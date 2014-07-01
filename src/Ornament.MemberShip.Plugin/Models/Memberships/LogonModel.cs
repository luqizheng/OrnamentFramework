using System.ComponentModel.DataAnnotations;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.MemberShipProviders;
using Ornament.MemberShip.Plugin.Properties;
using Ornament.Web.HttpModel;

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
            User user = userDao.GetByLoginId(User);
            if (user == null)
            {
                errorMessage = MemberShip.Properties.Resources.error_LoginError;
                return false;
            }
            ValidateUserResult result = user.Security.ValidateUser(Password, out errorMessage);
            var cookieLanguae = OrnamentContext.MemberShip.CurrentLanguage();
            if (cookieLanguae != null && user.Language != cookieLanguae)
            {
                OrnamentContext.MemberShip.SwitchLanguage(cookieLanguae);
            }

            return result == ValidateUserResult.Success;
        }
    }
}