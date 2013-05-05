using System.Collections.Generic;
using System.IO;
using System.Net.Mail;
using System.Threading;
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
            var userDao = dao.CreateUserDao();
            User user = userDao.GetByLoginId(createUser.LoginId);
            if (user != null)
            {
                errorMessage = "Duplciate login Id.";
                return false;
            }

            userDao.SaveOrUpdate(createUser);
            userDao.Flush();

            //Create Verify token
            UserSecretToken userSecretToken = UserSecretToken.VerifyEmail(createUser, 180);
            dao.CreateUserSecortTokeDao().SaveOrUpdate(userSecretToken);

            SendEmail(userSecretToken, createUser);

            return true;
        }

        private void SendEmail(UserSecretToken userSecretToken, User createUser)
        {
            ThreadPool.QueueUserWorkItem(s =>
            {
                try
                {
                    var manager = new EmailTemplateManager();
                    IDictionary<string, string> variable =
                        manager.GetValues(userSecretToken, Context.Setting.WebDomainUrl + CreateVerifyUser);
                    variable.Add("Password", Password);
                    EmailTemplate email = manager.GetCreateUser();
                    MailMessage mailMessage = email.CreateEmail(Context.Setting.SupportEmail, createUser.Email, variable);
                    using (var ss = new SmtpClient())
                    {
                        ss.Send(mailMessage);
                        ss.Dispose();
                    }
                }
                catch (System.Exception ex)
                {
                    log4net.LogManager.GetLogger(this.GetType()).Error("Send verify email fail for user " + createUser.LoginId, ex);
                }
            });
        }

    }
}