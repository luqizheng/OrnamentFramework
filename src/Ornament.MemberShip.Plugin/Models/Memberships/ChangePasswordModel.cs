using System.ComponentModel.DataAnnotations;
using Ornament.MemberShip.Plugin.Properties;

namespace Ornament.MemberShip.Plugin.Models.Memberships
{
    public class ChangePasswordModel
    {
        [Required(ErrorMessageResourceName = "alertMsg_Require_OldPassword",
            ErrorMessageResourceType = typeof (Resources))]
        [Display(Name = "CurrentPassword", ResourceType = typeof (Resources))]
        [DataType(DataType.Password)]
        public string CurrentPassword { get; set; }

        [Display(Name = "NewPassword", ResourceType = typeof (Resources))]
        [Required(ErrorMessageResourceName = "alertMsg_Require_NewPassword",
            ErrorMessageResourceType = typeof (Resources))]
        [DataType(DataType.Password)]
        public string NewPassword { get; set; }


        [Display(Name = "ConfirmPassword", ResourceType = typeof (Resources))]
        [DataType(DataType.Password)]
        [Required(ErrorMessageResourceType = typeof (Resources),
            ErrorMessageResourceName = "alert_Require_ConfirmPassword")]
        [Compare("NewPassword", ErrorMessageResourceName = "alertMsg_Confirm_Password_Not_Equal_New_password",
            ErrorMessageResourceType = typeof(Resources))]
        public string ConfirmPassword { get; set; }
    }
}