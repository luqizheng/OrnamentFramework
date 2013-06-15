using System.Collections.Generic;
using System.Web.Mvc;
using Ornament.Messages;
using Ornament.Messages.Dao;
using Ornament.Web;

namespace Ornament.MVCWebFrame.Areas.Messages.Controllers
{
    [Authorize]
    public class MessagesController : Controller
    {
        private readonly IMessageDaoFactory _messageDaoFactory;

        public MessagesController(IMessageDaoFactory messageDaoFactory)
        {
            _messageDaoFactory = messageDaoFactory;
        }

        //
        // GET: /Tasks/
        public IEnumerable<object> Index(Pagination pagination, string language,
            string typeId, ReadStatus? readStates)
        {
            if (pagination == null)
            {
                pagination = new Pagination(10, 0);
            }

            var type = _messageDaoFactory.MessageTypeDao.Get(typeId);

            var searcher = new PersonalSearcher(OrnamentContext.Current.CurrentUser(), type)
                {
                    PageIndex = pagination.CurrentPage,
                    PageSize = pagination.PageSize,
                    ReadStatus = readStates ?? ReadStatus.UnRead
                };
            IList<Message> result = _messageDaoFactory.MessageDao.ReadStateMessage(searcher);


            var r = new List<object>();
            foreach (Message msg in result)
            {
                Content content = msg.Show(language);
                r.Add(new
                    {
                        content.Subject,
                        Content = content.Value,
                        msg.CreateTime,
                      
                    });
            }
            return result;
        }
        [HttpGet,]
        public object Get(string id)
        {
            return _messageDaoFactory.MessageDao.Get(id);
        }

    }
}