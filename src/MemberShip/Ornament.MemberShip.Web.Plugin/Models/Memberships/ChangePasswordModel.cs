using System.ComponentModel.DataAnnotations;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.MemberShipProviders;
using Ornament.MemberShip.Web.Plugin.Models.Memberships.Partials;
using Ornament.MemberShip.Web.Plugin.Properties;

namespace Ornament.MemberShip.Web.Plugin.Models.Memberships
{
    public class ChangePasswordModel : PasswordModel
    {
        [Required(ErrorMessageResourceName = "alertMsg_Require_OldPassword",
            ErrorMessageResourceType = typeof(Resources))]
        [Display(Name = "CurrentPassword", ResourceType = typeof(MemberShip.Properties.Resources))]
        [DataType(DataType.Password), UIHint("Password")]
        
        public string CurrentPassword { get; set; }

       
        public bool ChangePassword(User user, IUserDao dao)
        {
            if (NewPassword != ConfirmPassword)
            {
                return false;
            }
            string message;
            if (user.Security.ValidateUser(CurrentPassword, out message) != ValidateUserResult.Success)
            {
                return false;
            }
            bool result = user.Security.ChangePassword(NewPassword, CurrentPassword);
            dao.SaveOrUpdate(user);
            return result;
        }
    }
}