using System;

namespace Ornament.MemberShip.Plugin.Models
{
    [Flags]
    public enum OrgOperator
    {
        None = 0,
        Read = 1,
        Modify = 3,
        AssignRole = 5,
        Delete = 13,
    }
}