using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Configuration.Provider;
using System.Security.Cryptography;
using System.Text;
using System.Web.Security;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.MemberShipProviders;

namespace Ornament.Web.MemberShips
{
    public sealed class MemberShipProvider : MembershipProvider, IMemberShipProvider
    {
        private string _applicationName = "application";
        private bool _enablePasswordReset;
        private bool _enablePasswordRetrieval;
        private IMemberShipFactory _facotry;

        private int _maxInvalidPasswordAttempts;
        private int _minRequiredNonAlphanumericCharacters;
        private int _minRequiredPasswordLength;
        private int _passwordAttemptWindow;
        private MembershipPasswordFormat _passwordFormat;
        private string _passwordStrengthRegularExpression;

        private bool _requiresQuestionAndAnswer;
        private bool _requiresUniqueEmail;

        /// <summary>
        /// ָʾ��Ա�ʸ��ṩ�����Ƿ�����Ϊ�����û����������롣
        /// </summary>
        public override bool EnablePasswordRetrieval
        {
            get { return _enablePasswordRetrieval; }
        }

        /// <summary>
        /// ָʾ��Ա�ʸ��ṩ�����Ƿ�����Ϊ�����û����������롣Ĭ��true
        /// </summary>
        public override bool EnablePasswordReset
        {
            get { return _enablePasswordReset; }
        }

        /// <summary>
        /// ��ȡһ��ֵ����ֵָʾ��Ա�ʸ��ṩ�����Ƿ�����ΪҪ���ڴ����û�ʱ�ṩ������ʾ����ʹ�,Ĭ��false
        /// </summary>
        public override bool RequiresQuestionAndAnswer
        {
            get { return _requiresQuestionAndAnswer; }
        }

        /// <summary>
        /// ʹ���Զ����Ա�ʸ��ṩ�����Ӧ�ó�������ơ�
        /// </summary>
        public override string ApplicationName
        {
            get { return _applicationName; }
            set { _applicationName = value; }
        }

        /// <summary>
        /// ��ȡ������Ա�ʸ��û�ǰ�������Ч�������Ч������ʾ����𰸳��Դ�����
        /// </summary>
        public override int MaxInvalidPasswordAttempts
        {
            get { return _maxInvalidPasswordAttempts; }
        }

        /// <summary>
        /// ��ȡ��������Ա�ʸ��û�֮ǰ����������Ч�������Ч������ʾ����𰸳��Դ����ķ�������
        /// </summary>
        public override int PasswordAttemptWindow
        {
            get { return _passwordAttemptWindow; }
        }

        /// <summary>
        /// ��ȡһ��ֵ��ָʾ��Ա�ʸ��ṩ�����Ƿ�����ΪҪ��ÿ���û�������Ψһ�ĵ����ʼ���ַ��
        /// </summary>
        public override bool RequiresUniqueEmail
        {
            get { return _requiresUniqueEmail; }
        }

        /// <summary>
        /// ��ȡһ��ֵ����ֵָʾ�ڳ�Ա�ʸ����ݴ洢���д洢����ĸ�ʽ��
        /// </summary>
        public override MembershipPasswordFormat PasswordFormat
        {
            get { return _passwordFormat; }
        }

        /// <summary>
        /// ��ȡ������Ҫ�����С���ȡ�
        /// </summary>
        public override int MinRequiredPasswordLength
        {
            get { return _minRequiredPasswordLength; }
        }

        /// <summary>
        /// ��ȡ��Ч�����б�����������������ַ�����
        /// </summary>
        public override int MinRequiredNonAlphanumericCharacters
        {
            get { return _minRequiredNonAlphanumericCharacters; }
        }

        /// <summary>
        /// ��ȡ���ڼ��������������ʽ��
        /// </summary>
        public override string PasswordStrengthRegularExpression
        {
            get { return _passwordStrengthRegularExpression; }
        }

        public IMemberShipFactory Facotry
        {
            get
            {
                if (_facotry == null)
                    _facotry = OrnamentContext.Current.GetDaoFactory<IMemberShipFactory>();
                return _facotry;
            }
            set { _facotry = value; }
        }

        #region IMemberShipProvider Members

        public string Encrypt(string content)
        {
            return EncodeString(content, PasswordFormat);
        }

