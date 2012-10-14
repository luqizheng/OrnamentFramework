using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Qi.Domain;

namespace Qi.Daily
{
    public class DayMark : DomainObject<DayMark, string>
    {
        private IList<Period> _workDayPeriods;

        public DayMark() { }

        /// <summary>
        /// 
        /// </summary>
        public virtual DateTime Date { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public virtual IList<Period> Periods
        {
            get { return _workDayPeriods ?? (_workDayPeriods = new List<Period>()); }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="dateTime"></param>
        /// <returns></returns>
        public virtual bool IsMatch(DateTime dateTime)
        {
            foreach (Period perioid in Periods)
            {
                perioid.IsIn(dateTime);
            }
            throw new ApplicationException("fail to match");
        }
    }
}