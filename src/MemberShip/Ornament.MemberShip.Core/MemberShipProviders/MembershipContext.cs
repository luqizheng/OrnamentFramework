namespace Ornament.MemberShip.MemberShipProviders
{
    /// <summary>
    /// MembershipContext
    /// </summary>
    public class MembershipContext
    {
        private static IMemberShipProvider _provider;
        /// <summary>
        /// 
        /// </summary>
        public static IMemberShipProvider Provider
        {
            get
            {
                if (_provider == null)
                    throw new MemberShipException(
                        "please initialize the MembershipContext.Provider at the application starting.");
                return _provider;
            }
            set { _provider = value; }
        }
    }
}