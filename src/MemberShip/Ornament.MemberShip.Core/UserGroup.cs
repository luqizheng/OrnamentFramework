using System;
using System.Collections.Generic;
using Iesi.Collections.Generic;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Permissions;

namespace Ornament.MemberShip
{
    /// <summary>
    /// </summary>
    public class UserGroup : Performer<UserGroup>
    {
        private Iesi.Collections.Generic.ISet<Permission> _permissions;

        protected UserGroup()
        {
        }

        public UserGroup(string name)
            : base(name)
        {
        }

        public virtual IEnumerable<Permission> Permissions
        {
            get
            {
                if (_permissions == null)
                {
                    _permissions = new HashedSet<Permission>();
                    foreach (Role role in Roles)
                        _permissions.AddAll(role.Permissions);
                }
                return _permissions;
            }
        }


        protected override PerformerType GetPerformerType()
        {
            return PerformerType.UserGroup;
        }

        protected override IList<User> GetInsideUsers(IMemberShipFactory memberShipFactory)
        {
            return memberShipFactory.CreateUserDao().GetUsers(this);
        }

        public override IEnumerable<Role> GetAllRoles()
        {
            return this.Roles;
        }
    }
}