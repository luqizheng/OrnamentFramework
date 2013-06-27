using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Badminton.Dao
{
   public interface IBadmintonDaoFactory
   {
       IGymnasiumDao GymasiumDao();
       IYardDao YardDao();
       IYardTypeDao YardTypeDao();
   }
}
