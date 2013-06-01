using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Iesi.Collections.Generic;
using Ornament.MemberShip.Languages;
using Qi.Domain;

namespace Ornament.MemberShip
{
    /// <summary>
    /// </summary>
    [Serializable]
    public abstract class Member<T> : DomainObject<T, string>, IMember where T : DomainObject<T, string>
    {
        /// <summary>
        /// </summary>
        private string _name;

        /// <summary>
        /// </summary>
        private string _remark;

        /// <summary>
        /// </summary>
        private Iesi.Collections.Generic.ISet<Role> _roles;

        /// <summary>
        ///     Initializes a new instance of the <see cref="Member" /> class.
        /// </summary>
        protected Member()
        {
        }

        /// <summary>
        /// </summary>
        /// <param name="name"></param>
        protected Member(string name)
        {
            Name = name;
        }

        /// <summary>
        ///     Gets Roles belong to user only.
        /// </summary>
        /// <value>
        ///     The roles.
        /// </value>
        protected virtual Iesi.Collections.Generic.ISet<Role> Roles
        {
            get { return _roles ?? (_roles = new HashedSet<Role>()); }
        }

        #region IMember Members

        /// <summary>
        /// </summary>
        /// <exception cref="ArgumentOutOfRangeException">Name's length more than 30</exception>
        [Display(Name = "Name", ResourceType = typeof (MembershipCommon)),
         Required(ErrorMessageResourceName = "RequireName", ErrorMessageResourceType = typeof (ErrorMessage)),
         RegularExpression(".{1,30}", ErrorMessageResourceName = "NameOverMaxLength",
             ErrorMessageResourceType = typeof (ErrorMessage))]
        public virtual string Name
        {
            get { return _name; }

            set
            {
                if (value != null && value.Length > 30)
                {
                    throw new ArgumentOutOfRangeException("value", value.Length, "Name's length is more than 30");
                }

                _name = value;
            }
        }

        /// <summary>
        ///     Gets or sets Comment.
        /// </summary>
        /// <exception cref="ArgumentOutOfRangeException">
        /// </exception>
        /// <value>
        ///     The comment.
        /// </value>
        [Display(Name = "Remark", ResourceType = typeof (MembershipCommon)),
         RegularExpression(".{0,200}", ErrorMessageResourceName = "RemarkOverMaxLength",
             ErrorMessageResourceType = typeof (ErrorMessage))]
        public virtual string Remark
        {
            get { return _remark; }

            set
            {
                if (value != null && value.Length > 200)
                {
                    throw new ArgumentOutOfRangeException("value", value.Length, "Comment's length is more than 200");
                }

                _remark = value;
            }
        }

        /// <summary>
        ///     Gets Count.
        /// </summary>
        /// <value>
        ///     The count.
        /// </value>
        public virtual int RoleCount
        {
            get { return Roles.Count; }
        }

        /// <summary>
        ///     清楚所有Member与Role的关联
        /// </summary>
        public virtual void ClearRole()
        {
            Roles.Clear();
        }

        /// <summary>
        /// </summary>
        /// <returns>
        /// </returns>
        public virtual IEnumerable<Role> GetAllRoles()
        {
            return new List<Role>(_roles);
        }

        /// <summary>
        /// </summary>
        /// <param name="role">
        ///     The role.
        /// </param>
        /// <returns>
        /// </returns>
        /// <exception cref="ArgumentNullException">
        /// </exception>
        public virtual bool InRole(Role role)
        {
            if (role == null)
            {
                throw new ArgumentNullException("role");
            }

            return Roles.Contains(role);
        }

        /// <summary>
        /// </summary>
        /// <param name="role">
        ///     The role.
        /// </param>
        /// <returns>
        /// </returns>
        /// <exception cref="ArgumentNullException">
        /// </exception>
        public virtual bool AddRole(Role role)
        {
            if (role == null)
            {
                throw new ArgumentNullException("role");
            }

            return Roles.Add(role);
        }

        /// <summary>
        /// </summary>
        /// <param name="role">
        ///     The role.
        /// </param>
        /// <returns>
        /// </returns>
        /// <exception cref="ArgumentNullException">
        /// </exception>
        public virtual bool RemoveRole(Role role)
        {
            if (role == null)
            {
                throw new ArgumentNullException("role");
            }

            return Roles.Remove(role);
        }

        public virtual bool OneOf(Role[] roles, Func<Role, bool> matchRoleHandler)
        {
            bool found = false;
            foreach (Role role in GetAllRoles())
            {
                foreach (Role inputRole in roles)
                {
                    if (role == inputRole)
                    {
                        if (!found)
                        {
                            found = true;
                        }
                        if (!matchRoleHandler(role))
                            return true;
                    }
                }
            }
            return found;
        }

        #endregion

        public virtual bool OneOf(params
                                      Role[] roles)
        {
            return (from role1 in GetAllRoles() from role2 in roles where role1.Id == role2.Id select role1).Any();
        }

        /// <summary>
        /// </summary>
        /// <returns>
        /// </returns>
        public override int GetHashCode()
        {
            return (Name + Remark).GetHashCode();
        }

        public override string ToString()
        {
            return Name;
        }
    }
}