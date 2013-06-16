using System.Collections.Generic;
using System.Web.Mvc;
using Ornament.Messages;
using Ornament.Messages.Dao;
using Ornament.Messages.PersonalMessages;
using Ornament.Web;

namespace Ornament.MVCWebFrame.Areas.Messages.Controllers
{
    [Authorize]
    public class PersonalController : Controller
    {
        private readonly IMessageDaoFactory _messageDaoFactory;

        public PersonalController(IMessageDaoFactory messageDaoFactory)
        {
            _messageDaoFactory = messageDaoFactory;
        }

        //
        // GET: /Tasks/
        public IEnumerable<object> GetNewMessages(Pagination pagination, string language,
            string typeId, ReadStatus? readStates)
        {
            if (pagination == null)
            {
                pagination = new Pagination(10, 0);
            }

            var type = _messageDaoFactory.NewsTypeDao.Get(typeId);


            var result =
                _messageDaoFactory.PersonalMessageDao.GetNewMessage(OrnamentContext.MemberShip.CurrentUser(),
                                                                    pagination.CurrentPage, pagination.PageSize);


            var r = new List<object>();
            foreach (PersonalMessage msg in result)
            {
                r.Add(new
                    {
                        Content = msg.Content,
                        relative = msg.Publisher

                    });
            }
            return result;
        }
        [HttpGet,]
        public object Get(string id)
        {
            return _messageDaoFactory.NotifyMessageDao.Get(id);
        }

    }
}