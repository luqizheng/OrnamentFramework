using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ornament.MemberShip;

namespace Badminton
{
    /// <summary>
    /// 场地的Vip 卡号
    /// </summary>
    public class Card : Consumables<Card>
    {
        public Card(decimal balance)
        {
            
        }
        /// <summary>
        /// 卡号
        /// </summary>
        public virtual string Number { get; set; }
        /// <summary>
        /// 所属场馆
        /// </summary>
        public virtual Gymnasium Gymnasium { get; set; }
        

        protected override IConsumables CreateInstance(decimal number, IPerformer member)
        {
            return new Card();
        }
    }
}
