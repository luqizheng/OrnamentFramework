using System.ComponentModel.DataAnnotations;
using MultiLanguage;
using Ornament.MemberShip.Languages;


namespace Ornament.Models.Memberships.Partials
{
    public class PasswordModel
    {
        [Display(Name = "Password", ResourceType = typeof(MemberShipModel))]
        [Required(ErrorMessageResourceName = "alertMsg_Require_NewPassword",
            ErrorMessageResourceType = typeof(MemberShipModel))]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [Display(Name = "ConfirmPassword", ResourceType = typeof(MemberShipModel))]
        [DataType(DataType.Password)]
        [Required(ErrorMessageResourceType = typeof(MemberShipModel), ErrorMessageResourceName = "error_MissPassword")]
        [Compare("Password", ErrorMessageResourceName = "alertMsg_Confirm_Password_Not_Equal_New_password",
            ErrorMessageResourceType = typeof(MemberShipModel))]
        public string ConfirmPassword { get; set; }

        
    }
}
