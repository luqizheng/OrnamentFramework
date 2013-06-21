using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Net.Mail;
using System.Threading;
using System.Web.Mvc;
using MultiLanguage;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Languages;

using Ornament.MemberShip.Secret;
using Ornament.Models.Memberships.Partials;
using Ornament.Templates;
using log4net;

namespace Ornament.Models.Memberships
{
    public class CreateUserModel
    {
        private const string Password = "123456";
        private const string CreateVerifyUser = "/Secrity/VerifyEmailAndChangePassword";

        public CreateUserModel()
        {
            BasicInfo = new UserBasicInfoModel();
        
            OptionInfo = new UserOptionInformation();
        }

        [UIHint("UserBasicInfo")]
        public UserBasicInfoModel BasicInfo { get; set; }


        /// <summary>
        /// </summary>
        [Display(Name = "LoginId", ResourceType = typeof(MemberShipModel))]
        [Required(ErrorMessageResourceName = "error_MissLoginId", ErrorMessageResourceType = typeof(MemberShipModel))]
        [RegularExpression(@"^[a-zA-z1-9_-]{1,20}", ErrorMessageResourceName = "LoginNotCorrectFormat",
            ErrorMessageResourceType = typeof(ErrorMessage))]
        [UIHint("String")]
        [Remote("NotDuplicate", "User", "MemberShips", ErrorMessageResourceName = "alertMsg_duplicate_loginId", ErrorMessageResourceType = typeof(MemberShipModel))]
        public string LoginId { get; set; }

    

        [UIHint("UserOptionInfo")]
        public UserOptionInformation OptionInfo { get; set; }

        /// <summary>
        ///     Create a user and send a active email to user.
        /// </summary>
        public bool Create(IMemberShipFactory dao, out string errorMessage)
        {
            errorMessage = null;
            var createUser = new User(LoginId, Password)
                {
                    IsApproved = false,
                    Email = BasicInfo.Email,
                    Name = OptionInfo.Name,
                    Phone = OptionInfo.Phone
                };
            //Check duplicate account.
            IUserDao userDao = dao.CreateUserDao();
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

            //SendEmail(userSecretToken, createUser);

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
                            manager.GetValues(userSecretToken,
                                              OrnamentContext.Configuration.ApplicationSetting.WebDomainUrl +
                                              CreateVerifyUser);
                        variable.Add("Password", Password);
                        EmailTemplate email = manager.GetCreateUser();
                        MailMessage mailMessage =
                            email.CreateEmail(OrnamentContext.Configuration.ApplicationSetting.SupportEmail,
                                              createUser.Email,
                                              variable);
                        using (var ss = new SmtpClient())
                        {
                            ss.Send(mailMessage);
                            ss.Dispose();
                        }
                    }
                    catch (Exception ex)
                    {
                        LogManager.GetLogger(GetType())
                                  .Error("Send verify email fail for user " + createUser.LoginId, ex);
                    }
                });
        }
    }
}