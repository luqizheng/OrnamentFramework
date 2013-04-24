using Ornament.Models.Memberships.Partials;

namespace Ornament.Models.Memberships
{
    public class RegistAccount
    {
        private PasswordModel _password;
        private UserBasicInfoModel _userBasicInfo;

        /// <summary>
        ///     Gets or sets the UserBais
        /// </summary>
        public UserBasicInfoModel UserBasicInfo
        {
            get { return _userBasicInfo ?? (_userBasicInfo = new UserBasicInfoModel()); }
            set { _userBasicInfo = value; }
        }

        public PasswordModel Password
        {
            get { return _password ?? (_password = new PasswordModel()); }
            set { _password = value; }
        }
       
    }
}