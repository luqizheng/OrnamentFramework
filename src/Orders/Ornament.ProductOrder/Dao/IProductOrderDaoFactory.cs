using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace Ornament.ProductOrder.Dao
{
    public interface IProductOrderDaoFactory
    {
        IOrderDao CreateOrderDao();
        IOrderLogDao CreateOrderLogDao();

    }
}
