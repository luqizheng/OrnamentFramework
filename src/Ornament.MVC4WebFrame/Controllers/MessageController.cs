using System.Web.Mvc;
using Ornament.Messages.Dao;
using Ornament.Web;

namespace Ornament.MVCWebFrame.Controllers
{
    [Authorize]
    public class MessageController : Controller
    {
        private readonly IMessageDaoFactory _messageDaoFactory;

        public MessageController(IMessageDaoFactory messageDaoFactory)
        {
            _messageDaoFactory = messageDaoFactory;
        }

        //
        // GET: /Message/

        public ActionResult Index()
        {
            ViewData["notify"] = _messageDaoFactory.PersonalMessageDao.GetNewMessage(OrnamentContext.MemberShip.CurrentUser(), 0, 40);
            return View();
        }
    }
}