using Castle.MicroKernel.Registration;
using Ornament.AppStart;
using Ornament.Contexts;

namespace Ornament.Messages.Dao.NHibernateImple.AppStart
{
    internal class DaoRegistry : IInitialization
    {
        public void OnStart(OrnamentConfiguration config)
        {
            OrnamentContext.Configuration.NhibernateCfg.NhAssemblies.Add(GetType().Assembly);
            OrnamentContext.IocContainer.Register(
                Component.For<IMessageDaoFactory>().ImplementedBy<MessageDaoFactory>());
        }
    }
}