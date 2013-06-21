using System.Collections.Generic;
using System.Web.Mvc;
using Ornament.Messages.Dao;
using Ornament.Messages.Notification;
using Ornament.Models.Messages;
using Qi.Web.Mvc;

namespace Ornament.MVCWebFrame.Areas.Messages.Controllers
{
    public class NotifyTypeController : Controller
    {
        private readonly IMessageDaoFactory _messageDao;

        public NotifyTypeController(IMessageDaoFactory messageDao)
        {
            _messageDao = messageDao;
        }

        public ActionResult Index(string parentId)
        {
            IList<NotifyType> msgType = _messageDao.NotifyTypeDao.GetAll();

            return View(msgType);
        }

        public ActionResult Edit(string id)
        {
            var result = new NewsTypeModel(_messageDao.NewsTypeDao.Get(id));
            return View(result);
        }

        [HttpPost, Session(true, Transaction = true)]
        public ActionResult Edit(NewsTypeModel type)
        {
            if (ModelState.IsValid)
            {
                type.Save(_messageDao);
                return RedirectToAction("Index");
            }
            return View(type);
        }

        public ActionResult Create()
        {
            var result = new NewsTypeModel {Name = "new message type"};

            return View(result);
        }

        [HttpPost, Session(true, Transaction = true)]
        public ActionResult Create(NewsTypeModel type)
        {
            if (ModelState.IsValid)
            {
                type.Save(_messageDao);
                return RedirectToAction("Index");
            }
            return View(type);
        }

        [HttpPost]
        public ActionResult Delete(string id)
        {
            INewsTypeDao dao = _messageDao.NewsTypeDao;
            dao.Delete(dao.Get(id));
            return Json(new {success = true});
        }
    }
}