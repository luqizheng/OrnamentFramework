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

        public IYardTypeDao YardTypeDao()
        {
            return new YardTypeDao();
        }
    }
}
