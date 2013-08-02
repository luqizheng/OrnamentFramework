using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Ornament.MemberShip;
using Ornament.Messages;
using Ornament.Messages.Dao;
using Ornament.Messages.Notification;
using Ornament.Web;
using Qi.Web.Http;

namespace Ornament.MVCWebFrame.Api.Core
{
    [ApiSession]
    public class NotifyMessagesController : ApiController
    {
        private readonly IMessageDaoFactory _messageDaoFactory;

        public NotifyMessagesController(IMessageDaoFactory messageDaoFactory)
        {
            _messageDaoFactory = messageDaoFactory;
        }

        [Authorize]
        public object Get(ReadStatus? readStatus)
        {
            User user = OrnamentContext.MemberShip.CurrentUser();
            int total;
            IList<NotifyMessageBase> msgs = _messageDaoFactory.NotifyMessageDao.GetNotifyMessages(user, readStatus, 40,
                                                                                                  0, out total);
            var result = new
                {
                    total,
                    data = from message in msgs
                           select new
                               {
                                   content = message.Show(),
                                   createTime = message.CreateTime,
                               }
                };
            return result;
        }

        // GET api/default1/5
        public int Count()
        {
            var result= _messageDaoFactory.NotifyMessageDao.CountNotifyMsg(OrnamentContext.MemberShip.CurrentUser(),
                                                                      ReadStatus.UnRead);
            return result;
        }

        // POST api/default1
        public void Post([FromBody] string value)
        {
        }

        // PUT api/default1/5
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/default1/5
        public void Delete(int id)
        {
        }
    }
}