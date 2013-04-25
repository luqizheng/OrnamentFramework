using System.ComponentModel.DataAnnotations;
using System.Net.Mail;
using MultiLanguage;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Secret;

namespace Ornament.Models.Memberships
{
    public class ForgetPassword
    {
        /// <summary>
        /// </summary>
        [Display(Name = "label_AccountOrEmail", ResourceType = typeof(MemberShipModel))]
        [DataType(DataType.Password)]
        [Required(ErrorMessageResourceType = typeof(MemberShipModel),
            ErrorMessageResourceName = "alertMsg_RequireAccountOrEmail")]
        public string AccountOrEmail { get; set; }

        /// <summary>
        /// </summary>
        /// <param name="daoFactory"></param>
        public void Retrieve(IMemberShipFactory daoFactory, string content, string domainUrl)
        {
            User user = daoFactory.CreateUserDao().GetByLoginId(AccountOrEmail) ??
                        daoFactory.CreateUserDao().GetUserByEmail(AccountOrEmail);
            if (user == null)
                throw new MemberShipException("Cannot find the account.");
            UserSecretToken s = UserSecretToken.RetrievePassword(user, 30);
            UserSecretToken token = daoFactory.CreateUserSecortTokeDao().Get(s.Account, s.Action);
            if (token != null)
            {
                token.Renew();
            }
            else
            {
                token = s;
            }
            daoFactory.CreateUserSecortTokeDao().Save(token);

            //send email
            var mail = new MailMessage("fantasylu@126.com", user.Email, "取回密码", "")
                {
                    Body = domainUrl + "/ChangedPassword?" + token.CreateQueryString()
                };
            var smtp = new SmtpClient();
            smtp.Send(mail);
        }
    }
}