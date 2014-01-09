using System.ComponentModel.DataAnnotations;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Plugin.Properties;

namespace Ornament.MemberShip.Plugin.Models.Memberships
{
    public class ForgetPassword
    {
        /// <summary>
        /// </summary>
        [Display(Name = "label_AccountOrEmail", ResourceType = typeof(Properties.Resources))]
        [DataType(DataType.Password)]
        [Required(ErrorMessageResourceType = typeof(Properties.Resources),
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