using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Qi.Attendance.Analizers
{
    public class CheckStatus
    {
        public EmployeeGroup EmployeeGroup { get; set; }
        public CheckType CheckType { get; set; }
        public int Count { get; set; }
    }
}
