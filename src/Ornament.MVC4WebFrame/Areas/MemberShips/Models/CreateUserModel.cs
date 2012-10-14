using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;
using Ornament.MVCWebFrame.Controllers;
using Ornament.MVCWebFrame.Models;
using Ornament.MemberShip;
using Ornament.MemberShip.Languages;
using Ornament.Web;

namespace Ornament.MVCWebFrame.Areas.MemberShips.Models
{
    public class CreateUserModel : RegistAccountModel
    {
        [Display(Name = "Phone", ResourceType = typeof (MembershipCommon))]
        public string Phone { get; set; }

        [Display(Name = "Name", ResourceType = typeof (MembershipCommon)),
         RegularExpression(".{1,30}", ErrorMessageResourceName = "RequireName",
             ErrorMessageResourceType = typeof (ErrorMessage))]
        public string Name { get; set; }

        [Display(Name = "Remark", ResourceType = typeof (MembershipCommon)),
         RegularExpression(".{0,200}", ErrorMessageResourceName = "RemarkOverMaxLength",
             ErrorMessageResourceType = typeof (ErrorMessage))]
        public string Remark { get; set; }

        public override bool Regist(IFormsAuthentication formsAuth, ModelStateDictionary modelState)
        {
            bool result = base.Regist(formsAuth, modelState);
            if (result)
            {
                User user = OrnamentContext.Current.MemberShipFactory().CreateUserDao().GetByLoginId(LoginId);
                user.Remark = Remark;
                user.Phone = Phone;
                user.Name = Name;
            }
            return result;
        }

        protected override void LoginByUser(IFormsAuthentication formsAuth, User user)
        {
            //Do not set user login now.
        }
    }
}