        public string Decrypt(string content)
        {
            return DecodeString(content, PasswordFormat);
        }

        #endregion

        private static string GetConfigValue(string configValue, string defaultValue)
        {
            if (String.IsNullOrEmpty(configValue))
                return defaultValue;
            return configValue;
        }

        /// <summary>
        /// ��ʼ���ṩ����
        /// </summary>
        /// <param name="name"></param>
        /// <param name="config"></param>
        public override void Initialize(string name, NameValueCollection config)
        {
            if (String.IsNullOrEmpty(name))
                throw new ArgumentNullException("name");
            base.Initialize(name, config);
            _maxInvalidPasswordAttempts = Convert.ToInt32(GetConfigValue(config["maxInvalidPasswordAttempts"], "5"));
            _passwordAttemptWindow = Convert.ToInt32(GetConfigValue(config["passwordAttemptWindow"], "10"));
            _minRequiredNonAlphanumericCharacters =
                Convert.ToInt32(GetConfigValue(config["minRequiredNonAlphanumericCharacters"], "0"));
            _minRequiredPasswordLength = Convert.ToInt32(GetConfigValue(config["minRequiredPasswordLength"], "6"));

            _passwordStrengthRegularExpression =
                Convert.ToString(GetConfigValue(config["passwordStrengthRegularExpression"], "\\d*"));
            _enablePasswordReset = Convert.ToBoolean(GetConfigValue(config["enablePasswordReset"], "true"));
            _enablePasswordRetrieval = Convert.ToBoolean(GetConfigValue(config["enablePasswordRetrieval"], "true"));
            _requiresQuestionAndAnswer = Convert.ToBoolean(GetConfigValue(config["requiresQuestionAndAnswer"], "false"));
            _requiresUniqueEmail = Convert.ToBoolean(GetConfigValue(config["requiresUniqueEmail"], "true"));

            //password ֧�ֲ���rHashed
            _passwordFormat =
                (MembershipPasswordFormat)
                Enum.Parse(typeof (MembershipPasswordFormat), GetConfigValue(config["passwordFormat"], "Encrypted"),
                           true);
        }

        /// <summary>
        /// ���ݳ�Ա�ʸ��û���Ψһ��ʶ��������Դ��ȡ���û�����Ϣ���ṩһ�������û����һ�λ������/ʱ�����ѡ�
        /// </summary>
        /// <param name="username">Ҫ��ȡ����Ϣ�ĳ�Ա�ʸ��û���Ψһ��ʶ����</param>
        /// <param name="userIsOnline">���Ϊ true��������û����һ�λ������/ʱ��������Ϊ false���򷵻��û���Ϣ�����������û����һ�λ������/ʱ�����</param>
        /// <returns></returns>
        public override MembershipUser GetUser(string username, bool userIsOnline)
        {
            User User = Facotry.CreateUserDao().GetByLoginId(username);

            if (userIsOnline)
            {
                User.LastActivityDate = DateTime.Now;
                //Facotry.CreateUserDao().SaveOrUpdate(User);
            }
            return ToMembershipUser(User, this);
        }

        public override string GetUserNameByEmail(string email)
        {
            User u = Facotry.CreateUserDao().GetUserByEmail(email);
            return u.LoginId;
        }

        public override bool DeleteUser(string username, bool deleteAllRelatedData)
        {
            User u = Facotry.CreateUserDao().GetByLoginId(username);
            if (u == null)
                return false;
            Facotry.CreateUserDao().Delete(u);
            return true;
        }

        public override MembershipUserCollection GetAllUsers(int pageIndex, int pageSize, out int totalRecords)
        {
            IUserDao userDao = Facotry.CreateUserDao();
            IList<User> users = userDao.FindAll(pageIndex, pageSize);
            totalRecords = users.Count;
            var result = new MembershipUserCollection();
            foreach (User user in users)
            {
                result.Add(ToMembershipUser(user, this));
            }
            return result;
        }

        public override int GetNumberOfUsersOnline()
        {
            var onlineSpan = new TimeSpan(0, Membership.UserIsOnlineTimeWindow, 0);
            DateTime compareTime = DateTime.Now.Subtract(onlineSpan);
            return Facotry.CreateUserDao().GetActivityDateNumber(compareTime);
        }

