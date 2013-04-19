using System.ComponentModel.DataAnnotations;
using MultiLanguage;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Languages;

namespace Ornament.Web.Models.Users
{
    public class ForgetPassword
    {
        /// <summary>
        /// 
        /// </summary>
        [Display(Name = "label_AccountOrEmail", ResourceType = typeof(MemberShipModel))]
        [DataType(DataType.Password)]
        [Required(ErrorMessageResourceType = typeof(MemberShipModel), ErrorMessageResourceName = "alertMsg_RequireAccountOrEmail")]
        public string AccountOrEmail { get; set; }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="dao"></param>
        public void Retrieve(IMemberShipFactory dao)
        {
            var user = dao.CreateUserDao().GetByLoginId(AccountOrEmail) ??
                     dao.CreateUserDao().GetUserByEmail(AccountOrEmail);
            if (user == null)
                throw new MemberShipException("Cannot find the account.");
            UserSecretToken.RetrievePassword(user, 30);
        }
    }
}