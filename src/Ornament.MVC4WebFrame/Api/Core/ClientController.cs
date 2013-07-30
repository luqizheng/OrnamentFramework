using System.Web.Http;
using Ornament.Web.HttpModel;
using Ornament.Web.Models;

namespace Ornament.MVCWebFrame.Api.Core
{
    public class ClientController : ApiController
    {
        [HttpGet]
        public void CorrectTimeZone(int? utc)
        {
            if (utc != null)
            {
                int t = OrnamentContext.CorrectClientUtcTime(utc.Value);
                OrnamentModule.SetClientOffsetHour(t);
            }
        }
        [HttpPost]
        public ClientResult Post([FromBody] ClientModel model)
        {
            return (model ?? new ClientModel()).GetStatus();
        }


    }
}