using System.Web.Security;

namespace WebApplication.Controllers
{
    /// <summary>
    /// account membership service.
    /// </summary>
    public class AccountMembershipService : IMembershipService
    {
        /// <summary>
        /// _provider.
        /// </summary>
        private readonly MembershipProvider _provider;

        /// <summary>
        /// Initializes a new instance of the <see cref="AccountMembershipService"/> class.
        /// </summary>
        public AccountMembershipService()
            : this(null)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="AccountMembershipService"/> class.
        /// </summary>
        /// <param name="provider">
        /// The provider.
        /// </param>
        public AccountMembershipService(MembershipProvider provider)
        {
            _provider = provider ?? Membership.Provider;
        }

        #region IMembershipService Members

        /// <summary>
        /// Gets MinPasswordLength.
        /// </summary>
        public int MinPasswordLength
        {
            get { return _provider.MinRequiredPasswordLength; }
        }

        /// <summary>
        /// change password.
        /// </summary>
        /// <param name="userName">
        /// The user name.
        /// </param>
        /// <param name="oldPassword">
        /// The old password.
        /// </param>
        /// <param name="newPassword">
        /// The new password.
        /// </param>
        /// <returns>
        /// The change password.
        /// </returns>
        public bool ChangePassword(string userName, string oldPassword, string newPassword)
        {
            MembershipUser currentUser = _provider.GetUser(userName, true /* userIsOnline */);
            return currentUser.ChangePassword(oldPassword, newPassword);
        }

        /// <summary>
        /// create user.
        /// </summary>
        /// <param name="userName">
        /// The user name.
        /// </param>
        /// <param name="password">
        /// The password.
        /// </param>
        /// <param name="email">
        /// The email.
        /// </param>
        /// <returns>
        /// </returns>
        public MembershipCreateStatus CreateUser(string userName, string password, string email)
        {
            MembershipCreateStatus status;
            _provider.CreateUser(userName, password, email, null, null, true, null, out status);
            return status;
        }

        /// <summary>
        /// validate user.
        /// </summary>
        /// <param name="userName">
        /// The user name.
        /// </param>
        /// <param name="password">
        /// The password.
        /// </param>
        /// <returns>
        /// The validate user.
        /// </returns>
        public bool ValidateUser(string userName, string password)
        {
            return _provider.ValidateUser(userName, password);
        }

        #endregion
    }
}