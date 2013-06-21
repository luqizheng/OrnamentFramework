using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;
using MultiLanguage;
using Ornament.MemberShip.Languages;
using Ornament.Models.Memberships.Partials;

namespace Ornament.Models.Memberships
{
    public class RegistAccount
    {

        private PasswordModel _password;
        private UserBasicInfoModel _userBasicInfo;
        /// <summary>
        /// </summary>
        [Display(Name = "LoginId", ResourceType = typeof(MembershipCommon))]
        [Required(ErrorMessageResourceName = "error_MissLoginId", ErrorMessageResourceType = typeof(MemberShipModel))]
        [RegularExpression(@"^[a-zA-z1-9_-]{1,20}", ErrorMessageResourceName = "LoginNotCorrectFormat",
            ErrorMessageResourceType = typeof(ErrorMessage))]
        [UIHint("String")]
        [Remote("NotDuplicate", "User")]
        public string LoginId { get; set; }
        /// <summary>
        ///     Gets or sets the UserBais
        /// </summary>
        public UserBasicInfoModel UserBasicInfo
        {
            get { return _userBasicInfo ?? (_userBasicInfo = new UserBasicInfoModel()); }
            set { _userBasicInfo = value; }
        }

        public PasswordModel Password
        {
            get { return _password ?? (_password = new PasswordModel()); }
            set { _password = value; }
        }
       
    }
}