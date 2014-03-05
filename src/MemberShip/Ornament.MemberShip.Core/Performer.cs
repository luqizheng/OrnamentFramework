using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Iesi.Collections.Generic;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Properties;
using Qi.Domain;

namespace Ornament.MemberShip
{
    /// <summary>
    /// </summary>
    [Serializable]
    public abstract class Performer<T> :
        DomainObject<T, string>, IPerformer where T : DomainObject<T, string>
    {
        /// <summary>
        /// </summary>
        private string _name;

        /// <summary>
        /// </summary>
        private Iesi.Collections.Generic.ISet<Role> _roles;


        protected Performer()
        {
        }

        /// <summary>
        /// </summary>
        /// <param name="name"></param>
        protected Performer(string name)
        {
            Name = name;
        }

        /// <summary>
        ///     Gets Roles belong to user only.
        /// </summary>
        /// <value>
        ///     The roles.
        /// </value>
        public virtual Iesi.Collections.Generic.ISet<Role> Roles
        {
            get { return _roles ?? (_roles = new HashedSet<Role>()); }
        }

        string IPerformer.Id { get; set; }

        Iesi.Collections.Generic.ISet<Role> IPerformer.Roles
        {
            get { return Roles; }
            set { _roles = value; }
        }

        IList<User> IPerformer.GetUsers(IMemberShipFactory memberShipFactory)
        {
            return GetInsideUsers(memberShipFactory);
        }


        string IPerformer.Type
        {
            get { return GetPerformerType(); }
        }

        protected abstract string GetPerformerType();

        protected abstract IList<User> GetInsideUsers(IMemberShipFactory memberShipFactory);

        public virtual bool OneOf(params
            Role[] roles)
        {
            return (from role1 in Roles from role2 in roles where role1.Id == role2.Id select role1).Any();
        }


        public override string ToString()
        {
            return Name;
        }

        #region IMember Members

        /// <summary>
        ///     Gets or sets Comment.
        /// </summary>
        /// <exception cref="ArgumentOutOfRangeException">
        /// </exception>
        /// <value>
        ///     The comment.
        /// </value>
        [Display(Name = "Remark", ResourceType = typeof (Resources)),
         RegularExpression(".{0,200}", ErrorMessageResourceName = "RemarkOverMaxLength",
             ErrorMessageResourceType = typeof(Resources))]
        [UIHint("Textarea")]
        public virtual string Remarks { get; set; }


        /// <summary>
        /// </summary>
        /// <exception cref="ArgumentOutOfRangeException">Name's length more than 30</exception>
        [Display(Name = "Name", ResourceType = typeof (Resources)),
         Required(ErrorMessageResourceName = "RequireName", ErrorMessageResourceType = typeof(Resources)),
         RegularExpression(".{1,30}", ErrorMessageResourceName = "NameOverMaxLength",
             ErrorMessageResourceType = typeof(Resources))]
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

        public abstract IEnumerable<Role> GetAllRoles();

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
    }
}