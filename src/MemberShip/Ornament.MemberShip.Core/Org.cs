using System;
using System.Collections.Generic;
using System.Linq;
using Iesi.Collections.Generic;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Permissions;

namespace Ornament.MemberShip
{
    /// <summary>
    ///     组织单元，越上层的组织单元，自动继承下级单元的角色
    /// </summary>
    [Serializable]
    public class Org : Performer<Org>
    {
        private const string BaseMaxOrderId = "ffffffffffffffffffffffffffffffff";
        private const string BaseMinOrderId = "00000000000000000000000000000000";
        private readonly object _orgChildLock = 0;
        private IOrgCollection _childs;
        private string _orderId;
        private Iesi.Collections.Generic.ISet<Permission> _permissions;

        protected Org()
        {
        }

        public Org(string name)
            : base(name)
        {
        }

        /// <summary>
        /// </summary>
        public virtual Org Parent { get; protected internal set; }

        /// <summary>
        /// </summary>
        public virtual IOrgCollection Childs
        {
            get
            {
                if (_childs == null)
                {
                    var result = new OrgCollection(this);

                    if (result.Self == null)
                    {
                        result.Self = this;
                    }
                    lock (_orgChildLock)
                    {
                        if (_childs == null)
                        {
                            _childs = result;
                        }
                    }
                }
                if (_childs.Self == null)
                {
                    _childs.Self = this;
                }
                return _childs;
            }
            set { _childs = value; }
        }


        /// <summary>
        /// </summary>
        public virtual string OrderId
        {
            get { return _orderId; }
            set
            {
                if (_orderId != value)
                {
                    _orderId = value;
                    Childs.ResetOrderId();
                }
            }
        }

        public virtual IEnumerable<Permission> Permissions
        {
            get
            {
                if (_permissions == null)
                {
                    _permissions = new HashedSet<Permission>();
                    foreach (Role role in Roles)
                    {
                        _permissions.AddAll(role.Permissions);
                    }
                }
                return _permissions;
            }
        }

        #region IPerformer Members

        protected override string GetPerformerType()
        {
            return PerformerType.Org.ToString();
        }

        protected override IList<User> GetInsideUsers(IMemberShipFactory memberShipFactory)
        {
            IQueryable<User> a = from user in memberShipFactory.Users where user.Org == this select user;
            return a.ToList();
        }

        public override IEnumerable<Role> GetAllRoles()
        {
            return Roles;
        }

        #endregion

        /// <summary>
        /// 获取下级OrderId的数值
        /// </summary>
        /// <returns></returns>
        public static void CreateGetChildCondition(Org org, out string maxOrderId, out string minOrderid)
        {
            if (org == null)
                throw new ArgumentNullException("org");
            if (String.IsNullOrEmpty(org.Id))
            {
                throw new ArgumentException("org.Id");
            }
            minOrderid = !String.IsNullOrEmpty(org.OrderId) ? org.OrderId + "." + BaseMinOrderId : BaseMinOrderId;
            maxOrderId = !String.IsNullOrEmpty(org.OrderId) ? org.OrderId + "." + BaseMaxOrderId : BaseMaxOrderId;
        }
    }
}