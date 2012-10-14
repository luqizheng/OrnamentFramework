using System;
using System.Collections.Generic;
using Iesi.Collections.Generic;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Permissions;

namespace Ornament.MemberShip
{
    /// <summary>
    /// 
    /// </summary>
    public class UserGroup : Member<UserGroup>, IPerformer
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

        #region IPerformer Members

        string IPerformer.Id
        {
            get { return this.Id; }
            set { throw new NotImplementedException("Can't set the UserGroup's Id"); }
        }

        IList<User> IPerformer.GetUsers(IMemberShipFactory factory)
        {
            if (factory == null)
                throw new ArgumentNullException("factory");
            return factory.CreateUserDao().GetUsers(this);
        }

        #endregion
    }
}