        public override MembershipUserCollection FindUsersByName(string usernameToMatch, int pageIndex, int pageSize,
                                                                 out int totalRecords)
        {
            if (usernameToMatch == null)
                throw new ArgumentNullException("usernameToMatch");
            IList<User> result =
                Facotry.CreateUserDao().FindUsersByLoginId(usernameToMatch, pageIndex, pageSize);
            totalRecords = result.Count;
            return ToMembershipUsers(result);
        }

        public override MembershipUserCollection FindUsersByEmail(string emailToMatch, int pageIndex, int pageSize,
                                                                  out int totalRecords)
        {
            if (emailToMatch == null)
                throw new ArgumentNullException("emailToMatch");
            IList<User> result =
                Facotry.CreateUserDao().FindUsersByEmail(emailToMatch, pageIndex, pageSize);
            totalRecords = result.Count;

            return ToMembershipUsers(result);
        }

        ///<summary>
        ///Processes a request to update the password question and answer for a membership user.
        ///</summary>
        ///
        ///<returns>
        ///true if the password question and answer are updated successfully; otherwise, false.
        ///</returns>
        ///
        ///<param name="newPasswordQuestion">The new password question for the specified user. </param>
        ///<param name="newPasswordAnswer">The new password answer for the specified user. </param>
        ///<param name="username">The user to change the password question and answer for. </param>
        ///<param name="password">The password for the specified user. </param>
        public override bool ChangePasswordQuestionAndAnswer(string username, string password,
                                                             string newPasswordQuestion, string newPasswordAnswer)
        {
            User user = Facotry.CreateUserDao().GetByLoginId(username);
            if (user == null)
                return false;
            if (!user.ValidateUser(password))
            {
                return false;
            }
            user.SetQuestionAndAnswer(newPasswordQuestion, newPasswordAnswer);
            return true;
        }

        ///<summary>
        ///Gets the password for the specified user name from the data source.
        ///</summary>
        ///
        ///<returns>
        ///The password for the specified user name.
        ///</returns>
        ///
        ///<param name="username">The user to retrieve the password for. </param>
        ///<param name="answer">The password answer for the user. </param>
        public override string GetPassword(string username, string answer)
        {
            User user = Facotry.CreateUserDao().GetByLoginId(username);
            if (user.AnswertIsCorrect(answer))
                throw new MemberShipException("answer is error");
            return DecodeString(user.Password, _passwordFormat);
        }

        ///<summary>
        ///Processes a request to update the password for a membership user.
        ///</summary>
        ///
        ///<returns>
        ///true if the password was updated successfully; otherwise, false.
        ///</returns>
        ///
        ///<param name="newPassword">The new password for the specified user. </param>
        ///<param name="oldPassword">The current password for the specified user. </param>
        ///<param name="username">The user to update the password for. </param>
        public override bool ChangePassword(string username, string oldPassword, string newPassword)
        {
            IUserDao userDao = Facotry.CreateUserDao();
            User user = userDao.GetByLoginId(username);

            if (user.ChangePassword(newPassword, oldPassword))
            {
                userDao.SaveOrUpdate(user);
                return true;
            }
            return false;
        }

        ///<summary>
        ///Resets a user's password to a new, automatically generated password.
        ///</summary>
        ///
        ///<returns>
        ///The new password for the specified user.
        ///</returns>
        ///
        ///<param name="username">The user to reset the password for. </param>
        ///<param name="answer">The password answer for the specified user. </param>
        public override string ResetPassword(string username, string answer)
        {
            User user = Facotry.CreateUserDao().GetByLoginId(username);
            string newpassword = Membership.GeneratePassword(Membership.MinRequiredPasswordLength,
                                                             Membership.MinRequiredNonAlphanumericCharacters);
            user.ChangePasswordByAnswer(answer, newpassword);
            Facotry.CreateUserDao().SaveOrUpdate(user);
            return newpassword;
        }

        ///<summary>
        ///Updates information about a user in the data source.
        ///</summary>
        ///
        ///<param name="user">A <see cref="T:System.Web.Security.MembershipUser"></see> object that represents the user to update and the updated information for the user. </param>
        public override void UpdateUser(MembershipUser user)
        {
            User u = ToUser(user);
            Facotry.CreateUserDao().SaveOrUpdate(u);
        }

