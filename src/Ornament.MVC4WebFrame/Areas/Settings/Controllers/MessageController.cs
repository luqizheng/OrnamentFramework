using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.UI.WebControls;
using Ornament.Messages.Dao;

namespace Ornament.MVCWebFrame.Areas.Settings.Controllers
{
    public class MessageController : Controller
    {
        private readonly IMessageDaoFactory _messageDao;

        public MessageController(IMessageDaoFactory messageDao)
        {
            _messageDao = messageDao;
        }

        public ActionResult Index()
        {
            return View();
        }
    }
}
