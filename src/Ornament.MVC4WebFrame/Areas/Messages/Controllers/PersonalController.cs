using System.Collections.Generic;
using System.Web.Mvc;
using Ornament.Messages;
using Ornament.Messages.Dao;
using Ornament.Messages.Newses;
using Ornament.Messages.PersonalMessages;
using Ornament.Web;

namespace Ornament.MVCWebFrame.Areas.Messages.Controllers
{
    [Authorize]
    [Authorize(Roles = "admin", Users = "admin")]
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

            NewsType type = _messageDaoFactory.NewsTypeDao.Get(typeId);


            IList<PersonalMessage> result =
                _messageDaoFactory.PersonalMessageDao.GetNewMessage(OrnamentContext.MemberShip.CurrentUser(),
                                                                    pagination.CurrentPage, pagination.PageSize);


            var r = new List<object>();
            foreach (PersonalMessage msg in result)
            {
                r.Add(new
                    {
                        msg.Content,
                        relative = msg.Publisher
                    });
            }
            return result;
        }

        [HttpGet,]
        public object Get(int? id)
        {
            return _messageDaoFactory.NotifyMessageDao.Get(id.Value);
        }
    }
}