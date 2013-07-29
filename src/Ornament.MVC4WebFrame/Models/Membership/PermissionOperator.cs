using System;

namespace Ornament.MVCWebFrame.Models.Membership
{
    [Flags]
    public enum PermissionOperator
    {
        None,
        Create,
        Delete,
        Edit,
    }
}