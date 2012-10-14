using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Qi.Domain;

namespace Qi.Attendance
{
    public class CheckingAttendance:DomainObject<CheckingAttendance,Guid>
    {
        public virtual AttendanceType Type { get; set; }

        public virtual DateTime SignTime { get; set; }

        public virtual string CardNumber { get; set; }

        public virtual string Remarks { get; set; }

        
    }
}
