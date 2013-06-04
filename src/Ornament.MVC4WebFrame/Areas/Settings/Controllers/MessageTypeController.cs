using System.Collections.Generic;
using System.Web.Mvc;
using Ornament.Messages;
using Ornament.Messages.Dao;
using Qi.Web.Mvc;

namespace Ornament.MVCWebFrame.Areas.Settings.Controllers
{
    [Session]
    public class MessageTypeController : Controller
    {
        private readonly IMessageDaoFactory _messageDao;

        public MessageTypeController(IMessageDaoFactory messageDao)
        {
            _messageDao = messageDao;
        }

        public ActionResult Index(string parentId)
        {
            IList<MessageType> msgType;
            if (parentId == null)
                msgType = _messageDao.MessageTypeDao.GetFirstLevel();
            else
            {
                var parent = _messageDao.MessageTypeDao.Get(parentId);
                msgType = _messageDao.MessageTypeDao.GetList(parent);
            }
            return View(msgType);
        }

        public ActionResult Edit(string id)
        {
            _messageDao.MessageDao.Get(id);
            return View();
        }
    }
}