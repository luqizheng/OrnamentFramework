using System.Collections.Generic;
using System.Web.Mvc;
using Ornament.Messages;
using Ornament.Web;
using Qi.Web.Mvc;

namespace Ornament.MVCWebFrame.Areas.Application.Controllers
{
    public class EventLogController : Controller
    {
        //
        // GET: /Application/EventLog/
        [Session]
        public ActionResult Index(string id)
        {
            //MessageType type;
            //type = id == null
            //           ? OrnamentContext.Current.GetMessageManager().SystemMessageType
            //           : OrnamentContext.Current.GetMessageManager().InfoDaoFactory.MessageTypeDao.Get(id);
            //IList<Message> res = OrnamentContext.Current.MessageFactory().MessageDao.FindMessage(50, 0, type, true, out TODO);
            //ViewData["currentInfo"] = type;
            return View();
        }
    }
}