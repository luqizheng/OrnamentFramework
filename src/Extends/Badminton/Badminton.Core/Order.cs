using System;
using Qi.Domain;

namespace Badminton
{
    public class Order : DomainObject<Order, int>
    {
        /// <summary>
        /// </summary>
        protected Order()
        {
        }

        /// <summary>
        /// </summary>
        /// <param name="stockPrice">入货总价钱</param>
        /// <param name="goodsNumber">货物数量</param>
        /// <param name="buyer">谁购买的</param>
        public Order(decimal stockPrice, decimal goodsNumber, Member buyer)
        {
            StockAmount = stockPrice;
            GoodsNumber = goodsNumber;
            Buyer = buyer;
        }

        public Model Model { get; set; }

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

        /// <summary>
        ///     单价自动计算
        /// </summary>
        public virtual decimal UnitPrice
        {
            get { throw new NotImplementedException(); }
        }

        /// <summary>
        ///     确认订单,并且计算订单总费用，并且计算查找消耗品及其存量的存量
        /// </summary>
        public virtual void Confirm(Dao.IBadmintonDaoFactory daoFactory)
        {
            if (daoFactory == null) 
                throw new ArgumentNullException("daoFactory");
        }
    }
}