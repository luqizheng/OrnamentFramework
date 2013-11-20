using System;

namespace Ornament.MemberShip.Plugin.Models
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