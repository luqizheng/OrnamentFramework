using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;
using Ornament.MVCWebFrame.Controllers;
using Ornament.MVCWebFrame.Models;
using Ornament.MemberShip;
using Ornament.MemberShip.Languages;
using Ornament.Web;
using Ornament.Web.MemberShips;

namespace Ornament.MVCWebFrame.Areas.MemberShips.Models
{
    public class CreateUserModel : RegistAccountModel
    {
       

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