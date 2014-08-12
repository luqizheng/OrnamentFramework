using System.Web.Security;

namespace WebApplication.Controllers
{
    /// <summary>
    /// i membership service.
    /// </summary>
    public interface IMembershipService
    {
        /// <summary>
        /// Gets MinPasswordLength.
        /// </summary>
        int MinPasswordLength { get; }

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
        bool ValidateUser(string userName, string password);

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
        MembershipCreateStatus CreateUser(string userName, string password, string email);

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
        bool ChangePassword(string userName, string oldPassword, string newPassword);
    }
}