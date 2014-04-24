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

        public MemberShipPermissionException(string message, Exception innerException)
            : base(message, innerException)
        {
        }
    }
}