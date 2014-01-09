using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Ornament.MemberShip.Languages;
using Ornament.MemberShip.Plugin.Properties;

namespace Ornament.MemberShip.Plugin.Models.Memberships.Partials
{
    public class PermissionInfo
    {
        private Role[] _roles;
        private UserGroup[] _userGroups;

        public PermissionInfo()
        {
        }

        public PermissionInfo(User user)
        {
            UserGroups = user.UserGroups.ToArray();
            Roles = user.GetRoles().ToArray();
            Org = user.Org;
            IsApprove = user.IsApproved;
            IsLock = user.IsLockout;
            Remark = user.Remarks;
        }

        [UIHint("Textarea")]
        [Display(Name = "Remark", ResourceType = typeof(Properties.Resources)),
         RegularExpression(".{0,200}", ErrorMessageResourceName = "RemarkOverMaxLength",
             ErrorMessageResourceType = typeof (ErrorMessage))]
        public string Remark { get; set; }

        [UIHint("RoleMultiSelect")]
        [Display(Name = "Role", ResourceType = typeof(Properties.Resources))]
        public Role[] Roles
        {
            get { return _roles ?? new Role[0]; }
            set { _roles = value; }
        }

        [UIHint("OrgSelect")]
        public Org Org { get; set; }

        [UIHint("UsergroupMultiSelect")]
        [Display(Name = "UserGroup", ResourceType = typeof(Properties.Resources))]
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

            user.Remarks = Remark;
            user.IsApproved = IsApprove;
            user.IsLockout = IsLock;
            user.Org = Org;

            user.Roles.Clear();
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