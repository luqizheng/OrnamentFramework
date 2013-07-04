using System.Web.Http;
using Ornament.Web;

namespace Ornament.MVCWebFrame.Api.Core
{
    public class OnlineController : ApiController
    {
        [HttpGet]
        public void RefreshOnline()
        {
            //jsut refresh last time.
            if (OrnamentContext.MemberShip.CurrentUser() == null)
                return;
        }
    }
}