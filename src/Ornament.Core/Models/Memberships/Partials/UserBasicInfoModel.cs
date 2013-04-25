using System.ComponentModel.DataAnnotations;
using MultiLanguage;
using Ornament.MemberShip;
using Ornament.MemberShip.Languages;

namespace Ornament.Models.Memberships.Partials
{
    public class UserBasicInfoModel
    {
        /// <summary>
        /// 
        /// </summary>
        [Display(Name = "LoginId", ResourceType = typeof(MembershipCommon))]
        [Required(ErrorMessageResourceName = "error_MissLoginId", ErrorMessageResourceType = typeof(MemberShipModel))]
        [RegularExpression(@"^[a-zA-z1-9_-]{1,20}", ErrorMessageResourceName = "LoginNotCorrectFormat",
            ErrorMessageResourceType = typeof(ErrorMessage))]
        public string LoginId { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [Display(Name = "Email", ResourceType = typeof(MembershipCommon))]
        [Required(ErrorMessageResourceName = "error_missingEmailAddress", ErrorMessageResourceType = typeof(MemberShipModel))]
        [RegularExpression(@"\b[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,4}\b",
            ErrorMessageResourceName = "EmailNotRightFormat",
            ErrorMessageResourceType = typeof(ErrorMessage))]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }


        public Role[] Roles { get; set; }
        public UserGroup[] UserGroups { get; set; }
       
    }
}
