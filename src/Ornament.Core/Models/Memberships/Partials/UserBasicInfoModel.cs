using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web.Mvc;
using MultiLanguage;
using Ornament.MemberShip;
using Ornament.MemberShip.Languages;

namespace Ornament.Models.Memberships.Partials
{
    public class UserBasicInfoModel
    {
        private Role[] _roles;
        private UserGroup[] _userGroups;

        public UserBasicInfoModel()
        {
        }

        public UserBasicInfoModel(User user)
        {
            LoginId = user.LoginId;
            Email = user.Email;
            UserGroups = user.GetUserGroups().ToArray();
            Roles = user.GetRoles().ToArray();
            this.IsApprove = user.IsApproved;
            this.IsLock = user.IsLockout;
        }

        /// <summary>
        /// </summary>
        [Display(Name = "LoginId", ResourceType = typeof(MembershipCommon))]
        [Required(ErrorMessageResourceName = "error_MissLoginId", ErrorMessageResourceType = typeof(MemberShipModel))]
        [RegularExpression(@"^[a-zA-z1-9_-]{1,20}", ErrorMessageResourceName = "LoginNotCorrectFormat",
            ErrorMessageResourceType = typeof(ErrorMessage))]
        [UIHint("String")]
        public string LoginId { get; set; }

        /// <summary>
        /// </summary>
        [Display(Name = "Email", ResourceType = typeof(MembershipCommon))]
        [Required(ErrorMessageResourceName = "error_missingEmailAddress",
            ErrorMessageResourceType = typeof(MemberShipModel))]
        [RegularExpression(@"\b[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,4}\b",
            ErrorMessageResourceName = "EmailNotRightFormat",
            ErrorMessageResourceType = typeof(ErrorMessage))]
        [DataType(DataType.EmailAddress)]
        [UIHint("String")]
        public string Email { get; set; }

        [UIHint("RoleMultiSelect")]
        [Display(Name = "Role", ResourceType = typeof(MembershipCommon))]
        public Role[] Roles
        {
            get { return _roles ?? new Role[0]; }
            set { _roles = value; }
        }

        [UIHint("UsergroupMultiSelect")]
        [Display(Name = "UserGroup", ResourceType = typeof(MembershipCommon))]
        public UserGroup[] UserGroups
        {
            get { return _userGroups ?? new UserGroup[0]; }
            set { _userGroups = value; }
        }

        [UIHint("bool")]
        public bool IsApprove { get; set; }
        [UIHint("bool")]
        public bool IsLock { get; set; }

        public void UpdateOn(User user)
        {
            if (user == null)
                throw new ArgumentNullException("user");
            user.Email = Email;
            user.ClearRole();
            user.IsApproved = this.IsApprove;
            user.IsLockout = this.IsLock;
            foreach (Role role in Roles)
            {
                if (role == null)
                    continue;
                user.AddRole(role);
            }
            user.ClearUserGroup();
            foreach (UserGroup ug in UserGroups)
            {
                if (ug == null)
                    continue;
                user.AddToUserGroup(ug);
            }
        }
    }
}