#region Using

using System.ComponentModel.DataAnnotations;

#endregion

namespace FullWeb.Models
{
    public class ExternalLoginConfirmationViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}