﻿using System;

namespace Ornament.MVCWebFrame.Models.Membership
{
    [Flags]
    public enum NewsOperator
    {
        None = 0,
        Create = 1,
        Modify = 2 | Create,
        Delete = 4 | Create,

    }
}