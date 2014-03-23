namespace Ornament.MemberShip.Security
{
    public class UserSecurityException : MemberShipException
    {
        public UserSecurityException(string message)
            : base(message)
        {
        }
    }

    public class UserSecurityTimeoutException : UserSecurityException
    {
        public UserSecurityTimeoutException() : base("User Security token is expire.")
        {
        }
    }
}