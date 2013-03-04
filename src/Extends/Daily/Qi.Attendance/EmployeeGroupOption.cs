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
                            {DayOfWeek.Sunday, new DayOfWeekWorkTime(){DateOfWeek = DayOfWeek.Sunday}},
                            {DayOfWeek.Monday, new DayOfWeekWorkTime(){DateOfWeek = DayOfWeek.Monday}},
                            {DayOfWeek.Tuesday, new DayOfWeekWorkTime(){DateOfWeek = DayOfWeek.Tuesday}},
                            {DayOfWeek.Wednesday, new DayOfWeekWorkTime(){DateOfWeek = DayOfWeek.Wednesday}},
                            {DayOfWeek.Thursday, new DayOfWeekWorkTime(){DateOfWeek = DayOfWeek.Thursday}},
                            {DayOfWeek.Friday, new DayOfWeekWorkTime(){DateOfWeek = DayOfWeek.Friday}},
                            {DayOfWeek.Saturday, new DayOfWeekWorkTime(){DateOfWeek = DayOfWeek.Saturday}},
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