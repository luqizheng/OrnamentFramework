using Ornament.MemberShip.Plugin.Models.Memberships.Partials;
using Ornament.MemberShip.Web.Plugin.Models.Memberships.Partials;

namespace Ornament.MemberShip.Plugin.Models.Memberships
{
    public class RegistAccount : BasicInfo
    {
        private PasswordModel _password;


        public PasswordModel Password
        {
            get { return _password ?? (_password = new PasswordModel()); }
            set { _password = value; }
        }
    }
}