using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Iesi.Collections.Generic;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Languages;
using Ornament.MemberShip.MemberShipProviders;
using Ornament.MemberShip.Permissions;
using Qi;
using Qi.Secret;

namespace Ornament.MemberShip
{
    /// <summary>
    /// </summary>
    [Serializable]
    public partial class User : Member<User>, IPerformer
    {
        /// <summary>
        ///     god of the system login id
        /// </summary>
        public static readonly string AdminLoginId = "admin";

        protected DateTime _createTime;
        //private UserInformation _information;
        private bool _isLockout;
        private string _password;
        private string _passwordAnswer;
        private string _passwordQuestion;
        private Iesi.Collections.Generic.ISet<Permission> _permissions;
        private TimeZoneInfo _timeZone;
        private Iesi.Collections.Generic.ISet<UserGroup> _userGroups;

        /// <summary>
        ///     Initializes a new instance of the <see cref="User" /> class.
        /// </summary>
        protected User()
        {
        }

        /// <summary>
        ///     Initializes a new instance of the <see cref="User" /> class.
        /// </summary>
        /// <param name="loginId">
        ///     The login id.
        /// </param>
        /// <param name="password">
        ///     The password.
        /// </param>
        public User(string loginId, string password)
        {
            if (loginId == null) throw new ArgumentNullException("loginId");
            if (password == null) throw new ArgumentNullException("password");
            LoginId = loginId;
            _password = MembershipContext.Provider.Encrypt(password);
            CreateTime = DateTime.Now;
            IsApproved = true;
        }

        /// <summary>
        ///     Initializes a new instance of the <see cref="User" /> class.
        /// </summary>
        /// <param name="loginId">
        ///     The login id.
        /// </param>
        public User(string loginId)
        {
            if (loginId == null) throw new ArgumentNullException("loginId");
            LoginId = loginId;
            CreateTime = DateTime.Now;
        }

        /// <summary>
        ///     获取用户创建时间
        /// </summary>
        [Display(Name = "CreateTime", ResourceType = typeof (MembershipCommon))]
        public virtual DateTime CreateTime { get; protected set; }

        /// <summary>
        ///     Gets or sets IsLockout.
        /// </summary>
        /// <value>
        ///     The is lockout.
        /// </value>
        [Display(Name = "IsLockout", ResourceType = typeof (MembershipCommon))]
        public virtual bool IsLockout
        {
            get { return _isLockout; }

            set
            {
                _isLockout = value;
                LastLockoutDate = DateTime.Now;
            }
        }

        /// <summary>
        ///     获取或设定用户是否已经获准使用
        /// </summary>
        [Display(Name = "IsApproved", ResourceType = typeof (MembershipCommon))]
        public virtual bool IsApproved { get; set; }

        /// <summary>
        ///     获取用户最后改变时间
        /// </summary>
        [Display(Name = "LastPasswordChangedTime", ResourceType = typeof (MembershipCommon))]
        public virtual DateTime? LastPasswordChangedDate { get; set; }

        /// <summary>
        ///     获取用户被锁定的时间
        /// </summary>
        [Display(Name = "LastLockTime", ResourceType = typeof (MembershipCommon))]
        public virtual DateTime? LastLockoutDate { get; protected set; }

        /// <summary>
        ///     获取用户最后登录时间
        /// </summary>
        [Display(Name = "LastLoginTime", ResourceType = typeof (MembershipCommon))]
        public virtual DateTime? LastLoginDate { get; protected set; }

        /// <summary>
        ///     获取或设定用户最后活跃时间
        /// </summary>
        [Display(Name = "LastActivityTime", ResourceType = typeof (MembershipCommon))]
        public virtual DateTime? LastActivityDate { get; set; }

        /// <summary>
        ///     Gets or sets UpdateTime.
        /// </summary>
        /// <value>
        ///     The update time.
        /// </value>
        [Display(Name = "LastUpdateTime", ResourceType = typeof (MembershipCommon))]
        public virtual DateTime? UpdateTime { get; protected set; }


