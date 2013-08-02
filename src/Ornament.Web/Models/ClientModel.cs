using Ornament.MemberShip;
using Ornament.Messages;
using Ornament.Messages.Dao;
using Ornament.Web.HttpModel;

namespace Ornament.Web.Models
{
    public class ClientModel
    {
        /// <summary>
        ///     有客户端提交上来和Utc之间的时间差
        /// </summary>
        public int? UtcOffset { get; set; }

        ///
        public ClientResult GetStatus()
        {
            if (UtcOffset != null)
            {
                int t = OrnamentContext.CorrectClientUtcTime(UtcOffset.Value);
                OrnamentModule.SetClientOffsetHour(t);
            }
            //refresh online.
            User user = OrnamentContext.MemberShip.CurrentUser();
            IMessageDaoFactory daoFactory = OrnamentContext.DaoFactory.MessageDaoFactory;
            int cout = daoFactory.SimpleMessageDao.CountNotifyMsg(user, ReadStatus.UnRead) +
                       daoFactory.PersonalMessageDao.CountNewMessage(user);
            return new ClientResult
                {
                    HasMessage = cout != 0
                };
        }
    }

    public class ClientResult
    {
        public bool HasMessage { get; set; }
        public int? TimeZone { get; set; }
    }
}