using System.Web.Mvc;

namespace Ornament.MVCWebFrame.Areas.Attendance
{
    public class AttendanceAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Attendance";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "Attendance_default",
                "Attendance/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
            context.MapRoute("Attendance_Employee_List",
                "Attendance/{controller}/{action}/{employeeGroupId}",
                new { action = "Index", employeeGroupId = UrlParameter.Optional });
        }
    }
}
