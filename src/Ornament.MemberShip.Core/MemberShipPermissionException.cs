using System;

namespace Ornament.MemberShip
{
    [Serializable]
    public class MemberShipPermissionException : MemberShipException
    {
        public MemberShipPermissionException(string message)
            : base(message)
        {
        }
    }
}