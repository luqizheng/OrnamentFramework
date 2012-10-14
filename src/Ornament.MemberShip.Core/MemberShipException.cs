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
    }

    public class PasswordFormatException : MemberShipException
    {
        public PasswordFormatException()
            : base("Password's format isn't right.")
        {

        }

        public PasswordFormatException(string message)
            : base(message)
        {

        }
    }
}