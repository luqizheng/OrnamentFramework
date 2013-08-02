using System.Web.Mvc;
using Ornament.Messages;
using Ornament.Messages.Dao;
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
            ViewBag.Notify=
                _messageDaoFactory.PersonalMessageDao.GetLastMessageForEachUser(OrnamentContext.MemberShip.CurrentUser(), 0, 40);


            ViewBag.Announcements = _messageDaoFactory.AnnouncementDao.GetByUser(OrnamentContext.MemberShip.CurrentUser(), 0, 20);

            return View();
        }

        [Session]
        public ActionResult MakeRead(string id)
        {
            var a = _messageDaoFactory.NotifyMessageDao.Get(id);
            a.ReadStatus = ReadStatus.Read;
            return Json(true);
        }

    }
}