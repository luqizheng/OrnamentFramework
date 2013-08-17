using System;

namespace Ornament.MVCWebFrame.Models.Membership
{
    [Flags]
    public enum PermissionOperator
    {
        None = 0,
        Create = 1,
        Edit = 2 | Create,
        Delete = 4 | Edit,

    }
}