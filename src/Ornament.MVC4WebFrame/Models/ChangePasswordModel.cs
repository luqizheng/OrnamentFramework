using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;
using System.Web.Security;
using MultiLanguage;
using Ornament.MemberShip;
using Ornament.MemberShip.Languages;
using Ornament.Web;
using Ornament.Web.MemberShips;

namespace Ornament.MVCWebFrame.Models
{
    public class ChangePasswordModel
    {
        [Required(ErrorMessageResourceName = "alertMsg_Require_OldPassword",
            ErrorMessageResourceType = typeof (Message))]
        [Display(Name = "CurrentPassword", ResourceType = typeof (MembershipCommon))]
        [DataType(DataType.Password)]
        public string CurrentPassword { get; set; }

        [Display(Name = "NewPassword", ResourceType = typeof (MembershipCommon))]
        [Required(ErrorMessageResourceName = "alertMsg_Require_NewPassword",
            ErrorMessageResourceType = typeof (Message))]
        [DataType(DataType.Password)]
        public string NewPassword { get; set; }


        [Display(Name = "ConfirmPassword", ResourceType = typeof (MembershipCommon))]
        [DataType(DataType.Password)]
        [Required(ErrorMessageResourceType = typeof (Message),
            ErrorMessageResourceName = "alert_Require_ConfirmPassword")]
        [System.ComponentModel.DataAnnotations.Compare("NewPassword", ErrorMessageResourceName = "alertMsg_Confirm_Password_Not_Equal_New_password",
            ErrorMessageResourceType = typeof (Message))]
        public string ConfirmPassword { get; set; }


        internal void Change(ModelStateDictionary modelState)
        {
            var a = (MemberShipProvider) System.Web.Security.Membership.Provider;
            User user = OrnamentContext.Current.CurrentUser;
            if (!user.ChangePassword(a.EncodeString(NewPassword, MembershipPasswordFormat.Hashed),
                                     a.DecodeString(CurrentPassword, MembershipPasswordFormat.Hashed)))
            {
                string errorMsg = MemberShipModel.ResourceManager.GetString("alertMsg_OldPasswordNotRight");
                modelState.AddModelError("CurrentPassword", errorMsg);
            }
        }
    }
}