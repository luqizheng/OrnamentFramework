using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Ornament.Messages.Dao;
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
            var data = _messageDaoFactory.NotifySenderDao.GetAll();
            return View(data);
        }

        public ActionResult Create()
        {
            return View("Edit");
        }
        public ActionResult Edit(int? id)
        {
            var result = _messageDaoFactory.NotifySenderDao.Get(id.Value);
            return View(result);
        }
    }
}