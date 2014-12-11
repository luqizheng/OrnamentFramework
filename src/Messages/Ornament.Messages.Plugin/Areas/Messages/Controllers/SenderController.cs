using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Ornament.Messages.Dao;
using Ornament.Messages.Notification.Senders;
using Ornament.Messages.Plugin.Areas.Messages.Models;
using Ornament.Web.MemberShips;

namespace Ornament.Messages.Plugin.Areas.Messages.Controllers
{
    [Authorize]
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
            IList<Sender> data = _messageDaoFactory.NotifySenderDao.GetAll();
            IEnumerable<SenderModel> result = from a in data select new SenderModel((a));
            return Json(result,JsonRequestBehavior.AllowGet);
        }

        public ActionResult Get(int? id)
        {
            Sender result = _messageDaoFactory.NotifySenderDao.Get(id.Value);
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