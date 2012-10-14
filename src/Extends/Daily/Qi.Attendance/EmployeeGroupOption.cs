using System;
using System.Collections.Generic;
using Iesi.Collections.Generic;

namespace Qi.Attendance
{
    public class EmployeeGroupOption
    {
        private Iesi.Collections.Generic.ISet<SpecialWorkDayMark> _specialWorkDay;

        private IDictionary<DayOfWeek, DayOfWeekWorkTime> _weekSetting;

        public virtual IDictionary<DayOfWeek, DayOfWeekWorkTime> WeekSetting
        {
            get
            {
                if(_weekSetting==null)
                {
                    _weekSetting = new Dictionary<DayOfWeek, DayOfWeekWorkTime>
                        {
                            {DayOfWeek.Sunday, new DayOfWeekWorkTime()},
                            {DayOfWeek.Monday, new DayOfWeekWorkTime()},
                            {DayOfWeek.Tuesday, new DayOfWeekWorkTime()},
                            {DayOfWeek.Wednesday, new DayOfWeekWorkTime()},
                            {DayOfWeek.Thursday, new DayOfWeekWorkTime()},
                            {DayOfWeek.Friday, new DayOfWeekWorkTime()},
                            {DayOfWeek.Saturday, new DayOfWeekWorkTime()},
                        };
                    _weekSetting[DayOfWeek.Sunday].WorkTimes.Clear();
                    _weekSetting[DayOfWeek.Saturday].WorkTimes.Clear();
                }

                return _weekSetting;
            }
        }

        public virtual Iesi.Collections.Generic.ISet<SpecialWorkDayMark> SpecialWorkDay
        {
            get { return _specialWorkDay ?? (_specialWorkDay = new OrderedSet<SpecialWorkDayMark>()); }
        }


     

    }
}