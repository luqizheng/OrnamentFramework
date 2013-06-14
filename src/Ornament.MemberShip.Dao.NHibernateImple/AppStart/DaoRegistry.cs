using Castle.MicroKernel.Registration;
using Ornament.AppStart;

namespace Ornament.MemberShip.Dao.NHibernateImple.AppStart
{
    public class DaoRegistry : IInitialization
    {
        public void OnStart(Context context)
        {
            context.Container
                .Register(Component.For<IMemberShipFactory>().ImplementedBy<MemberShipFactory>());
        }
    }
}