using Ornament.MemberShips.SSO.Dao;

namespace Ornament.SSO.Dao.NHImple
{
    public class SSODaoFactory:ISSODaoFactory
    {
        public ISystemInformationDao CreateSystemInformationDao()
        {
            return new SystemInformationDao();
        }
    }
}