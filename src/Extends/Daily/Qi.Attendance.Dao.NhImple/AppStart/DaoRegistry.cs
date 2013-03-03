using Castle.MicroKernel.Registration;
using Ornament;
using Ornament.AppStart;

namespace Qi.Attendance.Dao.NhImple.AppStart
{
    public class DaoRegistry : IInitialization
    {
        public void OnStart(Context context)
        {
            context.NhAssemblies.Add(typeof (AbsentApplication).Assembly);
            context.Container.Register(Component.For<IAttendanceFactory>().ImplementedBy<AttendanceFactory>());
        }
    }
}