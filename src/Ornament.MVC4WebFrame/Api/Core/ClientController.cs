using System.Web.Http;
using Ornament.Web;
using Ornament.Web.HttpModel;

namespace Ornament.MVCWebFrame.Api.Core
{
    public class ClientController : ApiController
    {
        [HttpGet]
        public void CorrectTimeZone(int? utc)
        {
            if (utc != null)
            {
                int t = OrnamentContext.MemberShip.CorrectClientUtcTime(utc.Value);
                OrnamentModule.SetClientOffsetHour(t);
            }
        }
    }
}