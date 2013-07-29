using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Badminton.Activities
{
    public class MemberJoinStatus
    {
        /// <summary>
        /// 
        /// </summary>
        public virtual Member Member { get; set; }
        /// <summary>
        /// 计划出席情况
        /// </summary>
        public virtual PlanJoinStatus PlanStatus { get; set; }
        /// <summary>
        /// 收入会费
        /// </summary>
        public virtual decimal ActivityAmount { get; set; }
        /// <summary>
        /// 实际出席情况
        /// </summary>
        public virtual JoinStatus ActualStatus { get; set; }
        
    }
}
