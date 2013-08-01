using System.Web.Mvc;
using Ornament.Messages.Dao;
using Ornament.Web;

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

        public ActionResult Index()
        {

            ViewData["notify"] =
                _messageDaoFactory.PersonalMessageDao.GetLastMessageForEachUser(OrnamentContext.MemberShip.CurrentUser(), 0, 40);

            
            ViewData["annoumcement"] = _messageDaoFactory.AnnouncementDao.GetByUser(OrnamentContext.MemberShip.CurrentUser(), 0, 20);

            return View();
        }


    }
}