using System.ComponentModel.DataAnnotations;
using MultiLanguage;
using Ornament.MemberShip.Languages;

namespace Ornament.Models.Memberships.Partials
{
    public class PasswordModel
    {
        [Display(Name = "Password", ResourceType = typeof(MembershipCommon))]
        [Required(ErrorMessageResourceName = "alertMsg_Require_NewPassword",
            ErrorMessageResourceType = typeof(Message))]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [Display(Name = "ConfirmPassword", ResourceType = typeof(MembershipCommon))]
        [DataType(DataType.Password)]
        [Required(ErrorMessageResourceType = typeof(Message), ErrorMessageResourceName = "error_MissPassword")]
        [Compare("Password", ErrorMessageResourceName = "alertMsg_Confirm_Password_Not_Equal_New_password",
            ErrorMessageResourceType = typeof(Message))]
        public string ConfirmPassword { get; set; }
    }
}
