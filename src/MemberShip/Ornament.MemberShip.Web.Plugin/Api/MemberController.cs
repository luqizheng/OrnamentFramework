using System.Web.Http;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Plugin.Models.Memberships;
using Ornament.MemberShip.Plugin.Models.Memberships.Partials;
using Ornament.MemberShip.Plugin.Models.Security;
using Ornament.MemberShip.Web.Plugin.Models.Memberships;
using Qi.Web.Http;

namespace Ornament.MemberShip.Plugin.Api
{
    /// <summary>
    ///     處理會員自身信息
    /// </summary>
    [ApiSession]
    public class MemberController : ApiController
    {
        private readonly IMemberShipFactory _memberShipFactory;

        public MemberController(IMemberShipFactory memberShipFactory)
        {
            _memberShipFactory = memberShipFactory;
        }

        [HttpPost]
        public bool ChangePassword([FromBody] ChangePasswordModel password)
        {
            return password.ChangePassword(OrnamentContext.MemberShip.CurrentUser(), _memberShipFactory.CreateUserDao());
        }

        [HttpGet]
        public BasicInfo Get()
        {
            User user = OrnamentContext.MemberShip.CurrentUser();
            return new BasicInfo(user);
        }

        [HttpPost]
        public object Save(BasicInfo basicInfo)
        {
            bool success = true;
            if (ModelState.IsValid)
            {
                User user = OrnamentContext.MemberShip.CurrentUser();
                basicInfo.UpdateOn(user);
                _memberShipFactory.CreateUserDao().SaveOrUpdate(user);
                OrnamentContext.MemberShip.SwitchLanguage(user.GetLanguage());
            }
            else
            {
                success = false;
            }
            return new
            {
                success,
                messages = ModelState.Values
            };
        }

        [HttpGet]
        public object VerifyEmail()
        {
            var model = new VerifyEmailModel();
            model.Id = OrnamentContext.MemberShip.CurrentUser().Id;
            model.Send(_memberShipFactory);
            return true;
        }
    }
}