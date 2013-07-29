using Qi;

namespace Badminton.Activities
{
    public enum PlanJoinStatus
    {
        [EnumDescription("未表决")]
        Unknow,
        [EnumDescription("参加")]
        Join,
        [EnumDescription("缺席")]
        Absent,
    }
}