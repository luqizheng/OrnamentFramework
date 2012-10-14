using System.Web.Security;

namespace Ornament.MVCWebFrame.Controllers
{
    /// <summary>
    /// forms authentication service.
    /// </summary>
    public class FormsAuthenticationService : IFormsAuthentication
    {
        #region IFormsAuthentication Members

        /// <summary>
        /// sign in.
        /// </summary>
        /// <param name="userName">
        /// The user name.
        /// </param>
        /// <param name="createPersistentCookie">
        /// The create persistent cookie.
        /// </param>
        public void SignIn(string userName, bool createPersistentCookie)
        {
            FormsAuthentication.SetAuthCookie(userName, createPersistentCookie);
        }

        /// <summary>
        /// sign out.
        /// </summary>
        public void SignOut()
        {
            FormsAuthentication.SignOut();
        }

        #endregion
    }
}