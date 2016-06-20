using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ClassicWebApplication.Api
{
    public class UserController : DefaultController
    {
        [HttpGet]
        public string Console()
        {
            return "ok";

        }
    }
}
