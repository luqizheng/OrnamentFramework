using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Qi.Web.Mvc;
using log4net;

namespace Ornament.MVCWebFrame.Api.Core
{
    [Session, Authorize]
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
        public object VerifyEmail([FromBody]string loginId)
        {
            try
            {
                User user = _factory.CreateUserDao().GetByLoginId(loginId);
                user.IsApproved = false;
                MemberSecrityManager token = MemberSecrityManager.CreateEmailChangedToken(user,
                                                                                          OrnamentContext.Configuration
                                                                                                         .ApplicationSetting
                                                                                                         .VerifyEmailTimeout);
                token.SendToken();
                _factory.CreateUserDao().SaveOrUpdate(user);
                return new { success = true };
            }
            catch (Exception ex)
            {
                LogManager.GetLogger((GetType())).Error("Verify Email in UsersController fial", ex);
                return new { success = false, message = ex.Message };
            }
        }
        [HttpPost]
        public object VerifyEmail([FromBody]string loginId, [FromBody]string email)
        {
            try
            {
                User user = _factory.CreateUserDao().GetByLoginId(loginId);
                user.IsApproved = false;
                MemberSecrityManager token = MemberSecrityManager.CreateEmailChangedToken(user,
                                                                                          OrnamentContext.Configuration
                                                                                                         .ApplicationSetting
                                                                                                         .VerifyEmailTimeout);
                token.SendToken();
                _factory.CreateUserDao().SaveOrUpdate(user);
                return new { success = true };
            }
            catch (Exception ex)
            {
                LogManager.GetLogger((GetType())).Error("Verify Email in UsersController fial", ex);
                return new { success = false, message = ex.Message };
            }
        }
    }
}