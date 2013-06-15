using Castle.MicroKernel.Registration;
using Ornament;
using Ornament.AppStart;
using Ornament.Contexts;

namespace Qi.Attendance.Dao.NhImple.AppStart
{
    public class DaoRegistry : IInitialization
    {
        public void OnStart(OrnamentConfiguration config)
        {
            config.NhibernateCfg.NhAssemblies.Add(this.GetType().Assembly);
            OrnamentContext.IocContainer.Register(Component.For<IAttendanceFactory>().ImplementedBy<AttendanceFactory>());
        }
    }
}