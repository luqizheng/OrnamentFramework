using System;
using Qi.Domain;

namespace Badminton.StockHistories
{
    public class StockHistory : DomainObject<StockHistory, int>
    {
        /// <summary>
        /// </summary>
        protected StockHistory()
        {
        }

        /// <summary>
        /// </summary>
        /// <param name="stockPrice">入货总价钱</param>
        /// <param name="goodsNumber">货物数量</param>
        /// <param name="buyer">谁购买的</param>
        public StockHistory(decimal stockPrice, decimal goodsNumber, Member buyer)
        {
            StockAmount = stockPrice;
            GoodsNumber = goodsNumber;
            Buyer = buyer;
        }

        public virtual IConsumables Consumables { get; set; }

        /// <summary>
        ///     购买日期
        /// </summary>
        public virtual DateTime OrderTime { get; set; }

        /// <summary>
        ///     采购金额
        /// </summary>
        public virtual decimal StockAmount { get; set; }

        /// <summary>
        ///     进货数目
        /// </summary>
        public virtual decimal GoodsNumber { get; set; }

        /// <summary>
        ///     采购员
        /// </summary>
        public virtual Member Buyer { get; set; }

       
    }
}