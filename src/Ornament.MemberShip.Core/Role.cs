using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Iesi.Collections.Generic;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Languages;
using Ornament.MemberShip.Permissions;
using Qi.Domain;

namespace Ornament.MemberShip
{
    [Serializable]
    public class Role : DomainObject<Role, string>, IPerformer
    {
        private string _name;

        private Iesi.Collections.Generic.ISet<Permission> _permissions;
        private string _remark;

        public Role()
        {
        }

        /// <summary>
        /// </summary>
        /// <param name="roleName"></param>
        /// <exception cref="ArgumentNullException">roleName is null or length is 0</exception>
        public Role(string roleName)
        {
            if (String.IsNullOrWhiteSpace(roleName))
                throw new ArgumentNullException("roleName");
            Name = roleName;
        }


        /// <summary>
        ///     Gets or sets remark
        /// </summary>
        [Display(Name = "Remark", ResourceType = typeof (MembershipCommon))]
        [StringLength(100, ErrorMessageResourceType = typeof (ErrorMessage),
            ErrorMessageResourceName = "RoleRemarkOverMaxLength")]
        public string Remark
        {
            get { return _remark; }
            set
            {
                if (!String.IsNullOrEmpty(value))
                {
                    if (value.Length > 100)
                    {
                        throw new ArgumentOutOfRangeException("value", value.Length,
                                                              "Comment 's length should be less than 100");
                    }
                    _remark = value;
                }
            }
        }

        public Iesi.Collections.Generic.ISet<Permission> Permissions
        {
            get { return _permissions ?? (_permissions = new HashedSet<Permission>()); }
        }

        #region IPerformer Members

        string IPerformer.Id
        {
            get { return Id; }
            set { throw new NotImplementedException("Can't set the User's Id"); }
        }

        IList<User> IPerformer.GetUsers(IMemberShipFactory factory)
        {
            return factory.CreateUserDao().GetUsersInRole(Name);
        }

        string IPerformer.Name
        {
            get { return Name; }
            set { Name = value; }
        }

        #endregion

        PerformerType IPerformer.Type
        {
            get { return PerformerType.Role; }
        }

        /// <summary>
        ///     Gets or sets the name of role.
        /// </summary>
        [Display(Name = "Name", ResourceType = typeof (MembershipCommon))]
        [Required(ErrorMessageResourceType = typeof (ErrorMessage), ErrorMessageResourceName = "RequireRoleName")]
        [StringLength(20, ErrorMessageResourceType = typeof (ErrorMessage),
            ErrorMessageResourceName = "RoleNameOverMaxLength")]
        public string Name
        {
            get { return _name; }
            set
            {
                if (value != null && value.Length > 20)
                    throw new ArgumentOutOfRangeException("value", value.Length, "Name's lenght over than 20");
                _name = value;
            }
        }

        public override int GetHashCode()
        {
            return (Name + Remark).GetHashCode();
        }
    }
}