        /// <summary>
        ///     Gets Password.
        /// </summary>
        /// <value>
        ///     The password.
        /// </value>
        [Display(Name = "Password", ResourceType = typeof (MembershipCommon)),
         Required(AllowEmptyStrings = false, ErrorMessageResourceName = "RequirePassword",
             ErrorMessageResourceType = typeof (ErrorMessage))]
        public virtual string Password
        {
            get { return MembershipContext.Provider.Decrypt(_password); }
        }


        /// <summary>
        ///     Gets or sets LoginId.
        /// </summary>
        /// <value>
        ///     The login id.
        /// </value>
        [Display(Name = "LoginId", ResourceType = typeof (MembershipCommon)),
         Required(AllowEmptyStrings = false, ErrorMessageResourceName = "RequireLoginId",
             ErrorMessageResourceType = typeof (ErrorMessage)), RegularExpression(@"^[a-zA-z1-9_-]{1,20}",
                 ErrorMessageResourceName = "LoginNotCorrectFormat", ErrorMessageResourceType = typeof (ErrorMessage))]
        public virtual string LoginId { get; set; }


        ///// <summary>
        ///// Gets Information.
        ///// </summary>
        ///// <value>
        ///// The information.
        ///// </value>
        //public virtual UserInformation Information
        //{
        //    get { return _information ?? (_information = new UserInformation(this)); }
        //}

        private string TimeZoneId { get; set; }

        /// <summary>
        ///     Gets PasswordQuestion.
        /// </summary>
        /// <value>
        ///     The password question.
        /// </value>
        [Display(Name = "PasswordQuestion", ResourceType = typeof (MembershipCommon)),
         Required(AllowEmptyStrings = false,
             ErrorMessageResourceName = "RequirePasswordQuestion", ErrorMessageResourceType = typeof (ErrorMessage))]
        public virtual string PasswordQuestion
        {
            protected set
            {
                ModifyUpdateTime();
                _passwordQuestion = value;
            }
            get { return _passwordQuestion; }
        }

        /// <summary>
        ///     Gets the answer of <see cref="PasswordQuestion" />. It alwasy entrypted by md5
        /// </summary>
        [Display(Name = "PasswordAnswer", ResourceType = typeof (MembershipCommon)),
         Required(AllowEmptyStrings = false, ErrorMessageResourceName = "RequirePasswordAnswer",
             ErrorMessageResourceType = typeof (ErrorMessage)),
         StringLength(50, MinimumLength = 0, ErrorMessageResourceName = "PasswordQuestionAnswerOverMaxLength",
             ErrorMessageResourceType = typeof (ErrorMessage))]
        public virtual string PasswordAnswer
        {
            protected set
            {
                ModifyUpdateTime();
                _passwordAnswer = value;
            }
            get { return _passwordAnswer; }
        }

        public virtual IEnumerable<Permission> Permissions
        {
            get
            {
                if (_permissions == null)
                {
                    _permissions = new HashedSet<Permission>();

                    foreach (Role role in Roles)
                    {
                        _permissions.AddAll(role.Permissions);
                    }
                    foreach (UserGroup g in UserGroups)
                    {
                        foreach (Permission p in g.Permissions)
                        {
                            _permissions.Add(p);
                        }
                    }
                }
                return _permissions;
            }
        }

        /// <summary>
        ///     Gets or sets the TimeZone
        /// </summary>
        public virtual TimeZoneInfo TimeZone
        {
            get
            {
                if (_timeZone != null)
                    return _timeZone;
                if (String.IsNullOrEmpty(TimeZoneId))
                {
                    TimeZoneId = TimeZoneInfo.Local.Id;
                }
                _timeZone = TimeZoneInfo.FindSystemTimeZoneById(TimeZoneId);
                return _timeZone;
            }
            set
            {
                TimeZoneId = value.Id;
                _timeZone = value;
            }
        }

        #region Member

        /// <summary>
        /// </summary>
        /// <param name="role">
        ///     The role.
        /// </param>
        /// <returns>
        /// </returns>
        /// <exception cref="ArgumentNullException">
        /// </exception>
        public override bool InRole(Role role)
        {
            return InRole(role, true);
        }

