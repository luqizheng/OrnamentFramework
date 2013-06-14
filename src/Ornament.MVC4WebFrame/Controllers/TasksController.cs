using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using Ornament.Messages;
using Ornament.Messages.Dao;
using Ornament.Web;

namespace Ornament.MVCWebFrame.Controllers
{
    public class TasksController : ApiController
    {
        private readonly IMessageDaoFactory _messageDaoFactory;

        public TasksController(IMessageDaoFactory messageDaoFactory)
        {
            _messageDaoFactory = messageDaoFactory;
        }

        //
        // GET: /Tasks/
        public IEnumerable<object> MyTask(Pagination pagination, string language)
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
                    CreateTime = msg.CreateTime,
                    PublishTime = msg.PublishTime
                });
            }
            return result;
        }

    }
}
