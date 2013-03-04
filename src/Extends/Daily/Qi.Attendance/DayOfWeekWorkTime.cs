using System;
using System.Collections.Generic;
using Qi.Domain;

namespace Qi.Attendance
{
    public class DayOfWeekWorkTime : DomainObject<DayOfWeekWorkTime, Guid>
    {
        private IList<Period> _workTimes;
        public virtual DayOfWeek DateOfWeek { get; set; }

        public virtual IList<Period> WorkTimes
        {
            get
            {
                return _workTimes ?? (_workTimes = new List<Period>
                    {
                        new Period
                            {
                                StartTime = new Time(9, 0, 0),
                                EndTime = new Time(12, 0, 0)
                            },
                        new Period
                            {
                                StartTime = new Time(13, 0, 0),
                                EndTime = new Time(18, 0, 0)
                            }
                    });
            }
        }
    }
}