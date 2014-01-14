using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;
using Ornament.Messages.Dao;
using Ornament.Messages.Notification;
using Ornament.Messages.Plugin.Areas.Messages.Models.Messages;
using Ornament.Web;
using Ornament.Web.MemberShips;
using Qi.Web.Mvc;

namespace Ornament.Messages.Plugin.Areas.Messages.Controllers
{
    [Session]
    public class TemplateController : Controller
    {
        private readonly IMessageDaoFactory _daoFactory;

        public TemplateController(IMessageDaoFactory daoFactory)
        {
            _daoFactory = daoFactory;
        }

        //
        // GET: /Messages/Template/
        [OrnamentMvcSiteMapNode(Title = "$resources:message.sitemap,templateTitle", ParentKey = "Messages",
            Key = "templates")]
        public ActionResult Index()
        {
            var pagination = new Pagination();
            ViewData["Nav"] = pagination;
            int total;
            IList<NotifyMessageTemplate> result = _daoFactory.MessageTemplateDao.GetAll(pagination.CurrentPage,
                pagination.PageSize, out total);
            pagination.TotalRows = total;
            return View(result);
        }

        [HttpPost]
        public ActionResult Index(Pagination pagination)
        {
            ViewData["Nav"] = pagination;
            int total;
            IList<NotifyMessageTemplate> result = _daoFactory.MessageTemplateDao.GetAll(pagination.CurrentPage,
                pagination.PageSize, out total);
            pagination.TotalRows = total;
            return View(result);
        }

        //
        // GET: /Messages/Template/Create
        [OrnamentMvcSiteMapNode(Title = "$resources:message.sitemap,templateCreateTitle", 
            ParentKey = "templates")]
        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /Messages/Template/Create

        [HttpPost, ValidateAntiForgeryToken, ValidateInput(false)]
        public ActionResult Create(MessageTemplateModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    model.Save(_daoFactory.MessageTemplateDao);
                    return RedirectToAction("Index");
                }
                return View(model);
            }
            catch
            {
                return View(model);
            }
        }

        //
        // GET: /Messages/Template/Edit/5
          [OrnamentMvcSiteMapNode(Title = "$resources:message.sitemap,templateEditTitle",
            ParentKey = "templates")]
        public ActionResult Edit(string id)
        {
            if (id == null)
                throw new HttpException(404, "Template message not found.");
            NotifyMessageTemplate model = _daoFactory.MessageTemplateDao.Get(id);
            return View(new MessageTemplateModel(model));
        }

        //
        // POST: /Messages/Template/Edit/5

        [HttpPost, ValidateAntiForgeryToken, ValidateInput(false)]
        public ActionResult Edit(MessageTemplateModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    model.Save(_daoFactory.MessageTemplateDao);
                    return RedirectToAction("Index");
                }
                return View(model);
            }
            catch
            {
                return View(model);
            }
        }

        //
        // GET: /Messages/Template/Delete/5

        public ActionResult Delete(string id)
        {
            IMessageTemplateDao dao = _daoFactory.MessageTemplateDao;
            dao.Delete(dao.Get(id));
            return Json(new {success = true}, JsonRequestBehavior.AllowGet);
        }
    }
}