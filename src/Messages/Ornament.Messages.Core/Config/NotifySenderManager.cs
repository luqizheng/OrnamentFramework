﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Ornament.Messages.Notification;
using Qi.IO.Serialization;

namespace Ornament.Messages.Config
{
    public class NotifySenderManager
    {
        public static readonly NotifySenderManager Instance = new NotifySenderManager();
        public static string StoreFile = "~/messageVariables.xml";
        private readonly IDictionary<CommunicationType, ISender> _senders;
        private Dictionary<string, string> _variables;

        static NotifySenderManager()
        {
        }

        private NotifySenderManager()
        {
            _senders = new Dictionary<CommunicationType, ISender>();
            ReloadVariables();
        }

        /// <summary>
        ///     固定变量列表,当遇到的相同的就会替换到
        /// </summary>
        public Dictionary<string, string> Variables
        {
            get { return _variables ?? (_variables = new Dictionary<string, string>()); }
        }

        /// <summary>
        ///     添加发送器
        /// </summary>
        /// <param name="senders"></param>
        public void Add(params ISender[] senders)
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

        public void SaveVariable()
        {
            string str = SerializationHelper.SerializerToXml(Variables);
            using (var writer = new StreamWriter(StoreFile))
            {
                writer.Write(str);
            }
        }

        public void ReloadVariables()
        {
            if (File.Exists(StoreFile))
            {
                _variables = SerializationHelper.DeserializerXml<Dictionary<string, string>>(StoreFile);
            }
        }
    }
}