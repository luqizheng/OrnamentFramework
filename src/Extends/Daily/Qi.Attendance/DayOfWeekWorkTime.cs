using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Qi.Domain;

namespace Qi.Attendance
{
    public class DayOfWeekWorkTime:DomainObject<DayOfWeekWorkTime,Guid>
    {
        private IList<Period> _workTimes;

        public virtual IList<Period> WorkTimes
        {
            get
            {
                return _workTimes ?? (_workTimes = new List<Period>
                    {
                        new Period
                            {
                                Start = new Time(9, 0, 0),
                                End = new Time(12, 0, 0)
                            },
                        new Period
                            {
                                Start = new Time(13, 0, 0),
                                End = new Time(18, 0, 0)
                            }
                    });
            }
        }

    }
}
