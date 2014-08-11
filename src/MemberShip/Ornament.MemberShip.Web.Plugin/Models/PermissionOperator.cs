using System;

namespace Ornament.MemberShip.Plugin.Models
{
    [Flags]
    public enum PermissionOperator
    {
        None = 0,
        Read = 1,
        Edit = 2 | Read,
        Delete = 4 | Edit,

    }
}