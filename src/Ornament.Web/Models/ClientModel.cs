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

        /// <summary>
        /// </summary>
        /// <returns></returns>
        public ClientResult GetStatus()
        {
            var result = new ClientResult();

            if (UtcOffset != null)
            {
                int t = OrnamentContext.CorrectClientUtcTime(UtcOffset.Value);
                OrnamentModule.SetClientOffsetHour(t);
            }
            else if (OrnamentModule.GetOffSetHour() != null)
            {
                result.ClientServerOffset = OrnamentModule.GetOffSetHour();
            }


            //refresh online.
            User user = OrnamentContext.MemberShip.CurrentUser();
            if (user != null)
            {
                IMessageDaoFactory daoFactory = OrnamentContext.DaoFactory.MessageDaoFactory;
             
                result.IsLogin = true;
            }
            else
            {
                result.IsLogin = false;
            }
            return result;
        }
    }

    public class ClientResult
    {
        /// <summary>
        ///     是否登录了
        /// </summary>
        public bool IsLogin { get; internal set; }


        /// <summary>
        ///     客户端和服务器端之间的时差。
        /// </summary>
        public int? ClientServerOffset { get; internal set; }
    }
}