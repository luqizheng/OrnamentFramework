using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Ornament.Messages.Dao;
using Ornament.Web;

namespace Ornament.MVCWebFrame.Controllers
{
    [Authorize]
    public class PersonalMessageController : Controller
    {
        private readonly IMessageDaoFactory _messageDaoFactory;

        public PersonalMessageController(IMessageDaoFactory messageDaoFactory)
        {
            _messageDaoFactory = messageDaoFactory;
        }

        //
        // GET: /Message/

        public ActionResult Index()
        {
            var searcher =
                new PersonalSearcher(OrnamentContext.Current.CurrentUser, OrnamentContext.Current.NotificationMessageType());
            ViewData["notify"] = _messageDaoFactory.MessageDao.ReadStateMessage(searcher);

            return View();
        }

    }
}
