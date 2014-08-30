using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Globalization;
using System.Linq;
using Iesi.Collections.Generic;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Permissions;

namespace Ornament.MemberShip
{
    /// <summary>
    /// </summary>
    [Serializable]
    public partial class User : Performer<User>,
        IUser,
        IUserSetting,
        IUserStatus
    {
        /// <summary>
        ///     god of the system login id
        /// </summary>
        public static readonly string AdminLoginId = "admin";

        private ContactInfo _contact;
        private OtherUserInfo _other;
        private Iesi.Collections.Generic.ISet<Permission> _permissions;
        private SecurityInfo _security;

        private TimeZoneInfo _timeZone;
        private string _timeZoneId;
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
            : this(loginId)
        {
            if (loginId == null) throw new ArgumentNullException("loginId");
            if (password == null) throw new ArgumentNullException("password");

            if (_security == null)
                _security = new SecurityInfo(this);
            _security.ChangePassword(password);
        }

        /// <summary>
        ///     Initializes a new instance of the <see cref="User" /> class.
        /// </summary>
        /// <param name="loginId">
        ///     The login id.
        /// </param>
        /// <exception cref="ArgumentNullException">loginId is null </exception>
        public User(string loginId)
        {
            if (loginId == null) throw new ArgumentNullException("loginId");
            LoginId = loginId.Trim();
            _security = new SecurityInfo(this);
            _contact = new ContactInfo(this);

            _other = new OtherUserInfo {CreateTime = DateTime.Now};
        }

        /// <summary>
        ///     是否为administrator
        /// </summary>
        public virtual bool IsRoot
        {
            get { return LoginId == AdminLoginId; }
        }

        public virtual SecurityInfo Security
        {
            get { return _security ?? (_security = new SecurityInfo(this)); }
        }


        /// <summary>
        ///     获取Timezone对象
        /// </summary>
        public virtual TimeZoneInfo TimeZone
        {
            get
            {
                if (!String.IsNullOrEmpty(TimeZoneId))
                {
                    if (_timeZone == null || _timeZone.Id != TimeZoneId)
                        return _timeZone = TimeZoneInfo.FindSystemTimeZoneById(TimeZoneId);
                    return _timeZone;
                }
                return TimeZoneInfo.Local;
            }
        }

        public virtual OtherUserInfo Other
        {
            get { return _other ?? (_other = new OtherUserInfo()); }
        }

        public virtual ContactInfo Contact
        {
            get { return _contact ?? (_contact = new ContactInfo(this)); }
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
            if (LoginId == AdminLoginId)
                return true;
            return InRole(role, true);
        }

        /// <summary>
        /// </summary>
        /// <param name="role"></param>
        /// <param name="forAll">true在Roles,UserGroup,false,只在for中查找</param>
        /// <returns></returns>
        public virtual bool InRole(Role role, bool forAll)
        {
            if (LoginId == AdminLoginId)
                return true;
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
        public virtual Iesi.Collections.Generic.ISet<UserGroup> UserGroups
        {
            get { return _userGroups ?? (_userGroups = new HashedSet<UserGroup>()); }
        }

        #endregion

        public virtual string LoginId { get; set; }

        public virtual Org Org { get; set; }

        public virtual string TimeZoneId
        {
            get { return _timeZoneId; }
            set
            {
                _timeZoneId = value;
                ModifyUpdateTime();
            }
        }


        public virtual string Language { get; set; }

        /// <summary>
        ///     Gets or sets Deny, if set to True, user can't be access
        /// </summary>
        public virtual bool IsDeny { get; set; }

        #region IPerformer Members

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

        protected override IList<User> GetInsideUsers(IMemberShipFactory memberShipFactory)
        {
            return new List<User>
            {
                this,
            };
        }

        protected override string GetPerformerType()
        {
            return PerformerType.User.ToString();
        }

        #endregion

        public virtual CultureInfo GetLanguage()
        {
            try
            {
                if (!String.IsNullOrEmpty(Language))
                    return CultureInfo.GetCultureInfo(Language);
                return CultureInfo.CurrentCulture;
            }
            catch (CultureNotFoundException)
            {
                return CultureInfo.CurrentCulture;
            }
        }

        private void ModifyUpdateTime()
        {
            if (!String.IsNullOrEmpty(Id))
            {
                Other.UpdateTime = DateTime.Now;
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
    }
}