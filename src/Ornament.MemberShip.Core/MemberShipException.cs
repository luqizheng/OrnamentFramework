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

    [Serializable]
    public class NotFoundUserShipException : MemberShipException
    {
        public NotFoundUserShipException(string message)
            : base(message)
        {
        }

        public NotFoundUserShipException(string message, Exception innerException)
            : base(message, innerException)
        {

        }
    }
}