        ///<summary>
        ///Verifies that the specified user name and password exist in the data source.
        ///</summary>
        ///
        ///<returns>
        ///true if the specified username and password are valid; otherwise, false.
        ///</returns>
        ///
        ///<param name="username">The name of the user to validate. </param>
        ///<param name="password">The password for the specified user. </param>
        public override bool ValidateUser(string username, string password)
        {
            IUserDao userDao = Facotry.CreateUserDao();
            User u = userDao.GetByLoginId(username);
            if (u == null)
                return false;
            bool result = u.ValidateUser(password);
            userDao.SaveOrUpdate(u);
            return result;
        }

        ///<summary>
        ///Clears a lock so that the membership user can be validated.
        ///</summary>
        ///
        ///<returns>
        ///true if the membership user was successfully unlocked; otherwise, false.
        ///</returns>
        ///
        ///<param name="userName">The membership user to clear the lock status for.</param>
        public override bool UnlockUser(string userName)
        {
            User user = Facotry.CreateUserDao().GetByLoginId(userName);
            if (user.IsApproved)
            {
                user.IsLockout = true;
                return true;
            }
            return false;
        }

        ///<summary>
        ///Gets information from the data source for a user based on the unique identifier for the membership user. Provides an option to update the last-activity date/time stamp for the user.
        ///</summary>
        ///
        ///<returns>
        ///A <see cref="T:System.Web.Security.MembershipUser"></see> object populated with the specified user's information from the data source.
        ///</returns>
        ///
        ///<param name="providerUserKey">The unique identifier for the membership user to get information for.</param>
        ///<param name="userIsOnline">true to update the last-activity date/time stamp for the user; false to return user information without updating the last-activity date/time stamp for the user.</param>
        public override MembershipUser GetUser(object providerUserKey, bool userIsOnline)
        {
            IUserDao dao = Facotry.CreateUserDao();
            User u = dao.GetByLoginId(providerUserKey.ToString());
            if (userIsOnline)
            {
                u.LastActivityDate = DateTime.Now;
                dao.SaveOrUpdate(u);
            }
            return ToMembershipUser(u, this);
        }

        ///<summary>
        ///Adds a new membership user to the data source.
        ///</summary>
        ///
        ///<returns>
        ///A <see cref="T:System.Web.Security.MembershipUser"></see> object populated with the information for the newly created user.
        ///</returns>
        ///
        ///<param name="isApproved">Whether or not the new user is approved to be validated.</param>
        ///<param name="passwordAnswer">The password answer for the new user</param>
        ///<param name="username">The user name for the new user. </param>
        ///<param name="providerUserKey">The unique identifier from the membership data source for the user.</param>
        ///<param name="password">The password for the new user. </param>
        ///<param name="passwordQuestion">The password question for the new user.</param>
        ///<param name="email">The e-mail address for the new user.</param>
        ///<param name="status">A <see cref="T:System.Web.Security.MembershipCreateStatus"></see> enumeration value indicating whether the user was created successfully.</param>
        public override MembershipUser CreateUser(string username, string password, string email,
                                                  string passwordQuestion, string passwordAnswer, bool isApproved,
                                                  object providerUserKey, out MembershipCreateStatus status)
        {
            User result;
            User checkUser;
            IUserDao userDao = Facotry.CreateUserDao();
            status = MembershipCreateStatus.Success;
            //check emmail duplicate
            if (RequiresUniqueEmail)
            {
                checkUser = userDao.GetUserByEmail(email);
                if (checkUser != null)
                {
                    status = MembershipCreateStatus.DuplicateEmail;
                }
            }
            if (RequiresQuestionAndAnswer)
            {
                if (String.IsNullOrEmpty(passwordAnswer))
                    status = MembershipCreateStatus.InvalidAnswer;
                if (string.IsNullOrEmpty(passwordQuestion))
                    status = MembershipCreateStatus.InvalidQuestion;
            }

            //checkUser = userDao.Get(username);
            //if (checkUser != null)
            //{
            //    status = MembershipCreateStatus.DuplicateUserName;
            //    return null;
            //}

