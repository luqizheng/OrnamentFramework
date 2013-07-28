using System;
using System.Collections.Generic;
using Qi.Domain;

namespace Badminton
{
    /// <summary>
    ///     消耗品
    /// </summary>
    public abstract class Consumables<T> : DomainObject<T, int>, IConsumables
        where T : DomainObject<T, int>
    {
        private IList<ConsumablesHistory> _histories;
        private IList<Order> _stockHistory;

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
            CreateTime = DateTime.Now;
        }

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
        public virtual decimal Balance { get; protected set; }

        /// <summary>
        /// </summary>
        public virtual IOwner Owner { get; protected set; }
        /// <summary>
        /// 
        /// </summary>
        public DateTime CreateTime { get; protected set; }
    }
}