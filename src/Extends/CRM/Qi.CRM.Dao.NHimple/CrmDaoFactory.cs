using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Qi.CRM.Dao.NhImple
{
    public class CrmDaoFactory : ICrmDaoFactory
    {
        public IClientDao ClientDao()
        {
            throw new NotImplementedException();
        }

        public IClientModelDao ClientModel()
        {
            throw new NotImplementedException();
        }

        public IShopDao ShopDao()
        {
            throw new NotImplementedException();
        }

        public IShopMemo ShopMemo()
        {
            throw new NotImplementedException();
        }

        public ICompanyDao CompanyDao()
        {
            return new CompanyDao();
        }
    }
}
