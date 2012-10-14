using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Iesi.Collections.Generic;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Languages;
using Ornament.MemberShip.Permissions;

namespace Ornament.MemberShip
{
    /// <summary>
    /// 组织单元，越上层的组织单元，自动继承下级单元的角色
    /// </summary>
    [Serializable]
    public class Org : Member<Org>, IPerformer
    {
        private const string BaseMaxOrderId = "ffffffffffffffffffffffffffffffff";
        private const string BaseMinOrderId = "00000000000000000000000000000000";
        private Iesi.Collections.Generic.ISet<Org> _childs;
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
        /// 
        /// </summary>
        public virtual Org Parent { get; protected set; }

        /// <summary>
        /// 
        /// </summary>
        protected virtual Iesi.Collections.Generic.ISet<Org> Childs
        {
            get
            {
                if (_childs == null)
                    _childs = new HashedSet<Org>();
                return _childs;
            }
            set { _childs = value; }
        }
        [Display(ResourceType = typeof (MembershipCommon), Name = "Org_OrgCount_Child_Org_s_Count")]
        public virtual int OrgCount
        {
            get { return Childs.Count; }
        }

        /// <summary>
        /// 
        /// </summary>
        public virtual string OrderId
        {
            get { return _orderId; }
        }

        public virtual ReadOnlyCollection<Org> Orgs
        {
            get
            {
                var a = new List<Org>(Childs);
                return new ReadOnlyCollection<Org>(a);
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

        string IPerformer.Id
        {
            get { return this.Id; }
            set { throw new NotImplementedException("Can't set the Org's Id"); }
        }


        IList<User> IPerformer.GetUsers(IMemberShipFactory memberShip)
        {
            IQueryable<User> a = from user in memberShip.Users where user.Org == this select user;
            return a.ToList();
        }

        #endregion

        /// <summary>
        /// 
        /// </summary>
        /// <param name="childOrg"></param>
        public virtual void Add(Org childOrg)
        {
            /* 1 检查child是否为空，检查 child是否已经保存过数据库.child必须不能体属于任何一个ParentOrg
             * 2 检查现在的对象及父节点必须已经拥有Id            
             * 3 更新child下所有的子的OrderId，为childOrg的parent赋值
             * 4 创建当前的Orderid
             * */
            //1
            if (childOrg.Id == this.Id)
                throw new ArgumentException("Org can not add self");
            if (childOrg == null)
                throw new ArgumentNullException("childOrg");
            if (string.IsNullOrEmpty(childOrg.Id))
                throw new ArgumentNullException("childOrg", "org's Id must have value before being added");
            if (childOrg.Parent != null && childOrg.Parent.Id != this.Id)
                throw new ArgumentException("org must not be belong to some parent");
            //if childOrg is current org's parent ,it throw exception;
            if (OrderId != null && OrderId.IndexOf(childOrg.Id) != -1)
                throw new ArgumentException("org can't add it's parent org");

            //2
            if (String.IsNullOrEmpty(Id))
                throw new ArgumentException("save it before add child org");
            if (Parent != null && String.IsNullOrEmpty(Parent.Id))
                throw new ArgumentException("Before add child org ,Org's Id must have value");

            //3
            childOrg.Parent = this;
            childOrg.SetOrderId(this);
        }

        private void SetOrderId(Org parent)
        {
            if (String.IsNullOrEmpty(parent.OrderId))
                _orderId = parent.Id;
            else
                _orderId = parent.OrderId + "." + parent.Id;
            foreach (Org childOrg in Childs)
            {
                childOrg.SetOrderId(this);
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="org"></param>
        public virtual void Remove(Org org)
        {
            if (org == null)
                throw new ArgumentNullException("org");
            if (!_childs.Contains(org))
            {
                throw new ArgumentOutOfRangeException("org", "It not belong to this");
            }
            if (Childs.Remove(org))
            {
                org._orderId = null;
                org.Parent = null;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="org"></param>
        /// <returns></returns>
        public virtual bool Contains(Org org)
        {
            if (org == null) throw new ArgumentNullException("org");

            return Childs.Contains(org);
        }


        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public virtual bool LevelUp()
        {
            if (Parent == null)
                return false;
            if (Parent.Parent == null)
            {
                Parent.Remove(this);
            }
            else
            {
                Parent.Remove(this);
                Parent.Parent.Add(this);
            }
            return true;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="newParent"></param>
        /// <returns></returns>
        public virtual bool LevelDown(Org newParent)
        {
            if (Parent != null)
                Parent.Remove(this);

            try
            {
                newParent.Add(this);
                return true;
            }
            catch (ArgumentException ex)
            {
                if (ex.Message == "org can't add it's parent org")
                    throw new ArgumentException("newParent is it's child,can't be LevelDown");
                throw;
            }
        }


        /// <summary>
        /// 
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
            maxOrderId = !String.IsNullOrEmpty(org._orderId) ? org.OrderId + "." + BaseMaxOrderId : BaseMaxOrderId;
        }

        //private static void ChangeNewParent(IEnumerable<Org> childOrg, string newParentOrderId)
        //{
        //    foreach (Org org in childOrg)
        //    {
        //        org._orderId = newParentOrderId;
        //        if (org.Childs.Count != 0)
        //            ChangeNewParent(org.Childs, newParentOrderId + "." + org.Id);
        //    }
        //}

        public virtual ReadOnlyCollection<Org> GetAllChilds()
        {
            IList<Org> orgs = new List<Org>(Childs);
            return new ReadOnlyCollection<Org>(orgs);
        }
    }
}