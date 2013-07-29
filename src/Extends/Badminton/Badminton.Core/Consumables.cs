using System;
using System.ComponentModel;
using Badminton.Consumableses;
using Badminton.Dao;
using Qi.Domain;

namespace Badminton
{
    /// <summary>
    ///     消耗品
    /// </summary>
    public abstract class Consumables<T> : DomainObject<T, int>, IConsumables
        where T : DomainObject<T, int>
    {
        /// <summary>
        ///     just for NHibernate;
        /// </summary>
        protected Consumables()
        {
        }

        /// <summary>
        ///     如果是新物品，请使用这个构造函数，并且使用Purchase进行入货
        /// </summary>
        /// <param name="member"></param>
        protected Consumables(IOwner member)
        {
            if (member == null)
                throw new ArgumentNullException("member");
            Owner = member;
            CreateTime = DateTime.Now;
        }

        /// <summary>
        ///     如果使用这个系统时候，已经有余量，请使用这个构建函数
        /// </summary>
        /// <param name="number"></param>
        /// <param name="member"></param>
        protected Consumables(decimal number, IOwner member)
            : this(member)
        {
            Balance = number;
        }

        /// <summary>
        ///     单价自动计算
        /// </summary>
        public decimal UnitPrice { get; protected set; }

        int IConsumables.Id
        {
            get { return base.Id; }
            set
            {
                //base.Id = value;
            }
        }

        /// <summary>
        /// </summary>
        public virtual Model Model { get; set; }

        /// <summary>
        /// </summary>
        [DisplayName("余额")]
        public virtual decimal Balance { get; protected set; }

        /// <summary>
        /// </summary>
        public virtual IOwner Owner { get; protected set; }

        /// <summary>
        /// </summary>
        public DateTime CreateTime { get; protected set; }

        /// <summary>
        ///     进货
        /// </summary>
        /// <param name="amount">进货金额</param>
        /// <param name="numberOrGoods">进货数量</param>
        /// <param name="daoFactory">dao</param>
        /// <remarks>
        ///     1) 把入货数历史记录计算好，并且存入db
        ///     2）处理余额。
        ///     3）计算好单价
        /// </remarks>
        public virtual void Purchase(decimal amount, decimal numberOrGoods, IBadmintonDaoFactory daoFactory)
        {
            UnitPrice = CalculateUnitPrice(amount, numberOrGoods);
            throw new NotImplementedException();
        }

        /// <summary>
        ///     计算单价
        /// </summary>
        /// <param name="amount"></param>
        /// <param name="numberOrGoods"></param>
        /// <returns></returns>
        protected abstract
            decimal CalculateUnitPrice(decimal amount, decimal numberOrGoods);
    }
}