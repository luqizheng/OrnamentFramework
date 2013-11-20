using System;

namespace Ornament.MemberShip.Plugin.Models
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