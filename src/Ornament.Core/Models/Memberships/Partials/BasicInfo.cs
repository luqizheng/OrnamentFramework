using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web.Mvc;
using MultiLanguage;
using Ornament.MemberShip;
using Ornament.MemberShip.Languages;

namespace Ornament.Models.Memberships.Partials
{
    public class MemberInfo
    {
        /// <summary>
        /// </summary>
        [Display(Name = "LoginId", ResourceType = typeof (MemberShipModel))]
        [Required(ErrorMessageResourceName = "error_MissLoginId", ErrorMessageResourceType = typeof (MemberShipModel))]
        [RegularExpression(@"^[a-zA-z1-9_-]{1,20}", ErrorMessageResourceName = "LoginNotCorrectFormat",
            ErrorMessageResourceType = typeof (ErrorMessage))]
        [UIHint("String")]
        [Remote("NotDuplicate", "User", "MemberShips", ErrorMessageResourceName = "alertMsg_duplicate_loginId",
            ErrorMessageResourceType = typeof (MemberShipModel))]
        public string LoginId { get; set; }

        public string Id { get; set; }
    }

    public class BasicInfo : MemberInfo
    {
        [UIHint("String")]
        [Display(Name = "Phone", ResourceType = typeof (MemberShipModel))]
        public string Phone { get; set; }

        [UIHint("String")]
        [Display(Name = "Name", ResourceType = typeof (MemberShipModel)),
         RegularExpression(".{1,30}", ErrorMessageResourceName = "RequireName",
             ErrorMessageResourceType = typeof (ErrorMessage))]
        public string Name { get; set; }


        [UIHint("TimeZone")]
        public string TimeZone { get; set; }

        /// <summary>
        /// </summary>
        [Display(Name = "Email", ResourceType = typeof (MemberShipModel))]
        [Required(ErrorMessageResourceName = "error_missingEmailAddress",
            ErrorMessageResourceType = typeof (MemberShipModel))]
        [RegularExpression(@"\b[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,4}\b",
            ErrorMessageResourceName = "EmailNotRightFormat",
            ErrorMessageResourceType = typeof (ErrorMessage))]
        [DataType(DataType.EmailAddress)]
        [UIHint("String")]
        [Remote("NotDuplicateEmail", "User", "MemberShips", AdditionalFields = "LoginId",
            ErrorMessageResourceType = typeof (MemberShipModel), ErrorMessageResourceName = "alertMsg_duplicate_Email")]
        public string Email { get; set; }


        [Display(Name = "VerifyEmail", ResourceType = typeof (MemberShipModel))]
        public bool VerifyEmail { get; set; }

        public virtual void UpdateOn(User user)
        {
            user.Name = Name;
            user.Phone = Phone;
            if (user.Email != Email)
            {
                user.Email = Email;
                if (VerifyEmail)
                {
                    MemberSecrityManager token = MemberSecrityManager.CreateEmailChangedToken(user,
                                                                                              OrnamentContext
                                                                                                  .Configuration
                                                                                                  .ApplicationSetting
                                                                                                  .VerifyEmailTimeout);
                    token.SendToken();
                }
            }
        }
    }


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
        }

        [UIHint("Textarea")]
        [Display(Name = "Remark", ResourceType = typeof (MemberShipModel)),
         RegularExpression(".{0,200}", ErrorMessageResourceName = "RemarkOverMaxLength",
             ErrorMessageResourceType = typeof (ErrorMessage))]
        public string Remark { get; set; }

        [UIHint("RoleMultiSelect")]
        [Display(Name = "Role", ResourceType = typeof (MemberShipModel))]
        public Role[] Roles
        {
            get { return _roles ?? new Role[0]; }
            set { _roles = value; }
        }

        [UIHint("OrgSelect")]
        public Org Org { get; set; }

        [UIHint("UsergroupMultiSelect")]
        [Display(Name = "UserGroup", ResourceType = typeof (MemberShipModel))]
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