using System.Collections.Generic;
using System.IO;
using System.Net.Mail;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Secret;
using Ornament.Models.Memberships.Partials;
using Ornament.Templates;

namespace Ornament.Models.Memberships
{
    public class CreateUserModel
    {
        private const string Password = "123456";
        private const string CreateVerifyUser = "/Secrity/VerifyEmailAndChangePassword";

        public CreateUserModel()
        {
            BasicInfo = new UserBasicInfoModel();
            State = new UserStateModel();
            OptionInfo = new UserOptionInformation();
        }

        public UserBasicInfoModel BasicInfo { get; set; }
        public UserStateModel State { get; set; }
        public UserOptionInformation OptionInfo { get; set; }

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
                manager.GetValues(userSecretToken, Path.Combine(Context.Setting.WebDomainUrl, CreateVerifyUser));
            variable.Add("Password", Password);
            EmailTemplate email = manager.GetCreateUser();
            MailMessage a = email.CreateEmail(Context.Setting.SupportEmail, createUser.Email, variable);
            var ss = new SmtpClient();
            ss.Send(a);
            return true;
        }
    }
}