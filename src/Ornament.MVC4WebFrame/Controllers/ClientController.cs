using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using Ornament.Web;
using Ornament.Web.HttpModel;

namespace Ornament.MVCWebFrame.Controllers
{
    public class ClientController : ApiController
    {
         [System.Web.Http.HttpGet]
        public void CorrectTimeZone(int? utc)
        {
             if (utc != null)
             {
                 var t =
                     OrnamentContext.MemberShip.CorrectClientUtcTime(utc.Value);
                 OrnamentModule.SetClientOffsetHour(t);
             }

        }

    }
}
