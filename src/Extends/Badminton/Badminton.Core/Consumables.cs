using System;
using System.Collections.Generic;
using Badminton.Dao;
using Ornament.MemberShip;
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

        protected Consumables(decimal number, IOwner member)
        {
            if (member == null)
                throw new ArgumentNullException("member");
            Balance = number;
            Owner = member;
            this.CreateTime = CreateTime;
        }

        int IConsumables.Id
        {
            get { return base.Id; }
            set
            {
                //base.Id = value;
            }
        }
        public virtual DateTime CreateTime { get; protected set; }
        /// <summary>
        /// </summary>
        public virtual Model Model { get; set; }

        /// <summary>
        /// </summary>
        public virtual decimal Balance { get; protected set; }

        /// <summary>
        /// </summary>
        public virtual IOwner Owner { get; protected set; }

        private IList<ConsumablesHistory> _histories;
        /// <summary>
        /// 消耗品的历史记录
        /// </summary>
        public IList<ConsumablesHistory> Histories { get { return _histories ?? (_histories = new List<ConsumablesHistory>()); } }

        private IList<StockHistory> _stockHistory;
        public virtual IList<StockHistory> StockHistory
        {
            get { return _stockHistory ?? (_stockHistory = new List<StockHistory>()); }
            
        }
    }




}