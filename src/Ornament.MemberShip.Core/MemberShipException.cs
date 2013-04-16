using System;

namespace Ornament.MemberShip
{
    [Serializable]
    public class MemberShipException : ApplicationException
    {
        public MemberShipException(string message)
            : base(message)
        {
        }

        public MemberShipException(string message, Exception innerException)
            :base(message,innerException)
        {
            
        }
    }
}