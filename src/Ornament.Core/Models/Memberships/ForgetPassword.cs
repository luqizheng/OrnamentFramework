using System.ComponentModel.DataAnnotations;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.Properties;

namespace Ornament.Models.Memberships
{
    public class ForgetPassword
    {
        /// <summary>
        /// </summary>
        [Display(Name = "label_AccountOrEmail", ResourceType = typeof (Resources))]
        [DataType(DataType.Password)]
        [Required(ErrorMessageResourceType = typeof (Resources),
            ErrorMessageResourceName = "alertMsg_RequireAccountOrEmail")]
        public string AccountOrEmail { get; set; }

        /// <summary>
        /// </summary>
        /// <param name="daoFactory"></param>
        public void
            Retrieve(IMemberShipFactory daoFactory)
        {
            User user = daoFactory.CreateUserDao().GetByLoginId(AccountOrEmail) ??
                        daoFactory.CreateUserDao().GetUserByEmail(AccountOrEmail);
            MemberSecrityManager aa = MemberSecrityManager.ForgetPassword(user, 1440);
            aa.SendToken();
        }
    }
}