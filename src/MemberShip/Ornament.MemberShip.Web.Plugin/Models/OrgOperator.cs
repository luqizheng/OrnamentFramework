﻿using System;

namespace Ornament.MemberShip.Plugin.Models
{
    [Flags]
    public enum OrgOperator
    {
        None = 0,
        Read = 1,
        Modify = 2 | Read,
        AssignRole = 4 | Modify,
        Delete = 8 | AssignRole,

        AssignOrg = 16 | Read | Modify,

        AssignAllOrg = 32 | Read | Modify
    }
}