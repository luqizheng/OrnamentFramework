using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Ornament.Messages.Dao;
using Ornament.Messages.Notification.Senders;
using Ornament.Messages.Plugin.Areas.Messages.Models;
using Ornament.Web.MemberShips;
using Ornament.Web.UI;
using Qi.Web.Mvc;

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
            return Json(result, JsonRequestBehavior.AllowGet);
        }
       
        public ActionResult GetSender(int? id)
        {
            Sender result = _messageDaoFactory.NotifySenderDao.Get(id.Value);
            return Json(new SenderModel(result), JsonRequestBehavior.AllowGet);
        }

        [ValidateAjax, HttpPost, Session(Transaction = true)]
        public ActionResult Save(SenderModel model)
        {
            Sender sender;
            if (ModelState.IsValid)
            {
                sender=model.Save(_messageDaoFactory);
                var result = new
                {
                    success = true,
                    message = "",
                    Id = sender.Id
                };

                return Json(result);
            }
            else
            {
                var result = new
                {
                    success = false,
                    message = "Failed to save Sender.",
                };
                return Json(result);
            }
        }
    }
}