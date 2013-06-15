using System.Collections.Generic;
using System.Web.Mvc;
using Ornament.Messages;
using Ornament.Messages.Dao;
using Ornament.Messages.Newses;
using Ornament.Models.Messages;
using Ornament.Web.MemberShips;
using Qi.Web.Mvc;

namespace Ornament.MVCWebFrame.Areas.Messages.Controllers
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
            IList<NewsType>
                msgType = _messageDao.MessageTypeDao.GetAll();

            return View(msgType);
        }

        public ActionResult Edit(string id)
        {
            var result = new MessageTypeModel(_messageDao.MessageTypeDao.Get(id));
            return View(result);
        }

        [HttpPost, Session(true, Transaction = true)]
        public ActionResult Edit(MessageTypeModel type)
        {
            if (ModelState.IsValid)
            {
                type.Save(_messageDao);
                return RedirectToAction("Index");
            }
            return View(type);
        }

        public ActionResult Create(string parentId)
        {
            var result = new MessageTypeModel();
            if (parentId != null)
            {
                NewsType parent = _messageDao.MessageTypeDao.Get(parentId);
                result.Parent = parent;
            }
            result.Name = "new message type";

            return View(result);
        }

        [HttpPost, Session(true, Transaction = true)]
        public ActionResult Create(MessageTypeModel type)
        {
            if (ModelState.IsValid)
            {
                type.Save(_messageDao);
                return RedirectToAction("Index");
            }
            return View(type);
        }

        [HttpPost, ResourceAuthorize(MessageOperator.Delete, "Message")]
        public ActionResult Delete(string id)
        {
            return Json("Delete success.");
        }
    }
}