﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Web.Http;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Plugin.Models.Security;
using Ornament.Models.Memberships;
using Ornament.Web.MemberShips;
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
