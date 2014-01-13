using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Ornament.MemberShip;
using Ornament.Messages.Dao;
using Ornament.Messages.Notification;
using Qi.Web.Http;

namespace Ornament.Messages.Plugin.Areas.Messages.Controllers
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
            IList<SimpleMessage> msgs = _messageDaoFactory.SimpleMessageDao.GetNotifyMessages(user, readStatus, 40,
                0, out total);
            var result = new
            {
                total,
                data = from message in msgs
                    select new
                    {
                        content = message.Content,
                        createTime = message.CreateTime,
                    }
            };
            return result;
        }

        // GET api/default1/5
        public int Count()
        {
            int result = _messageDaoFactory.SimpleMessageDao.CountNotifyMsg(OrnamentContext.MemberShip.CurrentUser(),
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