using System;

namespace Ornament.MVCWebFrame.Models.Membership
{
    [Flags]
    public enum AccountOperator
    {
        None = 0,
        ChangePassword = 1,
        ViewPermission = 2,
        ChangePrivateInfo = 4,
    }
}