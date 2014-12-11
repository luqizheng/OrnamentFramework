using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Ornament.Messages.Dao;
using Ornament.Messages.Notification.Senders;
using Ornament.Messages.Plugin.Areas.Messages.Models;
using Ornament.Web.MemberShips;
using Ornament.Web.UI;

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

        public ActionResult Get(int? id)
        {
            Sender result = _messageDaoFactory.NotifySenderDao.Get(id.Value);
            return Json(new SenderModel(result));
        }

        [ValidateAjax, HttpPost]
        public ActionResult Save(SenderModel model)
        {
            if (ModelState.IsValid)
            {
                model.Save(_messageDaoFactory);
                var result = new
                {
                    success = true,
                    message = ""
                };

                return Json(result);
            }
            else
            {
                var result = new
                {
                    success = false,
                    message = "Failed to save Sender."
                };
                return Json(result);
            }
        }
    }
}