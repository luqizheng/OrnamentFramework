using System;
using Ornament.Messages.Config;
using Ornament.Messages.Notification.Contents;
using Qi.Domain;

namespace Ornament.Messages.Notification
{
    [Flags]
    public enum CommunicationType
    {
        None,
        Client = 1,
        Email = 2,
        Sms = 4
    }

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
        /// </summary>
        public virtual CommunicationType CommunicationType { get; set; }

        /// <summary>
        /// </summary>
        /// <param name="simpleMessage"></param>
        public virtual void Send(SimpleMessage simpleMessage)
        {
            foreach (ISender sender in NotifySenderManager.Instance.GetSenders(this))
            {
                sender.Send(simpleMessage);
            }
        }
    }
}