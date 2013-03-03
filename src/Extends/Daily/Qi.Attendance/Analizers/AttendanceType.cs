using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Qi.Attendance.Analizers
{
    public enum AttendanceType
    {
        [EnumDescription("迟到")]
        Late,
        [EnumDescription("早退")]
        Departure,
        [EnumDescription("事假")]
        Excused,
        [EnumDescription("病假")]
        Stick,
        [EnumDescription("加班")]
        Overtime,
        [EnumDescription("假期")]
        Vocation
    }
}
