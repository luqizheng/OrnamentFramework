using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.UI.WebControls;
using Ornament.Messages.Dao;
using Qi.Web.Mvc;

namespace Ornament.MVCWebFrame.Areas.Settings.Controllers
{
    [Session]
    public class MessageController : Controller
    {
        private readonly IMessageDaoFactory _messageDao;

        public MessageController(IMessageDaoFactory messageDao)
        {
            _messageDao = messageDao;
        }

        public ActionResult Index(MessageSearcher searcher)
        {
            if (searcher != null)
                searcher = new MessageSearcher();
            var result = _messageDao.MessageDao.Find(searcher);
            return View(result);
        }

        public ActionResult Create()
        {
            var types = _messageDao.MessageTypeDao.GetAll();
            ViewData["types"] = types;
            return View();
        }
    }
}
