using System;

namespace Ornament.MemberShip
{
     [Serializable]
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