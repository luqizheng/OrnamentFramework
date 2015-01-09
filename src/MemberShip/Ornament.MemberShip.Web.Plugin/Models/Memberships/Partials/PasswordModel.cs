using System.ComponentModel.DataAnnotations;
using Ornament.MemberShip.Properties;
using Ornament.MemberShip.Validations;


namespace Ornament.MemberShip.Web.Plugin.Models.Memberships.Partials
{
    public class PasswordModel
    {
        [Display(Name = "NewPassword", ResourceType = typeof (Resources))]
        [Required(ErrorMessageResourceName = "alertMsg_Require_NewPassword",
            ErrorMessageResourceType = typeof (MemberShip.Web.Plugin.Properties.Resources))]
        [DataType(DataType.Password)]
        [PasswordValidation(ErrorMessageResourceName = "alertPassword_CharError", ErrorMessageResourceType = typeof(MemberShip.Properties.Resources))]
        public string NewPassword { get; set; }


        [Display(Name = "ConfirmPassword", ResourceType = typeof (Resources))]
        [DataType(DataType.Password)]
        [Required(ErrorMessageResourceType = typeof(MemberShip.Web.Plugin.Properties.Resources),
            ErrorMessageResourceName = "alert_Require_ConfirmPassword")]
        [Compare("NewPassword",
            ErrorMessageResourceName = "alertMsg_Confirm_Password_Not_Equal_New_password",
            ErrorMessageResourceType = typeof(MemberShip.Web.Plugin.Properties.Resources))]
        public string ConfirmPassword { get; set; }
    }
}