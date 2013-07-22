using System;
using Qi.Domain;

namespace Badminton
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
        /// <param name="StockPrice"></param>
        /// <param name="goodsNumber"></param>
        /// <param name="buyer"></param>
        public StockHistory(decimal StockPrice, decimal goodsNumber, Member buyer)
        {
            StockAmount = StockPrice;
            GoodsNumber = goodsNumber;
            Buyer = buyer;
        }
        /// <summary>
        /// 采购金额
        /// </summary>
        public virtual decimal StockAmount { get; set; }
        /// <summary>
        /// 进货数目
        /// </summary>
        public virtual decimal GoodsNumber { get; set; }
        /// <summary>
        /// 采购员
        /// </summary>
        public virtual Member Buyer { get; set; }
        /// <summary>
        /// 单价自动计算
        /// </summary>
        public virtual decimal UnitPrice
        {
            get
            {
                throw new NotImplementedException();
            }
        }



    }
}