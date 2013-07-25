using System;
using System.Collections.Generic;
using System.Linq;
using Ornament.Messages.Notification;

namespace Ornament.Messages.Config
{
    public class NotifySenderManager
    {
        public static readonly NotifySenderManager Instance = new NotifySenderManager();
        private readonly IDictionary<CommunicationType, ISender> _senders;

        private NotifySenderManager()
        {
            _senders = new Dictionary<CommunicationType, ISender>();
        }

        /// <summary>
        ///     添加发送器
        /// </summary>
        /// <param name="senders"></param>
        public void Add(IEnumerable<ISender> senders)
        {
            if (senders == null) throw new ArgumentNullException("senders");

            foreach (ISender item in senders)
            {
                _senders.Add(item.CommunicationType, item);
            }
        }

        /// <summary>
        ///     获取发送器
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        public ISender[] GetSenders(NotifyType type)
        {
            return (from a in _senders.Keys where type.CommunicationType.HasFlag(a) select _senders[a]).ToArray();
        }
    }
}