using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Castle.MicroKernel.Registration;
using Ornament;

namespace Qi.Attendance.Dao.NhImple.AppStart
{
    class DaoRegistry:Ornament.AppStart.IInitialization
    {
        public void OnStart(Context context)
        {
            context.Container.Register(
                Component.For<IAttendanceFactory>().ImplementedBy<AttendanceFactory>());
        }
    }
}
