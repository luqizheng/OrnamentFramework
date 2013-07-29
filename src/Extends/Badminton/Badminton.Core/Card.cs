using System;
using Badminton.Consumableses;
using Badminton.Dao;

namespace Badminton
{
    /// <summary>
    ///     场地的Vip 卡号
    /// </summary>
    public class Card : VirtualConsumables<Card>
    {
        /// <summary>
        ///     for Nhibernate
        /// </summary>
        protected Card()
        {
        }

        /// <summary>
        /// </summary>
        /// <param name="gymnasium"></param>
        /// <param name="owner"></param>
        public Card(Gymnasium gymnasium, IOwner owner) : base(0, owner)
        {
            if (gymnasium == null)
                throw new ArgumentNullException("gymnasium");
            Gymnasium = gymnasium;
        }


        /// <summary>
        ///     卡号
        /// </summary>
        public virtual string Number { get; set; }

        /// <summary>
        ///     所属场馆
        /// </summary>
        public virtual Gymnasium Gymnasium { get; set; }

        protected override decimal CalculateUnitPrice(decimal amount, decimal numberOrGoods)
        {
            throw new NotImplementedException();
        }
    }
}