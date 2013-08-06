using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Badminton.Dao.NhImpl
{
    public  class BadmintonDaoFactory:IBadmintonDaoFactory
    {
        public IGymnasiumDao CreateGymasiumDao()
        {
            return new GymnasiumDao();
        }

        public IGymnasiumDao GymasiumDao()
        {
            return new GymnasiumDao();
        }

        public IYardDao YardDao()
        {
            return new YardDao();
        }

        public ICardDao CardDao()
        {
            throw new NotImplementedException();
        }

        public IActivityDao ActivityDao()
        {
            throw new NotImplementedException();
        }

        public IClassConsumablesDao ClassConsumablesDao()
        {
            throw new NotImplementedException();
        }

        public IBrandDao BrandDao()
        {
            throw new NotImplementedException();
        }

        public IModelDao ModelDao()
        {
            throw new NotImplementedException();
        }

        public IConsumablesDao ConsumablesDao()
        {
            throw new NotImplementedException();
        }

        public IConsumablesHistoryDao ConsumablesHistoryDao()
        {
            throw new NotImplementedException();
        }
    }
}
