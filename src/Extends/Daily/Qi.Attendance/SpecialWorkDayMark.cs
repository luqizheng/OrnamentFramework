using System;
using System.Collections.Generic;
using Qi.Domain;

namespace Qi.Attendance
{
    public class SpecialWorkDayMark : DomainObject<SpecialWorkDayMark, string>
    {
        private IList<Period> _periods;

        public SpecialWorkDayMark()
        {
            this.Id = "";
        }

        /// <summary>
        /// 
        /// </summary>
        public virtual DateTime Date { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public virtual IList<Period> Periods
        {
            get { return _periods ?? (_periods = new List<Period>()); }
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