        /// <summary>
        /// </summary>
        /// <param name="role"></param>
        /// <param name="forAll">true在Roles,UserGroup,false,只在for中查找</param>
        /// <returns></returns>
        public virtual bool InRole(Role role, bool forAll)
        {
            bool result = base.InRole(role);
            if (result)
            {
                return true;
            }
            if (!forAll)
            {
                return false;
            }

            return UserGroups.Any(ug => ug.InRole(role));
        }

        #endregion

        #region UserGroup Method

        /// <summary>
        ///     Gets UserGroups.
        /// </summary>
        /// <value>
        ///     The user groups.
        /// </value>
        protected virtual Iesi.Collections.Generic.ISet<UserGroup> UserGroups
        {
            get { return _userGroups ?? (_userGroups = new HashedSet<UserGroup>()); }
        }

        /// <summary>
        /// </summary>
        /// <param name="ug">
        ///     The ug.
        /// </param>
        /// <returns>
        /// </returns>
        /// <exception cref="ArgumentNullException">
        /// </exception>
        public virtual bool AddToUserGroup(UserGroup ug)
        {
            if (ug == null)
            {
                throw new ArgumentNullException("ug");
            }
            ModifyUpdateTime();
            return UserGroups.Add(ug);
        }

        /// <summary>
        /// </summary>
        /// <param name="ug">
        ///     The ug.
        /// </param>
        /// <returns>
        /// </returns>
        /// <exception cref="ArgumentNullException">
        /// </exception>
        public virtual bool Remove(UserGroup ug)
        {
            if (ug == null)
            {
                throw new ArgumentNullException("ug");
            }
            ModifyUpdateTime();
            return UserGroups.Remove(ug);
        }

        /// <summary>
        /// </summary>
        public virtual void ClearUserGroup()
        {
            UserGroups.Clear();
        }

        /// <summary>
        /// </summary>
        /// <returns>
        /// </returns>
        public virtual ReadOnlyCollection<UserGroup> GetUserGroups()
        {
            var result = new List<UserGroup>(UserGroups);
            return new ReadOnlyCollection<UserGroup>(result);
        }

        #endregion

        #region IPerformer Members

        [Display(Name = "Org", ResourceType = typeof (MembershipCommon))]
        public virtual Org Org { get; set; }

        string IPerformer.Id
        {
            get { return Id; }
            set { throw new NotImplementedException("Can't set the User's Id"); }
        }

        /// <summary>
        /// </summary>
        /// <exception cref="ArgumentOutOfRangeException">Name's length more than 30</exception>
        [Display(Name = "Name", ResourceType = typeof (MembershipCommon)),
         RegularExpression(".{1,30}", ErrorMessageResourceName = "RequireName",
             ErrorMessageResourceType = typeof (ErrorMessage))]
        public override string Name
        {
            get
            {
                if (!string.IsNullOrEmpty(base.Name))
                    return base.Name;
                return LoginId;
            }
            set { base.Name = value; }
        }


        IList<User> IPerformer.GetUsers(IMemberShipFactory memberShip)
        {
            return new List<User> {this};
        }

        PerformerType IPerformer.Type
        {
            get { return PerformerType.User; }
        }

        #endregion

        private void ModifyUpdateTime()
        {
            if (!String.IsNullOrEmpty(Id))
            {
                UpdateTime = DateTime.Now;
            }
        }

        public virtual ReadOnlyCollection<Role> GetRoles()
        {
            return new ReadOnlyCollection<Role>(new List<Role>(base.Roles));
        }

        /// <summary>
        ///     Gets all Rols those this user can use
        /// </summary>
        /// <returns></returns>
        public override IEnumerable<Role> GetAllRoles()
        {
            Iesi.Collections.Generic.ISet<Role> result = new HashedSet<Role>(Roles);
            foreach (UserGroup ug in UserGroups)
            {
                foreach (Role role in ug.GetAllRoles())
                {
                    result.Add(role);
                }
            }
            return new List<Role>(result);
        }

