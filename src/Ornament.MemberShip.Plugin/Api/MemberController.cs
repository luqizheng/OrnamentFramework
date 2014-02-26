using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using FluentNHibernate;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Plugin.Models.Memberships.Partials;

namespace Ornament.MemberShip.Plugin.Api
{
    public class MemberController : ApiController
    {
        private readonly IMemberShipFactory _memberShipFactory;

        public MemberController(IMemberShipFactory memberShipFactory)
        {
            _memberShipFactory = memberShipFactory;
        }

        [HttpPut]
        public bool Save(BasicInfo basicInfo)
        {
            return true;
        }
    }
}
