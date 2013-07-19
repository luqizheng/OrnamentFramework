using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.Messages.Dao;
using Ornament.Messages.PersonalMessages;
using Ornament.Web;
using Qi.Web.Http;
using log4net;

namespace Ornament.MVCWebFrame.Api.Core
{
    [ApiSession]
    public class PersonalMessagesController : ApiController
    {
        private readonly IMessageDaoFactory _factory;
        private readonly IMemberShipFactory _memberShipFactory;

        public PersonalMessagesController(IMessageDaoFactory factory, IMemberShipFactory memberShipFactory)
        {
            _factory = factory;
            _memberShipFactory = memberShipFactory;
        }

        public IEnumerable<object> Get([FromUri] string userId, [FromUri] int? page)
        {
            IUserDao dao = _memberShipFactory.CreateUserDao();
            User publisherUser = OrnamentContext.MemberShip.CurrentUser();
            User receiverUser = dao.Get(userId);

            var result = from a in _factory.PersonalMessageDao.GetChat(publisherUser, receiverUser,
                                                                       page ?? 0, 20)
                         select new
                             {
                                 publisher = a.Publisher.Name,
                                 receiver = a.Receiver.Name,
                                 content = a.Content,
                                 createTime = a.CreateTime.ToString("yyyy-MM-dd HH:mm:ss")
                             };
            return result;
        }

        // GET api/default1/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/default1

        public bool Post([FromBody] SubmitContentData cc)
        {
            try
            {
                string content = cc.content;
                string userId = cc.userId;

                var pm = new PersonalMessage(OrnamentContext.MemberShip.CurrentUser())
                    {
                        Content = content,
                        Receiver = _memberShipFactory.CreateUserDao().Get(userId)
                    };
                _factory.PersonalMessageDao.SaveOrUpdate(pm);
                return true;
            }
            catch (Exception ex)
            {
                LogManager.GetLogger(GetType()).Error("send message error", ex);
                return false;
            }
        }

        // PUT api/default1/5
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/default1/5
        public void Delete(int id)
        {
        }

        public class SubmitContentData
        {
            public string content { get; set; }
            public string userId { get; set; }
        }
    }
}