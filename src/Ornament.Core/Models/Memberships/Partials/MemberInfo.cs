using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;
using Ornament.MemberShip.Languages;
using Ornament.Properties;

namespace Ornament.Models.Memberships.Partials
{
    public class MemberInfo
    {
        /// <summary>
        /// </summary>
        [Display(Name = "LoginId", ResourceType = typeof (Resources))]
        [Required(ErrorMessageResourceName = "error_MissLoginId", ErrorMessageResourceType = typeof (Resources))]
        [RegularExpression(@"^[a-zA-z1-9_-]{1,20}", ErrorMessageResourceName = "LoginNotCorrectFormat",
            ErrorMessageResourceType = typeof (ErrorMessage))]
        [UIHint("String")]
        [Remote("NotDuplicate", "User", "MemberShips", AdditionalFields = "Id",
            ErrorMessageResourceName = "alertMsg_duplicate_loginId",
            ErrorMessageResourceType = typeof (Resources))]
        public string LoginId { get; set; }

        public string Id { get; set; }

        /// <summary>
        /// </summary>
        [Display(Name = "Email", ResourceType = typeof (Resources))]
        [Required(ErrorMessageResourceName = "error_missingEmailAddress",
            ErrorMessageResourceType = typeof (Resources))]
        [RegularExpression(@"\b[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,4}\b",
            ErrorMessageResourceName = "EmailNotRightFormat",
            ErrorMessageResourceType = typeof (ErrorMessage))]
        [DataType(DataType.EmailAddress)]
        [UIHint("String")]
        [Remote("NotDuplicateEmail", "User", "MemberShips", AdditionalFields = "Id",
            ErrorMessageResourceType = typeof (Resources), ErrorMessageResourceName = "alertMsg_duplicate_Email")]
        public string Email { get; set; }
    }
}