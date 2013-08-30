using System.ComponentModel.DataAnnotations;
using Ornament.Properties;

namespace Ornament.Models.Memberships.Partials
{
    public class PasswordModel
    {
        [Display(Name = "Password", ResourceType = typeof (Resources))]
        [Required(ErrorMessageResourceName = "alertMsg_Require_NewPassword",
            ErrorMessageResourceType = typeof (Resources))]
        [DataType(DataType.Password)]
        [UIHint("Password")]
        public string Password { get; set; }

        /// <summary>
        /// </summary>
        [Display(Name = "ConfirmPassword", ResourceType = typeof (Resources))]
        [DataType(DataType.Password)]
        [Required(ErrorMessageResourceType = typeof (Resources), ErrorMessageResourceName = "error_MissPassword")]
        [Compare("Password", ErrorMessageResourceName = "alertMsg_Confirm_Password_Not_Equal_New_password",
            ErrorMessageResourceType = typeof (Resources))]
        [UIHint("Password")]
        public string ConfirmPassword { get; set; }
    }
}