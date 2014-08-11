using System.ComponentModel.DataAnnotations;
using Ornament.MemberShip.Properties;
using Ornament.MemberShip.Validations;

namespace Ornament.MemberShip.Plugin.Models.Memberships.Partials
{
    public class PasswordModel
    {
        [Display(Name = "NewPassword", ResourceType = typeof (Resources))]
        [Required(ErrorMessageResourceName = "alertMsg_Require_NewPassword",
            ErrorMessageResourceType = typeof (Properties.Resources))]
        [DataType(DataType.Password), UIHint("Password")]
        [PasswordValidation(ErrorMessageResourceName = "alertPassword_CharError", ErrorMessageResourceType = typeof(Properties.Resources))]
        public string NewPassword { get; set; }


        [Display(Name = "ConfirmPassword", ResourceType = typeof (Resources))]
        [DataType(DataType.Password), UIHint("Password")]
        [Required(ErrorMessageResourceType = typeof (Properties.Resources),
            ErrorMessageResourceName = "alert_Require_ConfirmPassword")]
        [Compare("NewPassword",
            ErrorMessageResourceName = "alertMsg_Confirm_Password_Not_Equal_New_password",
            ErrorMessageResourceType = typeof (Properties.Resources))]
        public string ConfirmPassword { get; set; }
    }
}