using System.ComponentModel.DataAnnotations;
using MultiLanguage;
using Ornament.MemberShip.Languages;


namespace Ornament.Models.Memberships
{
    public class ChangePasswordModel
    {
        [Required(ErrorMessageResourceName = "alertMsg_Require_OldPassword",
            ErrorMessageResourceType = typeof(MemberShipModel))]
        [Display(Name = "CurrentPassword", ResourceType = typeof (MemberShipModel))]
        [DataType(DataType.Password)]
        public string CurrentPassword { get; set; }

        [Display(Name = "NewPassword", ResourceType = typeof (MemberShipModel))]
        [Required(ErrorMessageResourceName = "alertMsg_Require_NewPassword",
            ErrorMessageResourceType = typeof(MemberShipModel))]
        [DataType(DataType.Password)]
        public string NewPassword { get; set; }


        [Display(Name = "ConfirmPassword", ResourceType = typeof (MemberShipModel))]
        [DataType(DataType.Password)]
        [Required(ErrorMessageResourceType = typeof(MemberShipModel),
            ErrorMessageResourceName = "alert_Require_ConfirmPassword")]
        [Compare("NewPassword", ErrorMessageResourceName = "alertMsg_Confirm_Password_Not_Equal_New_password",
            ErrorMessageResourceType = typeof(MemberShipModel))]
        public string ConfirmPassword { get; set; }
    }
}