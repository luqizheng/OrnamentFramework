using Castle.MicroKernel.Registration;
using Ornament.AppStart;
using Ornament.Contexts;

namespace Ornament.MemberShip.Dao.NHibernateImple.AppStart
{
    public class DaoRegistry : IInitialization
    {
        public void OnStart(OrnamentConfiguration config)
        {
            OrnamentContext.IocContainer
                           .Register(Component.For<IMemberShipFactory>().ImplementedBy<MemberShipFactory>());
        }
    }
}