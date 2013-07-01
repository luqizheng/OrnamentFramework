using System.ComponentModel.DataAnnotations;
using System.Net.Mail;
using MultiLanguage;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Security;

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
        public void Retrieve(IMemberShipFactory daoFactory)
        {
            User user = daoFactory.CreateUserDao().GetByLoginId(AccountOrEmail) ??
                       daoFactory.CreateUserDao().GetUserByEmail(AccountOrEmail);
            var aa = MemberSecrityManager.ForgetPassword(user, 1440);
            aa.SendToken();
        }
    }
}