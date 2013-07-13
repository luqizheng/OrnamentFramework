using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web.Mvc;
using Ornament.MemberShip;
using Ornament.MemberShip.Languages;
using Ornament.Properties;

namespace Ornament.Models.Memberships.Partials
{
    public class BasicInfo : MemberInfo
    {
        public BasicInfo()
        {
        }

        public BasicInfo(User user)
        {
            Name = user.Name;
            Phone = user.Contact.Phone;
            Email = user.Contact.Email;
            TimeZoneId = user.TimeZoneId;
            Language = Language;
            VerifyEmail = true;
        }

        [UIHint("String")]
        [Display(Name = "Phone", ResourceType = typeof (Resources))]
        public string Phone { get; set; }

        [UIHint("String")]
        [Display(Name = "Name", ResourceType = typeof (Resources)),
         RegularExpression(".{1,30}", ErrorMessageResourceName = "RequireName",
             ErrorMessageResourceType = typeof (ErrorMessage))]
        public string Name { get; set; }


        [UIHint("TimeZone")]
        public string TimeZoneId { get; set; }


       

        [Display(Name = "VerifyEmail", ResourceType = typeof (Resources))]
        public bool VerifyEmail { get; set; }

        [Display(Name = "Language", ResourceType = typeof (Resources))]
        public string Language { get; set; }

        public virtual void UpdateOn(User user)
        {
            user.Name = Name;
            user.Contact.Phone = Phone;
            user.TimeZoneId = TimeZoneId;
            if (user.Contact.Email != Email)
            {
                user.Contact.Email = Email;
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
            else
            {
                user.Contact.Email = Email;
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
            Remark = user.Remarks;
        }

        [UIHint("Textarea")]
        [Display(Name = "Remark", ResourceType = typeof (Resources)),
         RegularExpression(".{0,200}", ErrorMessageResourceName = "RemarkOverMaxLength",
             ErrorMessageResourceType = typeof (ErrorMessage))]
        public string Remark { get; set; }

        [UIHint("RoleMultiSelect")]
        [Display(Name = "Role", ResourceType = typeof (Resources))]
        public Role[] Roles
        {
            get { return _roles ?? new Role[0]; }
            set { _roles = value; }
        }

        [UIHint("OrgSelect")]
        public Org Org { get; set; }

        [UIHint("UsergroupMultiSelect")]
        [Display(Name = "UserGroup", ResourceType = typeof (Resources))]
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