using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Iesi.Collections.Generic;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Permissions;
using Ornament.MemberShip.Properties;

namespace Ornament.MemberShip
{
    [Serializable]
    public class Role : Performer<Role>
    {
        private Iesi.Collections.Generic.ISet<Permission> _permissions;


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

        [Display(Name = "Permission", ResourceType = typeof (Resources))]
        public virtual Iesi.Collections.Generic.ISet<Permission> Permissions
        {
            get { return _permissions ?? (_permissions = new HashedSet<Permission>()); }
        }

        #region IPerformer Members

        public override IEnumerable<Role> GetAllRoles()
        {
            return Roles;
        }

        #endregion

        protected override string GetPerformerType()
        {
            return PerformerType.Role.ToString();
        }

        protected override IList<User> GetInsideUsers(IMemberShipFactory memberShipFactory)
        {
            return memberShipFactory.CreateUserDao().GetUsersInRole(Name);
        }
    }
}