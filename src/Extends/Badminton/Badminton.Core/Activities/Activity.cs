﻿using System;
using Iesi.Collections.Generic;
using Qi.Domain;

namespace Badminton.Activities
{
    /// <summary>
    ///     活动
    /// </summary>
    public class Activity : DomainObject<Activity, string>
    {
        private ISet<ConsumablesHistory> _consumablesHistories;
        private ISet<MemberJoinStatus> _joinMembers;

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
        public virtual ISet<ConsumablesHistory> ConsumablesHistories
        {
            get { return _consumablesHistories ?? (_consumablesHistories = new HashedSet<ConsumablesHistory>()); }
        }

        /// <summary>
        ///     活动参加人数
        /// </summary>
        public virtual ISet<MemberJoinStatus> JoinMembers
        {
            get { return (_joinMembers) ?? (_joinMembers = new HashedSet<MemberJoinStatus>()); }
        }
    }
}