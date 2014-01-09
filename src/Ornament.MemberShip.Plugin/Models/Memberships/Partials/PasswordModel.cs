using System.ComponentModel.DataAnnotations;
using Ornament.MemberShip.Plugin.Properties;

namespace Ornament.MemberShip.Plugin.Models.Memberships.Partials
{
    public class PasswordModel
    {
        [Display(Name = "Password", ResourceType = typeof(Properties.Resources))]
        [Required(ErrorMessageResourceName = "alertMsg_Require_NewPassword",
            ErrorMessageResourceType = typeof(Properties.Resources))]
        [DataType(DataType.Password)]
        [UIHint("Password")]
        public string Password { get; set; }

        /// <summary>
        /// </summary>
        [Display(Name = "ConfirmPassword", ResourceType = typeof(Properties.Resources))]
        [DataType(DataType.Password)]
        [Required(ErrorMessageResourceType = typeof(Properties.Resources), ErrorMessageResourceName = "error_MissPassword")]
        [Compare("Password", ErrorMessageResourceName = "alertMsg_Confirm_Password_Not_Equal_New_password",
            ErrorMessageResourceType = typeof(Properties.Resources))]
        [UIHint("Password")]
        public string ConfirmPassword { get; set; }
    }
}