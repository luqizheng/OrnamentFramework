using Ornament.MemberShip;
using Ornament.MemberShip.Dao;

namespace Ornament.Web.Models.Users
{
    public class ForgetPassword
    {
        /// <summary>
        /// 
        /// </summary>
        public string AccountOrEmail { get; set; }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="dao"></param>
        public void Retrieve(IMemberShipFactory dao)
        {
            var user = dao.CreateUserDao().GetByLoginId(AccountOrEmail) ??
                     dao.CreateUserDao().GetUserByEmail(AccountOrEmail);
            if (user == null)
                throw new MemberShipException("Cannot find the account.");
            UserSecretToken.RetrievePassword(user, 30);
        }
    }
}