using Ornament.Configurations;
using Ornament.Messages.Dao;
using Ornament.Messages.Dao.NHibernateImple;

namespace Ornament.MVCWebFrame.App_Start
{
    public class NhConfig
    {
        public static void Config()
        {
            NHConfig.Instance.RegistDaoFactory(typeof(IMessageDaoFactory), typeof(MessageDaoFactory));
            NHConfig.Instance.Regist();
        }
    }
}