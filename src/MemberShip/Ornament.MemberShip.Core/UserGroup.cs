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
        private ISet<Permission> _permissions;

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
                    _permissions = new LinkedHashSet<Permission>();
                    foreach (Role role in Roles)
                    {
                        foreach (var p in role.Permissions)
                        {
                            _permissions.Add(p);
                        }
                    }
                }
                return _permissions;
            }
        }


        protected override string GetPerformerType()
        {
            return PerformerType.UserGroup.ToString();
        }

        protected override IList<User> GetInsideUsers(IMemberShipFactory memberShipFactory)
        {
            return memberShipFactory.CreateUserDao().GetUsers(this);
        }

        public override IEnumerable<Role> GetAllRoles()
        {
            return Roles;
        }
    }
}