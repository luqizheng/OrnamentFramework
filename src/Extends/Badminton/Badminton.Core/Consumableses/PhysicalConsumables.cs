using System;
using Badminton.Dao;
using Qi.Domain;

namespace Badminton.Consumableses
{
    /// <summary>
    ///     实物消耗品的泛型类，用于扩展的。但是实际上我们多用CommandPhysicalConsumables这个就好了
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public abstract class PhysicalConsumables<T> : Consumables<T>, IPhysicalConsumables where T : DomainObject<T, int>
    {
        protected PhysicalConsumables(decimal balance, IOwner owner)
            : base(balance, owner)
        {
        }
        /// <summary>
        /// 单价
        /// </summary>
        public virtual decimal UnitPrice { get; set; }

        /// <summary>
        ///     把东西分配给会员,并且要记录历史记录
        /// </summary>
        /// <param name="number"></param>
        /// <param name="member"></param>
        /// <param name="daoFactory"></param>
        public virtual void AssignToMember(decimal number, Member member, IBadmintonDaoFactory daoFactory)
        {
            if (this.Balance < number)
                throw new ArgumentOutOfRangeException("number", "请求派发的数量大于存量.");
            IConsumablesHistoryDao historyDao = daoFactory.ConsumablesHistoryDao();
            
            IPhysicalConsumables memberChecker = CreatePhysicalConsumables(number, member);

            //派发给会员，然后创建这个消耗品的历史记录
            var assignHisotry = new ConsumablesHistory(memberChecker, number);
            historyDao.SaveOrUpdate(assignHisotry);
            

            //自身减少一部分数量
            var selfHistory = new ConsumablesHistory(this, -number);
            historyDao.SaveOrUpdate(selfHistory);
            
            //自身数量减少
            this.Balance = -number;
            daoFactory.ConsumablesDao().SaveOrUpdate(this);
        }

        protected abstract IPhysicalConsumables CreatePhysicalConsumables(decimal balance, Member member);
    }
}