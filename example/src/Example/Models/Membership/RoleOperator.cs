using System;

namespace Ornament.MVCWebFrame.Models.Membership
{
    /// <summary>
    /// role operator.
    /// </summary>
    [Flags]
    public enum RoleOperator
    {
        None = 0,
        /// <summary>
        /// 对于角色有读的权限
        /// </summary>
        Read = 1,

        /// <summary>
        /// 修改
        /// </summary>
        Modify = 3,

        /// <summary>
        /// 派发
        /// </summary>
        Assign = 5,
        /// <summary>
        /// 删除
        /// </summary>
        Delete = 13
    }
}