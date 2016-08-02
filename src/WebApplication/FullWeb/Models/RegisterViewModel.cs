#region Using

using System.ComponentModel.DataAnnotations;

#endregion

namespace FullWeb.Models
{
    public class RegisterViewModel
    {
        [Display(ResourceType = typeof(Ornament.Identity.Resource), Name = "LoginId")]
        public string Username { get; set; }

        [Required]
        [EmailAddress]
        [Display(ResourceType = typeof(Ornament.Identity.Resource), Name = "Email")]

        public string Email { get; set; }

        [Required]
        [EmailAddress]
        [Compare("Email")]
        [Display(ResourceType = typeof(Ornament.Identity.Resource), Name = "EmailConfirm")]
        public string EmailConfirm { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password", ResourceType = typeof(Ornament.Identity.Resource))]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "PasswordConfirm", ResourceType = typeof(Ornament.Identity.Resource))]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
    }
}