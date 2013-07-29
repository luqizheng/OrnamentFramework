namespace Badminton.Activities
{
    public enum JoinStatus
    {
        /// <summary>
        /// 状态未知，一般发生创建了活动，但是还没有举行的时候
        /// </summary>
        UnKnown,
        /// <summary>
        /// 正常出席
        /// </summary>
        Normal,
        /// <summary>
        /// 缺席
        /// </summary>
        Absent,
    }
}