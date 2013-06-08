using System.Collections.Generic;
using System.Web.Mvc;
using Ornament.Messages;
using Ornament.Messages.Contents;
using Ornament.Messages.Dao;
using Qi.Web.Mvc;

namespace Ornament.MVCWebFrame.Areas.Messages.Controllers
{
    [Session]
    public class MessageController : Controller
    {
        private readonly IMessageDaoFactory _daoFactory;
        private readonly IMessageDao _messageDao;

        public MessageController(IMessageDaoFactory daoFactory)
        {
            _daoFactory = daoFactory;
            _messageDao = daoFactory.MessageDao;
        }

        public ActionResult Index(MessageSearcher searcher)
        {
            var result = _messageDao.FindMessage(40, 0, null, false);
            return View(result);
        }

        public ActionResult Edit(string id)
        {
            var message = _messageDao.Get(id);
            IList<MessageType> types = _daoFactory.MessageTypeDao.GetAll();
            ViewData["types"] = types;

            foreach (var a in message.Contents.Keys)
            {
                var c = message.Contents[a];
            }
            return View("Edit", message);
        }


        public ActionResult Create()
        {
            IList<MessageType> types = _daoFactory.MessageTypeDao.GetAll();
            ViewData["types"] = types;
            return View("Edit");
        }

        [HttpPost, Session(true, Transaction = true), ValidateInput(false)]
        public ActionResult Save(Message message, IDictionary<string, string> newContents, IDictionary<string, string> newSubjects)
        {
            message.Contents.Clear();
            foreach (var key in newContents.Keys)
            {
                message.Contents.Add(key, new Content()
                    {
                        Language = key,
                        Value = newContents[key],
                        Subject = newSubjects[key]
                    });
            }
            _daoFactory.MessageDao.SaveOrUpdate(message);
            return RedirectToAction("Index");
        }
    }
}