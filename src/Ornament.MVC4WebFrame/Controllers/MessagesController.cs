using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Ornament.MemberShip.Dao;
using Ornament.Messages.Dao;

namespace Ornament.MVCWebFrame.Controllers
{
    [Authorize]
    public class MessagesController : ApiController
    {
        private readonly IMemberShipFactory _membershipFactory;
        private readonly IMessageDaoFactory _factory;

        public MessagesController(IMemberShipFactory membershipFactory,IMessageDaoFactory factory)
        {
            _membershipFactory = membershipFactory;
            _factory = factory;
        }
    }
}
