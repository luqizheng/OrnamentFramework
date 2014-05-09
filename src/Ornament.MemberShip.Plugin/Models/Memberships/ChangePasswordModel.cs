using System.ComponentModel.DataAnnotations;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.MemberShipProviders;
using Ornament.MemberShip.Plugin.Properties;

namespace Ornament.MemberShip.Plugin.Models.Memberships
{
    public class ChangePasswordModel
    {
        [Required(ErrorMessageResourceName = "alertMsg_Require_OldPassword",
            ErrorMessageResourceType = typeof(Resources))]
        [Display(Name = "CurrentPassword", ResourceType = typeof(MemberShip.Properties.Resources))]
        [DataType(DataType.Password), UIHint("Password")]
        public string CurrentPassword { get; set; }

        [Display(Name = "NewPassword", ResourceType = typeof(MemberShip.Properties.Resources))]
        [MinLength(6)]
        [Required(ErrorMessageResourceName = "alertMsg_Require_NewPassword",
            ErrorMessageResourceType = typeof(Resources))]
        [DataType(DataType.Password), UIHint("Password")]
        [RegularExpression(@"[\dA-z\-`=\[\];',./~!@#$%^&*()_+|{}:""<>?]{6,30}",
            ErrorMessageResourceName = "alertPassword_CharError",
            ErrorMessageResourceType = typeof(Resources))]
        public string NewPassword { get; set; }


        [Display(Name = "ConfirmPassword", ResourceType = typeof(MemberShip.Properties.Resources))]
        [DataType(DataType.Password), UIHint("Password")]
        [Required(ErrorMessageResourceType = typeof(Resources),
            ErrorMessageResourceName = "alert_Require_ConfirmPassword")]
        [Compare("NewPassword",
            ErrorMessageResourceName = "alertMsg_Confirm_Password_Not_Equal_New_password",
            ErrorMessageResourceType = typeof(Resources))]
        public string ConfirmPassword { get; set; }

        public bool ChangePassword(User user, IUserDao dao)
        {
            if (ConfirmPassword != ConfirmPassword)
            {
                return false;
            }
            string message;
            if (user.Security.ValidateUser(CurrentPassword, out message) != ValidateUserResult.Success)
            {
                return false;
            }
            bool result = user.Security.ChangePassword(NewPassword, CurrentPassword);
            dao.SaveOrUpdate(user);
            return result;
        }
    }
}