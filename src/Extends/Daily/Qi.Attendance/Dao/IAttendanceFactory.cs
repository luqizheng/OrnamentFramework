namespace Qi.Attendance.Dao
{
    public interface IAttendanceFactory
    {
        IEmployeeDao GetEmployeeDao();
        IEmployeeGroupDao GetEmployeeGroup();
        ICheckHistoryDao GetCheckHistoryDao();
        ICardDao GetCardDao();
    }
}