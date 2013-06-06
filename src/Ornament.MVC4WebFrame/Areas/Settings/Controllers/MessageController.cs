using System.Collections.Generic;
using System.Web.Mvc;
using Ornament.Messages;
using Ornament.Messages.Dao;
using Qi.Web.Mvc;

namespace Ornament.MVCWebFrame.Areas.Settings.Controllers
{
    [Session]
    public class MessageController : Controller
    {
        private readonly IMessageDaoFactory _messageDao;

        public MessageController(IMessageDaoFactory messageDao)
        {
            _messageDao = messageDao;
        }

        public ActionResult Index(MessageSearcher searcher)
        {
            if (searcher != null)
                searcher = new MessageSearcher();
            IList<Message> result = _messageDao.MessageDao.Find(searcher);
            return View(result);
        }

        public ActionResult Create()
        {
            IList<MessageType> types = _messageDao.MessageTypeDao.GetAll();
            ViewData["types"] = types;
            return View();
        }

        [HttpPost, Session(true, Transaction = true), ValidateInput(false)]
        public ActionResult Save(Message message, IDictionary<string, string> contents)
        {
            return RedirectToAction("Index");
        }
    }
}