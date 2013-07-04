using Ornament.Models.Memberships.Partials;

namespace Ornament.Models.Memberships
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