using System;

namespace Ornament.MVCWebFrame.Models.Membership
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