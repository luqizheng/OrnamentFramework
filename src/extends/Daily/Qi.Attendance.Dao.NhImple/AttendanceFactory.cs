namespace Qi.Attendance.Dao.NhImple
{
    public class AttendanceFactory : IAttendanceFactory
    {
        //public IEquipmentDao GetEquipmentDao()
        //{
        //    return new EquipmentDao();
        //}

        #region IAttendanceFactory Members

        public IEmployeeDao GetEmployeeDao()
        {
            return new EmployeeDao();
        }

        public IEmployeeGroupDao GetEmployeeGroup()
        {
            return new EmployeeGroupDao();
        }

        public ICheckHistoryDao GetCheckHistoryDao()
        {
            return new CheckHistoryDao();
        }

        public ICardDao GetCardDao()
        {
            return new CardDao();
        }

        #endregion
    }
}