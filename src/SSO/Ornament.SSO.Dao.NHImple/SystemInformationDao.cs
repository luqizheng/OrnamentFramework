using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ornament.MemberShips.SSO;
using Ornament.MemberShips.SSO.Dao;
using Qi.Domain.NHibernates;

namespace Ornament.SSO.Dao.NHImple
{
    class SystemInformationDao:DaoBase<string,SystemInformation>,ISystemInformationDao
    {
    }
}
