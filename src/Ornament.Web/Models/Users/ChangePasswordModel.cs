using System.ComponentModel.DataAnnotations;
using MultiLanguage;
using Ornament.MemberShip.Languages;

namespace Ornament.Web.MemberShips.Models.Users
{
    public class ChangePasswordModel
    {
       
        [Required(ErrorMessageResourceName = "alertMsg_Require_OldPassword",
            ErrorMessageResourceType = typeof (Message))]
        [Display(Name = "CurrentPassword", ResourceType = typeof (MembershipCommon))]
        [DataType(DataType.Password)]
        public string CurrentPassword { get; set; }

        [Display(Name = "NewPassword", ResourceType = typeof (MembershipCommon))]
        [Required(ErrorMessageResourceName = "alertMsg_Require_NewPassword",
            ErrorMessageResourceType = typeof (Message))]
        [DataType(DataType.Password)]
        public string NewPassword { get; set; }


        [Display(Name = "ConfirmPassword", ResourceType = typeof (MembershipCommon))]
        [DataType(DataType.Password)]
        [Required(ErrorMessageResourceType = typeof (Message),
            ErrorMessageResourceName = "alert_Require_ConfirmPassword")]
        [Compare("NewPassword", ErrorMessageResourceName = "alertMsg_Confirm_Password_Not_Equal_New_password",
            ErrorMessageResourceType = typeof (Message))]
        public string ConfirmPassword { get; set; }
    }
}