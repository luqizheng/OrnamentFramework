using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Ornament.Messages.Config;
using Ornament.Messages.Dao;
using Ornament.Messages.Notification;
using Ornament.Messages.Plugin.Areas.Messages.Models;
using Ornament.Messages.Plugin.Areas.Messages.Models.Messages;
using Ornament.Models;
using Ornament.Web.MemberShips;
using Ornament.Web.UI;
using Qi.Web.Mvc;

namespace Ornament.Messages.Plugin.Areas.Messages.Controllers
{
    [Session, Authorize]
    public class TemplateController : Controller
    {
        private readonly IMessageDaoFactory _daoFactory;

        public TemplateController(IMessageDaoFactory daoFactory)
        {
            _daoFactory = daoFactory;
        }

        //
        // GET: /Messages/Template/
        [OrnamentMvcSiteMapNode(Title = "$resources:message.sitemap,templateTitle",
            ParentKey = "Messages",
            Key = "templates")]
        [ResourceAuthorize(NotifyTemplateOperator.Read, "NotifyType")]
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult List(int? page, int? size)
        {
            int total;
            int pageSize = size ?? 40;
            int pageIndex = page ?? 0;
            IList<NotifyMessageTemplate> result = _daoFactory.MessageTemplateDao.GetAll(pageIndex,
                pageSize, out total);
            var array = from temp in result
                        select new
                        {
                            temp.Id,
                            temp.Name,
                            temp.Remark
                        };
            return Json(new
            {
                total,
                data = array
            }, JsonRequestBehavior.AllowGet);
        }


        //
        // GET: /Messages/Template/Create
        [OrnamentMvcSiteMapNode(Title = "$resources:message.sitemap,templateCreateTitle",
            ParentKey = "templates")]
        public ActionResult Create()
        {
            ViewBag.Senders = _daoFactory.NotifySenderDao.GetAll();
            return View("Edit", new MessageTemplateModel());
        }


        //
        // GET: /Messages/Template/Edit/5
        [OrnamentMvcSiteMapNode(Title = "$resources:message.sitemap,templateEditTitle",
            ParentKey = "templates")]
        public ActionResult Edit(string id)
        {
            if (id == null)
                throw new HttpException(404, "Template message not found.");
            ViewBag.Senders = _daoFactory.NotifySenderDao.GetAll();
            NotifyMessageTemplate model = _daoFactory.MessageTemplateDao.Get(id);
            return View(new MessageTemplateModel(model));
        }

        //
        // POST: /Messages/Template/Edit/5

        [HttpPost, ValidateAntiForgeryToken, ValidateInput(false), ValidateAjax]
        public ActionResult Save(MessageTemplateModel model)
        {
            if (ModelState.IsValid)
            {
                model.Save(_daoFactory.MessageTemplateDao);
                if (Request.IsAjaxRequest())
                {
                    return Json(new { success = true });
                }
                return RedirectToAction("Index", model);
            }
            if (Request.IsAjaxRequest())
            {
                return Json(new { success = false, message = "Fail to save." });
            }
            return View("Edit", model);
        }

        public ActionResult Publish(string id)
        {
            NotifyMessageTemplate template = _daoFactory.MessageTemplateDao.Get(id);
            var item = new PublisherTemplate(template);
            ViewData["temp"] = template;
            return View(item);
        }
        [HttpPost]
        public ActionResult Publish(PublisherTemplate template)
        {
            var result = new
            {
                success = true,
                message = "Save success",
            };

            return Json(result);
        }
        /// <summary>
        ///     获取生成的内容
        /// </summary>
        /// <param name="template"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult GetContent(PublisherTemplate template)
        {
            NotifyMessageTemplate temp = _daoFactory.MessageTemplateDao.Get(template.Id);
            var list = new ArrayList();


            foreach (string key in temp.Contents.Keys)
            {
                IDictionary<string, string> local = template.Variables[key];
                NotifySenderManager.Instance.MergnGloablVariable(local);
                list.Add(new
                {
                    Subject = temp.Contents[key].GetSubject(local),
                    Value = temp.Contents[key].GetContent(local),
                    Language = key,

                });
            }
            return Json(list);
        }

        public ActionResult Get(string id)
        {
            return Json(_daoFactory.MessageTemplateDao.Get(id), JsonRequestBehavior.AllowGet);
        }

        //
        // GET: /Messages/Template/Delete/5

        public ActionResult Delete(string id)
        {
            IMessageTemplateDao dao = _daoFactory.MessageTemplateDao;
            dao.Delete(dao.Get(id));
            return Json(new { success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult IsNotDuplicateName(string name, string id)
        {
            int count = _daoFactory.MessageTemplateDao.Count(name, id);
            return Json(count == 0, JsonRequestBehavior.AllowGet);
        }
    }
}