        /// <summary>
        ///     set Question and Answer. This function always set answer never check old answer and question.
        /// </summary>
        /// <param name="answer">
        /// </param>
        /// <param name="question">
        /// </param>
        /// <exception cref="ArgumentNullException">
        ///     answer or question is null or empty
        /// </exception>
        public virtual void SetQuestionAndAnswer(string question, string answer)
        {
            if (String.IsNullOrEmpty(answer))
            {
                throw new ArgumentNullException("answer");
            }

            if (String.IsNullOrEmpty(question))
            {
                throw new ArgumentNullException("question");
            }
            PasswordAnswer = answer.Trim().Sha1Utf8().ToStringEx();
            PasswordQuestion = question.Trim();
        }

        /// <summary>
        ///     直接改变密码
        /// </summary>
        /// <param name="newPassword">
        /// </param>
        /// <param name="oldPassword">
        /// </param>
        /// <returns>
        /// </returns>
        public virtual bool ChangePassword(string newPassword, string oldPassword)
        {
            if (MembershipContext.Provider.Encrypt(oldPassword) == Password)
            {
                ChangePassword(newPassword);
                LastPasswordChangedDate = DateTime.Now;
                return true;
            }
            return false;
        }

        /// <summary>
        /// </summary>
        /// <param name="newPassword"></param>
        /// <exception cref="ArgumentNullException">Password is null or empty</exception>
        /// <exception cref="PasswordFormatException">ArgumentException's length is too short</exception>
        public virtual void ChangePassword(string newPassword)
        {
            if (String.IsNullOrEmpty(newPassword))
            {
                throw new ArgumentNullException("newPassword");
            }
            if (newPassword.Length < 3)
                throw new PasswordFormatException("newPassword's length is too short.");
            _password = MembershipContext.Provider.Encrypt(newPassword);
            LastPasswordChangedDate = DateTime.Now;
        }

        /// <summary>
        /// </summary>
        /// <param name="answer">
        ///     The answer.
        /// </param>
        /// <returns>
        /// </returns>
        /// <exception cref="ArgumentNullException">
        ///     answer is null or
        /// </exception>
        public virtual bool AnswertIsCorrect(string answer)
        {
            if (String.IsNullOrEmpty(answer))
            {
                throw new ArgumentNullException("answer");
            }

            return PasswordAnswer == answer.Sha1Utf8().ToStringEx();
            ;
        }

        /// <summary>
        /// </summary>
        /// <param name="answer">
        ///     The answer.
        /// </param>
        /// <param name="newPassword">
        ///     The new password.
        /// </param>
        /// <exception cref="ArgumentNullException">
        /// </exception>
        /// <exception cref="MemberShipPermissionException">
        /// </exception>
        public virtual void ChangePasswordByAnswer(string answer, string newPassword)
        {
            if (String.IsNullOrEmpty(answer))
            {
                throw new ArgumentNullException("answer", "Password answer is requested");
            }

            if (PasswordAnswer == null)
            {
                throw new MemberShipPermissionException("Password Answer of user is not setting");
            }

            if (PasswordAnswer == answer.Sha1Utf8().ToStringEx())
            {
                _password = newPassword;
                LastPasswordChangedDate = DateTime.Now;
            }
            else
            {
                throw new MemberShipPermissionException("answer is not correct");
            }
        }

        /// <summary>
        ///     该用户是否能够登录
        /// </summary>
        /// <param name="inputPassword">
        /// </param>
        /// <returns>
        /// </returns>
        public virtual bool ValidateUser(string inputPassword)
        {
            if (String.IsNullOrEmpty(inputPassword))
            {
                throw new ArgumentNullException("inputPassword");
            }

            if (IsLockout)
            {
                throw new MemberShipException("User is locked");
            }

            if (!IsApproved)
            {
                throw new MemberShipException("User isn't approved");
            }

            if (MembershipContext.Provider.Encrypt(inputPassword) == Password)
            {
                LastLoginDate = DateTime.Now;
                LastActivityDate = DateTime.Now;
                return true;
            }

            return false;
        }
    }
}