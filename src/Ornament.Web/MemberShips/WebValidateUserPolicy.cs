using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Security;
using Ornament.MemberShip;
using Ornament.MemberShip.MemberShipProviders;

namespace Ornament.Web.MemberShips
{
    public class WebValidateUserPolicy : ValidateUserPolicy
    {
        public WebValidateUserPolicy(MembershipProvider provider)
            : base((IMemberShipProvider)provider)
        {
            this.MaxInvalidPasswordAttempts = provider.MaxInvalidPasswordAttempts;
            this.PasswordAttemptWindow = provider.PasswordAttemptWindow;
        }
    }
}
