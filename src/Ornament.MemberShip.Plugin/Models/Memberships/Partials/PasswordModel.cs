using System.ComponentModel.DataAnnotations;
using Ornament.MemberShip.Properties;
using Resources = Ornament.MemberShip.Plugin.Properties.Resources;

namespace Ornament.MemberShip.Plugin.Models.Memberships.Partials
{
    public class PasswordModel
    {
        [Display(Name = "NewPassword", ResourceType = typeof(MemberShip.Properties.Resources))]
        [MinLength(6)]
        [Required(ErrorMessageResourceName = "alertMsg_Require_NewPassword",
            ErrorMessageResourceType = typeof(Properties.Resources))]
        [DataType(DataType.Password), UIHint("Password")]
        [RegularExpression(@"[\dA-z\-`=\[\];',./~!@#$%^&*()_+|{}:""<>?]{6,30}",
            ErrorMessageResourceName = "alertPassword_CharError",
            ErrorMessageResourceType = typeof(Properties.Resources))]
        public string NewPassword { get; set; }


        [Display(Name = "ConfirmPassword", ResourceType = typeof(MemberShip.Properties.Resources))]
        [DataType(DataType.Password), UIHint("Password")]
        [Required(ErrorMessageResourceType = typeof(Properties.Resources),
            ErrorMessageResourceName = "alert_Require_ConfirmPassword")]
        [Compare("NewPassword",
            ErrorMessageResourceName = "alertMsg_Confirm_Password_Not_Equal_New_password",
            ErrorMessageResourceType = typeof(Resources))]
        public string ConfirmPassword { get; set; }
    }
}