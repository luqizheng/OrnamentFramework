using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Ornament.Messages.Dao;

namespace Ornament.MVCWebFrame.Controllers
{
    [Authorize]
    public class MessageController : Controller
    {
        private readonly IMessageDaoFactory _messageDaoFactory;

        public MessageController(IMessageDaoFactory messageDaoFactory)
        {
            _messageDaoFactory = messageDaoFactory;
        }

        //
        // GET: /Message/

        public ActionResult Index()
        {

            return View();
        }

    }
}
