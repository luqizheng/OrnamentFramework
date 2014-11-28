using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using Ornament.Messages.Notification;
using Qi;
using Qi.IO.Serialization;

namespace Ornament.Messages.Config
{
    /// <summary>
    /// Default is ~/messageVariables.xml or use appSetting Key="MessageVariables"
    /// </summary>
    public class NotifySenderManager
    {
        public static readonly NotifySenderManager Instance = new NotifySenderManager();
        public static string StoreFile;
        private readonly IDictionary<string, ISender> _senders;
        private Dictionary<string, string> _variables;

        private NotifySenderManager()
        {
            var path = ConfigurationManager.AppSettings["MessageVariables"] ?? ("~/messageVariables.xml");
            StoreFile = ApplicationHelper.MapPath(path);
            _senders = new Dictionary<string, ISender>();
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
                _senders.Add(item.Name, item);
            }
        }

        /// <summary>
        ///     获取发送器
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        public ISender[] GetSenders(params string[] senderNames)
        {
            return (from senderName in senderNames where _senders.ContainsKey(senderName) select _senders[senderName]).ToArray();
        }

        public void SaveVariable()
        {
            var result = new List<MessageVariable>();
            foreach (string key in _variables.Keys)
            {
                result.Add(new MessageVariable
                {
                    Name = key,
                    Value = _variables[key]
                });
            }

            string str = SerializationHelper.SerializerToXml(result);
            using (var writer = new StreamWriter(StoreFile))
            {
                writer.Write(str);
            }
        }

        public void ReloadVariables()
        {
            if (File.Exists(StoreFile))
            {
                var result = SerializationHelper.DeserializerXml<List<MessageVariable>>(StoreFile);

                _variables = new Dictionary<string, string>();
                lock (_variables)
                {
                    foreach (MessageVariable item in result)
                    {
                        if (!_variables.ContainsKey(item.Name))
                        {
                            _variables.Add(item.Name, item.Value);
                        }
                        else
                        {
                            _variables[item.Name] = item.Value;
                        }
                    }
                }
            }
        }

        public class MessageVariable
        {
            public string Name { get; set; }
            public string Value { get; set; }
        }
    }
}