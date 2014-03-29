using System.Web.Http;
using Ornament.Web.Models;
using Qi.Web.Http;

namespace Ornament.MVCWebFrame.Api.Core
{
    public class ClientController : ApiController
    {
        [HttpPost, ApiSession]
        public ClientResult Post([FromBody] ClientModel model)
        {
            return (model ?? new ClientModel()).GetStatus();
        }
    }
}