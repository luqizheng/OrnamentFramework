using Ornament;
using Ornament.AppStart;
using Ornament.Contexts;

namespace QiProject.Dao.NhImple.AppStart
{
    public class DaoRegistry : IInitialization
    {
        public void OnStart(OrnamentConfiguration config)
        {
            OrnamentContext.IocContainer.Register(
                Castle.MicroKernel.Registration.Component.For<IProjectDaoFactory>().ImplementedBy<ProjectDaoFactory>());
        }
    }
}