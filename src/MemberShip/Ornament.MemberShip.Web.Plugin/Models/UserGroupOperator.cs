using System;

namespace Ornament.MemberShip.Plugin.Models
{
    [Flags]
    public enum UserGroupOperator
    {
        None = 0,

        /// <summary>
        /// </summary>
        Read = 1,

        Assign = 2 | Read,

        Modify = 4 | Assign,

        Delete = 8 | Modify
    }
}