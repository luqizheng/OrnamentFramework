using System;
using Qi.Domain;

namespace Badminton
{
    /// <summary>
    ///     活动
    /// </summary>
    public class Activity : DomainObject<Activity, string>
    {
        /// <summary>
        /// 活动开始时间
        /// </summary>
        public virtual DateTime StartDateTime { get; set; }
        /// <summary>
        /// 活动结束时间
        /// </summary>
        public virtual DateTime EndDateTime { get; set; }
    }
}