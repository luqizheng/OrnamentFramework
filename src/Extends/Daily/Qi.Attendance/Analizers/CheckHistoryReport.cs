using System;
using Qi.Attendance.Dao;

namespace Qi.Attendance.Analizers
{
    public class CheckHistoryReport
    {
        /// <summary>
        /// </summary>
        /// <param name="factory"></param>
        public CheckHistoryReport(IAttendanceFactory factory)
        {
        }

        /// <summary>
        /// </summary>
        public CheckHistoryReport()
        {
        }

        /// <summary>
        /// </summary>
        public DateTime Start { get; set; }

        /// <summary>
        /// </summary>
        public DateTime End { get; set; }

    }
}