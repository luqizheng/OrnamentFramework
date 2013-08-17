using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Ornament.MVCWebFrame.Models;
using Ornament.MemberShip.Dao;
using Ornament.Messages;
using Ornament.Messages.Dao;
using Ornament.Messages.Notification;
using Ornament.Web;

namespace Ornament.MVCWebFrame.Controllers
{
    public class TaskController : Controller
    {
        private readonly IMemberShipFactory _memberShipFactory;
        private readonly IMessageDaoFactory _messageDaoFactory;

        public TaskController(IMemberShipFactory memberShipFactory, IMessageDaoFactory messageDaoFactory)
        {
            _memberShipFactory = memberShipFactory;
            _messageDaoFactory = messageDaoFactory;
        }

        //
        // GET: /Task/

        public ActionResult Index()
        {
            return View();
        }

        public IEnumerable<object>  MyTask(Pagination pagination, string language)
        {
            //if (pagination == null)
            //{
            //    pagination = new Pagination(10, 0);
            //}
            //int totalPage;
            //IList<NotifyMessage> result = _messageDaoFactory.MessageDao.GetNewNotifyMessages(pagination.CurrentPage,
            //                                                                  pagination.PageSize,out totalPage);

            //var r = new List<object>();
            //foreach (var msg in result)
            //{
            //    var content = msg.Show(language);
            //    r.Add(new
            //        {
            //            Subject = content.Subject,
            //            Content = content.Value,
            //            CreateTime=msg.CreateTime
            //        });
            //}
            return null;
        }
    }
}