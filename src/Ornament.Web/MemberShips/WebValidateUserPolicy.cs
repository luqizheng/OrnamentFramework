using System.Web.Security;
using Ornament.MemberShip.MemberShipProviders;

namespace Ornament.Web.MemberShips
{
    /// <summary>
    /// A Proxy class for <seealso cref="Ornament.MemberShip.User"/> and the MembershipProvider
    /// </summary>
    /// <remarks>
    /// 
    /// </remarks>
    public class WebValidateUserPolicy : ValidateUserPolicy
    {
        public WebValidateUserPolicy(MembershipProvider provider)
            : base((IMemberShipProvider)provider)
        {
            MaxInvalidPasswordAttempts = provider.MaxInvalidPasswordAttempts;
            PasswordAttemptWindow = provider.PasswordAttemptWindow;
            PasswordStrengthRegularExpression = provider.PasswordStrengthRegularExpression;
            MinRequiredPasswordLength = provider.MinRequiredPasswordLength;
        }
    }
}