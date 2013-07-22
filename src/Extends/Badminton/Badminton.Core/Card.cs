using System;

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

        public Card(decimal balance, Gymnasium gymnasium,IOwner owner):base(balance,owner)
        {
            this.Gymnasium = gymnasium;
        }


        /// <summary>
        ///     卡号
        /// </summary>
        public virtual string Number { get; set; }

        /// <summary>
        ///     所属场馆
        /// </summary>
        public virtual Gymnasium Gymnasium { get; set; }
    }
}