using Ornament;
using Ornament.AppStart;

namespace QiProject.Dao.NhImple.AppStart
{
    public class DaoRegistry : IInitialization
    {
        public void OnStart(Context context)
        {
            context.Container.Register(
                Castle.MicroKernel.Registration.Component.For<IProjectDaoFactory>().ImplementedBy<ProjectDaoFactory>());
        }
    }
}