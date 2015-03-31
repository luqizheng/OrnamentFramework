using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ornament.ProductOrder.Dao.NHImple
{
    public class ProductorDaoFactory:IProductOrderDaoFactory
    {
        public IOrderDao CreateOrderDao()
        {
            return new OrderDao();
        }

        public IOrderLogDao CreateOrderLogDao()
        {
            return new OrderLogDao();
        }
    }
}
