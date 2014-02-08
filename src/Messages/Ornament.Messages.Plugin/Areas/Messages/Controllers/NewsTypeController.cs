using System.Collections.Generic;
using System.Web.Mvc;
using Ornament.Messages.Dao;
using Ornament.Messages.Newses;
using Ornament.Messages.Plugin.Areas.Messages.Models.Messages;
using Ornament.Web.MemberShips;
using Qi.Web.Mvc;

namespace Ornament.Messages.Plugin.Areas.Messages.Controllers
{
    [Session]
    [Authorize(Roles = "admin", Users = "admin")]
    public class NewsTypeController : Controller
    {
        private readonly IMessageDaoFactory _messageDao;

        public NewsTypeController(IMessageDaoFactory messageDao)
        {
            _messageDao = messageDao;
        }
        [Session]
        [OrnamentMvcSiteMapNode(Title = "$resources:message.sitemap,newsTypeIndexTitle", Key = "newsTypeList",
          ParentKey = "news")]
        public ActionResult Index()
        {
            IList<NewsType>
                msgType = _messageDao.NewsTypeDao.GetAll();

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


        public ActionResult Delete(string id)
        {
            INewsTypeDao dao = _messageDao.NewsTypeDao;
            dao.Delete(dao.Get(id));
            return Json(new {success = true}, JsonRequestBehavior.AllowGet);
        }
    }
}