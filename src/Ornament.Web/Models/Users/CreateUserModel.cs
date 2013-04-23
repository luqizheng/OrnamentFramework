using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.Templates;

namespace Ornament.Web.Models.Users
{
    public class CreateUserModel : EditUserModel
    {
        /// <summary>
        ///     Create a user and send a active email to user.
        /// </summary>
        public bool Create(IMemberShipFactory dao, out string errorMessage)
        {
            errorMessage = null;
            var createUser = new User(BasicInfo.LoginId, "123456")
                {
                    IsApproved = false,
                    Email = BasicInfo.Email,
                    Name = OptionInfo.Name,
                    Phone = OptionInfo.Phone
                };
            User user = dao.CreateUserDao().GetByLoginId(createUser.LoginId);
            if (user != null)
            {
                errorMessage = "Duplciate login Id.";
                return false;
            }
            dao.CreateUserDao().SaveOrUpdate(createUser);
            var acto=Ornament.MemberShip.Secret.UserSecretToken.VerifyUser(user, 180);


            EmailTemplateManager manager=new EmailTemplateManager();
            var email = manager.GetCreateUser();
            email.CreateEmail(OrnamentContext.Current.SupportEmail,user.Email,)
            return true;
        }
    }
}