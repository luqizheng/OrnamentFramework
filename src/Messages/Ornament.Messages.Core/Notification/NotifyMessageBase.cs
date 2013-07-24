using System;
using System.Globalization;
using Ornament.MemberShip;
using Qi.Domain;

namespace Ornament.Messages.Notification
{
    /// <summary>
    /// 所有通知信息的基类。每个用户对着条信息的读取状态均记录在这里
    /// </summary>
    public abstract class NotifyMessageBase : DomainObject<NotifyMessageBase, string>
    {
        protected NotifyMessageBase() { }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="user"></param>
        protected NotifyMessageBase(User user)
        {
            this.User = user;
            this.CreateTime = DateTime.Now;
            this.ReadStatus = ReadStatus.UnRead;
        }
        /// <summary>
        /// 
        /// </summary>
        public virtual User User { get; protected set; }
        /// <summary>
        /// 
        /// </summary>
        public virtual ReadStatus ReadStatus { get; set; }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="language"></param>
        /// <returns></returns>
        public abstract Content Show(string language);
        /// <summary>
        /// Gets message create time;
        /// </summary>
        public virtual DateTime CreateTime { get; protected set; }
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public virtual Content Show()
        {
            string lang = CultureInfo.CurrentUICulture.Name;
            return Show(lang);
        }
    }
}