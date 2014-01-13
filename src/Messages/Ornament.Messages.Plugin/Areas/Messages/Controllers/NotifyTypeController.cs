using System.Collections.Generic;
using System.Web.Mvc;
using Ornament.Messages.Dao;
using Ornament.Messages.Notification;
using Ornament.Messages.Plugin.Areas.Messages.Models.Messages;
using Ornament.Web.MemberShips;
using Qi.Web.Mvc;

namespace Ornament.Messages.Plugin.Areas.Messages.Controllers
{
    [Session]
    [Authorize(Roles = "admin", Users = "admin")]
    public class NotifyTypeController : Controller
    {
        private readonly INotifyTypeDao _notifyTypeDao;

        /// <summary>
        /// </summary>
        /// <param name="messageDao"></param>
        public NotifyTypeController(IMessageDaoFactory messageDao)
        {
            _notifyTypeDao = messageDao.NotifyTypeDao;
        }


        [OrnamentMvcSiteMapNode(Title = "$resources:message.sitmap,notifyTypeTitle", ParentKey = "Messages",
            Key = "nodifyType")]
        public ActionResult Index(string parentId)
        {
            IList<NotifyType> msgType = _notifyTypeDao.GetAll();

            return View(msgType);
        }

        [OrnamentMvcSiteMapNode(Title = "$resources:message.sitmap,notifyTypeEditTitle", ParentKey = "nodifyType")]
        public ActionResult Edit(string id)
        {
            var result = new NotifyTypeModel(_notifyTypeDao.Get(id));
            return View("Edit", result);
        }

        /// <summary>
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        [HttpPost, Session(true, Transaction = true), ValidateAntiForgeryToken]
        [ValidateInput(false)]
        public ActionResult Save(NotifyTypeModel type)
        {
            if (ModelState.IsValid)
            {
                type.Save(_notifyTypeDao);
                return RedirectToAction("Index");
            }
            return View("Edit", type);
        }

        [OrnamentMvcSiteMapNode(Title = "$resources:message.sitmap,notifyTypeCreateTitle", ParentKey = "nodifyType")]
        public ActionResult Create()
        {
            return View("Edit");
        }


        public ActionResult Delete(string id)
        {
            INotifyTypeDao dao = _notifyTypeDao;
            dao.Delete(dao.Get(id));
            return Json(new {success = true}, JsonRequestBehavior.AllowGet);
        }
    }
}