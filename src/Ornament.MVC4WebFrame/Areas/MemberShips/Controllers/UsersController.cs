using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.ModelBinding;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using System;

namespace Ornament.MVCWebFrame.Areas.MemberShips.Controllers
{
    [Qi.Web.Mvc.Session]
    public class UsersController : ApiController
    {
        private readonly IMemberShipFactory _factory;

        public UsersController(IMemberShipFactory factory)
        {
            _factory = factory;
        }

        // GET api/usersapi
        [HttpGet]
        public IEnumerable<object> Match(string name,
                                         string email, string loginId, string phone, int? pageIndex, int? pageSize)
        {
            if (pageIndex == null)
                pageIndex = 0;
            if (pageSize == 0)
                pageSize = 10;
            IList<User> result = _factory.CreateUserDao()
                                         .QuickSearch(name, loginId, email, phone, pageSize.Value, pageIndex.Value);

            var c = from user in result
                    select new
                        {
                            id = user.Id,
                            user.Name,
                            user.Email,
                            user.LoginId
                        };
            return c;
        }
        [HttpPost]
        public object VerifyEmail([FromBody] string loginId)
        {
            try
            {
                var user = _factory.CreateUserDao().GetByLoginId(loginId);
                user.IsApproved = false;
                var token = MemberSecrityManager.CreateEmailChangedToken(user,
                                                                         OrnamentContext.Configuration
                                                                                        .ApplicationSetting
                                                                                        .VerifyEmailTimeout);
                token.SendToken();
                _factory.CreateUserDao().SaveOrUpdate(user);
                return new { success = true };
            }
            catch (Exception ex)
            {
                log4net.LogManager.GetLogger((this.GetType())).Error("Verify Email in UsersController fial", ex);
                return new { success = false, message = ex.Message };
            }
        }
    }
}