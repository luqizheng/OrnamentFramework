using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Ornament.Messages.Dao;
using Ornament.Messages.Plugin.Areas.Messages.Models;
using Ornament.Web.MemberShips;

namespace Ornament.Messages.Plugin.Areas.Messages.Controllers
{
    public class SenderController : Controller
    {
        private readonly IMessageDaoFactory _messageDaoFactory;

        public SenderController(IMessageDaoFactory messageDaoFactory)
        {
            _messageDaoFactory = messageDaoFactory;
        }

        //
        // GET: /Messages/Sender/
        [OrnamentMvcSiteMapNode(Title = "$resources:message.sitemap,templateSenderTitle",
            ParentKey = "Messages",
            Key = "Senders")]
        public ActionResult Index()
        {
           
            return View();
        }

        public ActionResult List()
        {
            var data = _messageDaoFactory.NotifySenderDao.GetAll();
            var result = from a in data select new SenderModel((a));
            return Json(result);
        }
    
        public ActionResult Get(int? id)
        {
            var result = _messageDaoFactory.NotifySenderDao.Get(id.Value);
            return Json(new SenderModel(result));
        }

        public ActionResult Save(SenderModel model)
        {
            var result = new
            {
                success = true
            };

            return Json(result);
        }
    }
}