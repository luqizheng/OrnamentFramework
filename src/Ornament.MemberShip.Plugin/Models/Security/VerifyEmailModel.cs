using System.ComponentModel;
using Ornament.MemberShip.Dao;

namespace Ornament.MemberShip.Plugin.Models.Security
{
    public class VerifyEmailModel
    {
        [DisplayName("LoginId")]
        public  string LoginId { get; set; }
        [DisplayName("Email")]
        public  string Email { get; set; }


        public bool Veirfy(IMemberShipFactory daoFactory)
        {
            var user =
                daoFactory.CreateUserDao().GetByLoginId(LoginId);
            if (user.Contact.Email == Email)
            {
                MemberSecrityManager manager =
                    MemberSecrityManager.CreateEmailChangedToken(user, 30);
                manager.SendToken();

                return true;
            }
            return false;
        }
    }
}
