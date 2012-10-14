namespace Ornament.MemberShip
{
    public interface IMemberShipProvider
    {
        string Encrypt(string content);
        string Decrypt(string content);
    }

    public class MembershipContext
    {
        private static IMemberShipProvider _provider;
        public static IMemberShipProvider Provider
        {
            get
            {
                if (_provider == null)
                    throw new MemberShipException("please initialize the MembershipContext.Provider at the application starting.");
                return _provider;
            }
            set
            {
                _provider = value;
            }
        }
    }
}