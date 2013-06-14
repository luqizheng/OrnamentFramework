using Castle.MicroKernel.Registration;
using Ornament.AppStart;

namespace Ornament.Messages.Dao.NHibernateImple.AppStart
{
    internal class DaoRegistry : IInitialization
    {
        public void OnStart(Context context)
        {
            context.NhAssemblies.Add(GetType().Assembly);
            context.Container.Register(
                Component.For<IMessageDaoFactory>().ImplementedBy<MessageDaoFactory>());
        }
    }
}