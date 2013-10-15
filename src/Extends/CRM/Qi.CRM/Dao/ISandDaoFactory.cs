using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Qi.CRM.Dao
{
    public interface ISandDaoFactory
    {
        IClientDao ClientDao();
        IClientModelDao ClientModel();
        IShopDao ShopDao();
        IShopMemo ShopMemo();
        ICompanyDao CompanyDao();


    }
}
