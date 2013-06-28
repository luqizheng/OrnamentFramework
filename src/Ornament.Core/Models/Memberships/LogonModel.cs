using System.ComponentModel.DataAnnotations;
using MultiLanguage;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.Validations;

namespace Ornament.Models.Memberships
{
    public class LogonModel
    {
        public string ReturnUrl { get; set; }

        [Required(ErrorMessageResourceName = "error_MissLoginId", ErrorMessageResourceType = typeof(MemberShipModel))]
        [Display(Name = "LoginId", ResourceType = typeof(MemberShipModel))]
        public string User { get; set; }

        [Required(ErrorMessageResourceName = "error_MissPassword", ErrorMessageResourceType = typeof(MemberShipModel))]
        [Display(Name = "Password", ResourceType = typeof(MemberShipModel))]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Display(Name = "RememberMe", ResourceType = typeof(MemberShipModel))]
        public bool RememberMe { get; set; }

        [Display(Name = "VerifyCode", ResourceType = typeof(MemberShipModel))]
        [VerifyCodeRequire(ErrorMessageResourceName = "alertMsg_requireVerifyCode", ErrorMessageResourceType = typeof(MemberShipModel))]
        [UIHint("VerifyCode")]
        public string VerifyCodde { get; set; }

        public bool Validate(out string errorMessage, IUserDao userDao, string expectVerifyCode)
        {
            if (OrnamentContext.Configuration.ApplicationSetting.EnableVerifyCode)
            {
                if (expectVerifyCode.ToLower() != VerifyCodde.ToLower())
                {
                    errorMessage = MemberShipModel.error_notMatchVerifyCode;
                    return false;

                }
            }

            errorMessage = null;
            User u = userDao.GetByLoginId(User);
            if (u == null)
            {
                errorMessage = MemberShipModel.error_LoginError;
                return false;
            }
            if (u.IsLockout)
            {
                errorMessage = MemberShipModel.error_UserIsLockout;
                return false;
            }

            if (!u.IsApproved)
            {
                errorMessage = MemberShipModel.error_UserIsNotApproved;
                return false;
            }


            bool result = u.ValidateUser(Password);
            if (!result)
            {
                errorMessage = MemberShipModel.error_LoginError;
                return false;
            }
            return true;
        }
    }
}