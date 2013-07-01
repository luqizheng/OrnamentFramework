using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ornament.MemberShip.Security
{
    public class UserSecurityException : Ornament.MemberShip.MemberShipException
    {
        public UserSecurityException(string message)
            : base(message)
        {

        }
    }

    public class UserSecurityTimeoutException:UserSecurityException
    {
        public UserSecurityTimeoutException():base("User Security token is expire.")
        {
            
        }
    }
}
