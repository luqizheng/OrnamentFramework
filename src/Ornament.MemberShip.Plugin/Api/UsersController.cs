﻿using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.UI.WebControls;
using Iesi.Collections;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Plugin.Models.Memberships;
using Ornament.MemberShip.Plugin.Models.Security;
using Qi.Web.Mvc;

namespace Ornament.MemberShip.Plugin.Api
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
        public IEnumerable<object> Match([FromUri] string name,
            [FromUri] string email,
            [FromUri] string loginId, [FromUri] string phone)
        {
            IList<User> result = _factory.CreateUserDao()
                .QuickSearch(name, loginId, email, phone, 0, 15);

            return from user in result
                   select new
                   {
                       id = user.Id,
                       name = user.Name,
                       email = user.Contact.Email,
                       loginId = user.LoginId
                   };

        }

        [HttpGet]
        public object GetUser(string loginId)
        {
            var result = _factory.CreateUserDao().GetByLoginId(loginId);
            return new
            {
                result.LoginId,
                result.Contact.Email,
                result.Contact.Phone,
                result.Id
            };
        }

        [HttpPut]
        public bool ChangePassword([FromBody] ChangePasswordModel password)
        {
            return password.ChangePassword(OrnamentContext.MemberShip.CurrentUser(), _factory.CreateUserDao());

        }
        [HttpPost]
        public object VerifyEmail([FromBody] VerifyEmailModel model)
        {
            if (model.Veirfy(_factory))
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



    }
}
