using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Plugin.Areas.MemberShips.Models;
using Ornament.MemberShip.Plugin.Models;
using Ornament.MemberShip.Plugin.Models.Memberships.Partials;
using Ornament.MemberShip.Plugin.Models.Security;
using Ornament.MemberShip.Web.Plugin.Properties;
using Ornament.Web.MemberShips;
using Qi.Web.Http;

namespace Ornament.MemberShip.Web.Plugin.Api
{
    [ApiSession, Authorize]
    public class UsersController : ApiController
    {
        private readonly IMemberShipFactory _factory;

        public UsersController(IMemberShipFactory factory)
        {
            _factory = factory;
        }

        // GET api/usersapi
        [HttpGet]
        public IEnumerable<object> Match([FromUri] UserSearch search)
        {
            if (OrnamentContext.MemberShip.HasRight("User", UserOperator.Read))
            {
                search = search ?? new UserSearch();
                int total;
                IList<User> result = _factory.CreateUserDao()
                    .Search(search, 0, 15, out total);

                return from user in result
                    select new
                    {
                        id = user.Id,
                        name = user.Name,
                        email = user.Contact.Email,
                        loginId = user.LoginId
                    };
            }
            return new object[]
            {
                new
                {
                    id = Resources.alertMsg_PermissionNotPermintAccessUsers,
                    name = Resources.alertMsg_PermissionNotPermintAccessUsers,
                    email = Resources.alertMsg_PermissionNotPermintAccessUsers,
                    loginId = Resources.alertMsg_PermissionNotPermintAccessUsers
                }
            };
        }

        /// <summary>
        ///     获取Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public object GetUser(string id)
        {
            User result = _factory.CreateUserDao().Get(id);
            return new BasicInfo(result);
        }


        [HttpPost]
        public object VerifyEmail([FromBody] VerifyEmailModel model)
        {
            if (model.Send(_factory))
            {
                return new
                {
                    success = true,
                };
            }
            return new
            {
                success = false,
            };
        }


        [HttpPost]
        [ApiResourceAuthorize(UserOperator.Deny, ResourceSetting.User)]
        public object Deny([FromBody] DenyUser data)
        {
            return data.Execute(_factory);
        }


        [HttpPost]
        [ApiResourceAuthorize(UserOperator.Lock, ResourceSetting.User)]
        public object Lock(LockoutUser lockUser)
        {
            return lockUser.Execute(_factory);
        }
    }

    public class LockoutUser
    {
        public string[] Ids { get; set; }
        public bool Lockout { get; set; }

        public object Execute(IMemberShipFactory factory)
        {
            IUserDao dao = factory.CreateUserDao();

            for (int i = 0; i < Ids.Length; i++)
            {
                string id = Ids[i];
                User user = dao.Get(id);
                if (!Lockout)
                {
                    user.Security.Unlock();
                }
                else
                {
                    user.Security.Lockout();
                }
            }

            return new {success = true};
        }
    }

    public class DenyUser
    {
        public string[] Ids { get; set; }
        public bool IsDeny { get; set; }

        public object Execute(IMemberShipFactory factory)
        {
            IUserDao dao = factory.CreateUserDao();

            for (int i = 0; i < Ids.Length; i++)
            {
                string id = Ids[i];
                User user = dao.Load(id);
                user.IsDeny = IsDeny;
                dao.SaveOrUpdate(user);
            }

            return new {success = true};
        }
    }
}