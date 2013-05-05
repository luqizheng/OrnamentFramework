using System.ComponentModel.DataAnnotations;
using System.Linq;
using MultiLanguage;
using Ornament.MemberShip;
using Ornament.MemberShip.Languages;

namespace Ornament.Models.Memberships.Partials
{
    public class UserBasicInfoModel
    {
        public UserBasicInfoModel()
        {
        }

        public UserBasicInfoModel(User user)
        {
            LoginId = user.LoginId;
            Email = user.Email;
            UserGroups = user.GetUserGroups().ToArray();
            Roles = user.GetRoles().ToArray();
        }

        /// <summary>
        /// </summary>
        [Display(Name = "LoginId", ResourceType = typeof (MembershipCommon))]
        [Required(ErrorMessageResourceName = "error_MissLoginId", ErrorMessageResourceType = typeof (MemberShipModel))]
        [RegularExpression(@"^[a-zA-z1-9_-]{1,20}", ErrorMessageResourceName = "LoginNotCorrectFormat",
            ErrorMessageResourceType = typeof (ErrorMessage))]
        public string LoginId { get; set; }

        /// <summary>
        /// </summary>
        [Display(Name = "Email", ResourceType = typeof (MembershipCommon))]
        [Required(ErrorMessageResourceName = "error_missingEmailAddress",
            ErrorMessageResourceType = typeof (MemberShipModel))]
        [RegularExpression(@"\b[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,4}\b",
            ErrorMessageResourceName = "EmailNotRightFormat",
            ErrorMessageResourceType = typeof (ErrorMessage))]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Display(Name = "Role", ResourceType = typeof (MembershipCommon))]
        public Role[] Roles { get; set; }

        [Display(Name = "UserGroup", ResourceType = typeof (MembershipCommon))]
        public UserGroup[] UserGroups { get; set; }
    }
}