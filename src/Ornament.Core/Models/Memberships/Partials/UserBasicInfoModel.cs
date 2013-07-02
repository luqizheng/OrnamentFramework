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
            Email = user.Email;
            UserGroups = user.UserGroups.ToArray();
            Roles = user.GetRoles().ToArray();
            IsApprove = user.IsApproved;
            IsLock = user.IsLockout;
            LoginId = user.LoginId;
        }

        public string LoginId { get; set; }

        /// <summary>
        /// </summary>
        [Display(Name = "Email", ResourceType = typeof(MemberShipModel))]
        [Required(ErrorMessageResourceName = "error_missingEmailAddress",
            ErrorMessageResourceType = typeof(MemberShipModel))]
        [RegularExpression(@"\b[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,4}\b",
            ErrorMessageResourceName = "EmailNotRightFormat",
            ErrorMessageResourceType = typeof(ErrorMessage))]
        [DataType(DataType.EmailAddress)]
        [UIHint("String")]
        [Remote("NotDuplicateEmail", "User", "MemberShips", AdditionalFields = "LoginId",
            ErrorMessageResourceType = typeof(MemberShipModel), ErrorMessageResourceName = "alertMsg_duplicate_Email")]
        public string Email { get; set; }
      
        [UIHint("RoleMultiSelect")]
        [Display(Name = "Role", ResourceType = typeof(MemberShipModel))]
        public Role[] Roles
        {
            get { return _roles ?? new Role[0]; }
            set { _roles = value; }
        }

        [UIHint("OrgSelect")]
        public Org Org { get; set; }

        [UIHint("UsergroupMultiSelect")]
        [Display(Name = "UserGroup", ResourceType = typeof(MemberShipModel))]
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
            user.Roles.Clear();
            user.IsApproved = IsApprove;
            user.IsLockout = IsLock;
            user.Org = this.Org;
            foreach (Role role in Roles)
            {
                if (role == null)
                    continue;
                user.Roles.Add(role);
            }
            user.UserGroups.Clear();
            foreach (UserGroup ug in UserGroups)
            {
                if (ug == null)
                    continue;
                user.UserGroups.Add(ug);
            }
        }
    }
}