            try
            {
                result = new User(username, password)
                             {
                                 IsApproved = isApproved,
                             };
                result.Email = email;
                result.SetQuestionAndAnswer(passwordQuestion, passwordAnswer);
                userDao.SaveOrUpdate(result);
                userDao.Flush();
            }

            catch
            {
                status = MembershipCreateStatus.ProviderError;
                throw;
            }

            return ToMembershipUser(result, this);
        }

        /// <summary>Encodes the password based on the password format.</summary>
        /// <param name="password">The password to encode.</param>
        /// <param name="format">format for encode</param>
        /// <returns>The encoded password.</returns>
        public string EncodeString(string password, MembershipPasswordFormat format)
        {
            // the password in clear format isn't encoded, so we're done
            if (format == MembershipPasswordFormat.Clear)
            {
                return password;
            }

            // convert the password and salt to bytes
            byte[] passwordBytes = Encoding.Unicode.GetBytes(password);
            var saltBytes = new byte[0];

            // copies the salt and the password to a byte array
            var passWithSaltBytes = new byte[passwordBytes.Length + saltBytes.Length];
            byte[] encodedPassword;

            Buffer.BlockCopy(saltBytes, 0, passWithSaltBytes, 0, saltBytes.Length);
            Buffer.BlockCopy(passwordBytes, 0, passWithSaltBytes, saltBytes.Length, passwordBytes.Length);

            // generates a hash or encrypts the password
            if (format == MembershipPasswordFormat.Hashed)
            {
                HashAlgorithm hashAlgo = HashAlgorithm.Create(Membership.HashAlgorithmType);
                encodedPassword = hashAlgo.ComputeHash(passWithSaltBytes);
            }
            else
            {
                encodedPassword = EncryptPassword(passWithSaltBytes);
            }

            return Convert.ToBase64String(encodedPassword);
        }


        /// <summary>Decodes the password.</summary>
        /// <param name="password">The password to decode.</param>
        /// <param name="format">The password format used to encode it.</param>
        /// <returns>The decoded password.</returns>
        public string DecodeString(string password, MembershipPasswordFormat format)
        {
            // the password in clear format isn't encoded, so we're done
            if (format == MembershipPasswordFormat.Clear)
            {
                return password;
            }

            // a hashed password can't be retrieved
            if (format == MembershipPasswordFormat.Hashed)
            {
                return password;
                //throw new ProviderException("Error, a hased password can't be retrieved");
            }

            // otherwise decrypt the password
            byte[] encodedPassword = Convert.FromBase64String(password);
            byte[] decryptedPassword = DecryptPassword(encodedPassword);
            if (decryptedPassword == null)
            {
                return null;
            }

            // returns the decoded password ignoring the salt
            return Encoding.Unicode.GetString(decryptedPassword);
        }

        #region conver  between membership and user

        private MembershipUserCollection ToMembershipUsers(IEnumerable<User> users)
        {
            var result = new MembershipUserCollection();
            foreach (User user in users)
            {
                result.Add(ToMembershipUser(user, this));
            }
            return result;
        }


        private static MembershipUser ToMembershipUser(User user, ProviderBase provider)
        {
            var result = new MembershipUser(
                provider.Name,
                user.LoginId,
                user.Id,
                user.Email,
                user.PasswordQuestion,
                user.Remark,
                user.IsApproved,
                user.IsLockout,
                user.CreateTime,
                user.LastLoginDate.HasValue ? user.LastLoginDate.Value : DateTime.MinValue,
                user.LastActivityDate.HasValue ? user.LastActivityDate.Value : DateTime.MinValue,
                user.LastPasswordChangedDate.HasValue
                    ? user.LastPasswordChangedDate.Value
                    : DateTime.MinValue,
                user.LastLockoutDate.HasValue ? user.LastLockoutDate.Value : DateTime.MinValue
                );
            return result;
        }

        private User ToUser(MembershipUser memberShipUser)
        {
            User result = Facotry.CreateUserDao().GetByLoginId((string)memberShipUser.ProviderUserKey) ??
                          new User(memberShipUser.UserName);

            result.Name = memberShipUser.ProviderName;
            result.Email = memberShipUser.Email;
            result.Remark = memberShipUser.Comment;
            return result;
        }

        #endregion
    }
}