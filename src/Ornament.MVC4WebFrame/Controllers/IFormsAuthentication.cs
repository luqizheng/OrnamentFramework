namespace Ornament.MVCWebFrame.Controllers
{
    /// <summary>
    /// i forms authentication.
    /// </summary>
    public interface IFormsAuthentication
    {
        /// <summary>
        /// sign in.
        /// </summary>
        /// <param name="userName">
        /// The user name.
        /// </param>
        /// <param name="createPersistentCookie">
        /// The create persistent cookie.
        /// </param>
        void SignIn(string userName, bool createPersistentCookie);

        /// <summary>
        /// sign out.
        /// </summary>
        void SignOut();
    }
}