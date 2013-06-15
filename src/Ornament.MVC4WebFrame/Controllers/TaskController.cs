using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Ornament.MemberShip.Dao;
using Ornament.Messages;
using Ornament.Messages.Dao;
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
            if (pagination == null)
            {
                pagination = new Pagination(10, 0);
            }
            int totalPage;
            IList<Message> result = _messageDaoFactory.MessageDao.FindMessage(pagination.CurrentPage,
                                                                              pagination.PageSize,
                                                                              OrnamentContext.Current.TaskMessageType(),
                                                                              false, out totalPage);

            var r = new List<object>();
            foreach (var msg in result)
            {
                var content = msg.Show(language);
                r.Add(new
                    {
                        Subject = content.Subject,
                        Content = content.Value,
                        CreateTime=msg.CreateTime
                    });
            }
            return result;
        }
    }
}