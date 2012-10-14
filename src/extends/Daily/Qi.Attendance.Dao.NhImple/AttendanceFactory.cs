namespace Qi.Attendance.Dao.NhImple
{
    public class AttendanceFactory : IAttendanceFactory
    {
        //public IEquipmentDao GetEquipmentDao()
        //{
        //    return new EquipmentDao();
        //}

        public IEmployeeDao GetEmployeeDao()
        {
            

            return new EmployeeDao();
        }

        public IEmployeeGroupDao GetEmployeeGroup()
        {
            return new EmployeeGroupDao();
        }
    }
}