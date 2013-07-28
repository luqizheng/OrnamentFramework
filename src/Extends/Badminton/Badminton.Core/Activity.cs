using System;
using System.Collections.Generic;
using Qi.Domain;

namespace Badminton
{
    /// <summary>
    ///     活动
    /// </summary>
    public class Activity : DomainObject<Activity, string>
    {
        private IList<ConsumablesHistory> _consumablesHistories;

        /// <summary>
        ///     活动开始时间
        /// </summary>
        public virtual DateTime StartDateTime { get; set; }

        /// <summary>
        ///     活动结束时间
        /// </summary>
        public virtual DateTime EndDateTime { get; set; }

        /// <summary>
        ///     人均消费，需要计算出来
        /// </summary>
        public virtual decimal AvgAmount
        {
            get { throw new NotImplementedException(); }
        }

        /// <summary>
        ///     消耗品历史记录
        /// </summary>
        public virtual IList<ConsumablesHistory> ConsumablesHistories
        {
            get { return _consumablesHistories ?? (_consumablesHistories = new List<ConsumablesHistory>()); }
        }
    }
}