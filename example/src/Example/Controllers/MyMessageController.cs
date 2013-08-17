using System.Web;
using System.Web.Mvc;
using Ornament.Messages;
using Ornament.Messages.Dao;
using Ornament.Messages.PersonalMessages;
using Ornament.Web;
using Qi.Web.Mvc;

namespace Ornament.MVCWebFrame.Controllers
{
    [Authorize]
    public class MyMessageController : Controller
    {
        private readonly IMessageDaoFactory _messageDaoFactory;

        public MyMessageController(IMessageDaoFactory messageDaoFactory)
        {
            _messageDaoFactory = messageDaoFactory;
        }


        //
        // GET: /Message/
        [Session]
        public ActionResult Index()
        {
            ViewData["PM"] =
                _messageDaoFactory.PersonalMessageDao.GetLastMessageForEachUser(OrnamentContext.MemberShip.CurrentUser(), 0, 40);


            int total;
            ViewData["SimpleMessage"] =
                _messageDaoFactory.SimpleMessageDao.GetNotifyMessages(OrnamentContext.MemberShip.CurrentUser(),
                                                                      ReadStatus.UnRead, 30, 0, out total);
            return View();
        }

        [Session]
        public ActionResult MakeRead(int? id)
        {
            if (id == null)
                throw new HttpException(404, "Can't find any message.");
            var a = _messageDaoFactory.PersonalMessageDao.Get(id.Value);
            a.HasRead(OrnamentContext.MemberShip.CurrentUser(), _messageDaoFactory.PersonalMessageDao);
            return Json(true, JsonRequestBehavior.AllowGet);
        }

    }
}