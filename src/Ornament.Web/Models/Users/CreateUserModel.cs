using System.Collections.Generic;
using System.IO;
using System.Net.Mail;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Secret;
using Ornament.Templates;

namespace Ornament.Web.Models.Users
{
    public class CreateUserModel : EditUserModel
    {
        private const string Password = "123456";
        private const string CreateVerifyUser = "/Secrity/VerifyEmailAndChangePassword";

        /// <summary>
        ///     Create a user and send a active email to user.
        /// </summary>
        public bool Create(IMemberShipFactory dao, out string errorMessage)
        {
            errorMessage = null;
            var createUser = new User(BasicInfo.LoginId, Password)
                {
                    IsApproved = false,
                    Email = BasicInfo.Email,
                    Name = OptionInfo.Name,
                    Phone = OptionInfo.Phone
                };
            //Check duplicate account.
            User user = dao.CreateUserDao().GetByLoginId(createUser.LoginId);
            if (user != null)
            {
                errorMessage = "Duplciate login Id.";
                return false;
            }

            dao.CreateUserDao().SaveOrUpdate(createUser);
            //Create Verify token
            UserSecretToken userSecretToken = UserSecretToken.VerifyEmail(createUser, 180);
            dao.CreateUserSecortTokeDao().SaveOrUpdate(userSecretToken);

            var manager = new EmailTemplateManager();
            IDictionary<string, string> variable =
                manager.GetValues(createUser, userSecretToken, Password,
                                  Path.Combine(OrnamentContext.Current.WebDomainUrl, CreateVerifyUser));

            EmailTemplate email = manager.GetCreateUser();
            MailMessage a = email.CreateEmail(OrnamentContext.Current.SupportEmail, createUser.Email, variable);
            var ss = new SmtpClient();
            ss.Send(a);
            return true;
        }
    }
}