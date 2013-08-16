﻿using System.Web.Http;
using Ornament.Web.Models;

namespace Ornament.MVCWebFrame.Api.Core
{
    public class ClientController : ApiController
    {
        [HttpPost]
        public ClientResult Post([FromBody] ClientModel model)
        {
            return (model ?? new ClientModel()).GetStatus();
        }
    }
}