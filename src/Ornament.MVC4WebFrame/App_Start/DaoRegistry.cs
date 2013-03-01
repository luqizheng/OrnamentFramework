using System.Web.Http;
using Castle.MicroKernel.Registration;
using Ornament.Web;
using Qi.Attendance.Dao;
using Qi.Attendance.Dao.NhImple;
using QiProject.Dao;
using QiProject.Dao.NhImple;
using QiProject.Operators;

namespace Ornament.MVCWebFrame.App_Start
{
    public class DaoRegistry
    {
        public static void Register(HttpConfiguration config)
        {
            OrnamentContext.Current.Container.Register(
                Component.For<IProjectDaoFactory>().ImplementedBy<ProjectDaoFactory>());
            OrnamentContext.Current.Container.Register(
               Component.For<IAttendanceFactory>().ImplementedBy<AttendanceFactory>());
         
            //Project operator registry
            Context.OperatorResourceManager
                .TypeResourceMapping.Add("Product", typeof(ProductOperator));

        }
    }
}