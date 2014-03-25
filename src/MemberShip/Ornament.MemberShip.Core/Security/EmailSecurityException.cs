namespace Ornament.MemberShip.Security
{
    public class EmailSecurityException : MemberShipException
    {
        public EmailSecurityException(string message)
            : base(message)
        {
        }
    }

    public class EmailSecurityTimeoutException : EmailSecurityException
    {
        public EmailSecurityTimeoutException() : base("Email Security token is expire.")
        {
        }
    }
}