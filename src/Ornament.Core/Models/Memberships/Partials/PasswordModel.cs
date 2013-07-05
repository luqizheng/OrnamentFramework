using System.ComponentModel.DataAnnotations;

namespace Ornament.Models.Memberships.Partials
{
    public class PasswordModel
    {
        [Display(Name = "Password", ResourceType = typeof(Ornament.Properties.Resources))]
        [Required(ErrorMessageResourceName = "alertMsg_Require_NewPassword",
            ErrorMessageResourceType = typeof(Ornament.Properties.Resources))]
        [DataType(DataType.Password)]
        [UIHint("Password")]
        public string Password { get; set; }

        /// <summary>
        /// </summary>
        [Display(Name = "ConfirmPassword", ResourceType = typeof(Ornament.Properties.Resources))]
        [DataType(DataType.Password)]
        [Required(ErrorMessageResourceType = typeof(Ornament.Properties.Resources), ErrorMessageResourceName = "error_MissPassword")]
        [Compare("Password", ErrorMessageResourceName = "alertMsg_Confirm_Password_Not_Equal_New_password",
            ErrorMessageResourceType = typeof(Ornament.Properties.Resources))]
        [UIHint("Password")]
        public string ConfirmPassword { get; set; }
    }
}