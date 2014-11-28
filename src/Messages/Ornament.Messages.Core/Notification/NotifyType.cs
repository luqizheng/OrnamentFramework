using System;
using Ornament.Messages.Config;
using Qi.Domain;

namespace Ornament.Messages.Notification
{
  
    /// <summary>
    /// </summary>
    public class NotifyType : DomainObject<NotifyType, string>
    {
        /// <summary>
        /// </summary>
        public virtual string Name { get; set; }

        /// <summary>
        /// </summary>
        public virtual string Remark { get; set; }

        /// <summary>
        ///     Multi for notify
        /// </summary>
        public virtual string[] SenderNames { get; set; }


        public ISender[] Senders
        {
            get { return NotifySenderManager.Instance.GetSenders(SenderNames); }
        }
    }
}