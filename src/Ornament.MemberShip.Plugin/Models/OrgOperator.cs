using System;

namespace Ornament.MemberShip.Plugin.Models
{
    [Flags]
    public enum OrgOperator
    {
        None = 0,
        Read = 1,
        Modify = 2 | OrgOperator.Read,
        AssignRole = 4 | OrgOperator.Modify,
        Delete = 8 | AssignRole,
    }
}