using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.Messages;
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

        /// <summary>
        ///     获取当前loginUser和relativeUser之间的PM内容
        /// </summary>
        /// <param name="relativeUserId"></param>
        /// <param name="lastTime"></param>
        /// <param name="page"></param>
        /// <returns></returns>
        public IEnumerable<object> Get([FromUri] string relativeUserId, [FromUri] DateTime? lastTime,
                                       [FromUri] int? page)
        {
            IUserDao dao = _memberShipFactory.CreateUserDao();
            User currentUser = OrnamentContext.MemberShip.CurrentUser();
            User receiverUser = dao.Get(relativeUserId);
            var msgDao = _factory.PersonalMessageDao;
            var result = new List<object>();
            foreach (var a in msgDao.GetChat(currentUser, receiverUser, lastTime,
                                                                   page ?? 0, 20))
            {
                a.ReadStatus = ReadStatus.Read;
                msgDao.SaveOrUpdate(a);
                result.Add(new
                {
                    publisher = a.Publisher.Name,
                    receiver = a.Receiver.Name,
                    content = a.Content,
                    createTime = a.CreateTime.ToString("yyyy-MM-dd HH:mm:ss")
                });
            }

            return result;
        }

        // GET api/default1/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/default1

        public object Post([FromBody] SubmitContentData cc)
        {
            try
            {
                string content = cc.content;
                string userId = cc.userId;

                var a = new PersonalMessage(OrnamentContext.MemberShip.CurrentUser())
                    {
                        Content = content,
                        Receiver = _memberShipFactory.CreateUserDao().Get(userId)
                    };
                _factory.PersonalMessageDao.SaveOrUpdate(a);
                return new
                    {
                        success = true
                    };

            }
            catch (Exception ex)
            {
                LogManager.GetLogger(GetType()).Error("send message error", ex);
                throw;
            }
        }

        public class SubmitContentData
        {
            public string content { get; set; }
            public string userId { get; set; }

        }
    }
}