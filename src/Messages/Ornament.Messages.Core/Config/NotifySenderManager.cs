using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using Ornament.Messages.Notification.Senders;
using Qi;
using Qi.IO.Serialization;

namespace Ornament.Messages.Config
{
    /// <summary>
    ///     Default is ~/messageVariables.xml or use appSetting Key="MessageVariables"
    /// </summary>
    public class NotifySenderManager
    {
        public static readonly NotifySenderManager Instance = new NotifySenderManager();
        public static string StoreFile;
        private readonly IDictionary<string, Type> _senders;
        private Dictionary<string, string> _variables;


        private NotifySenderManager()
        {
            string path = ConfigurationManager.AppSettings["MessageVariables"] ?? ("~/messageVariables.xml");
            StoreFile = ApplicationHelper.MapPath(path);
            _senders = new Dictionary<string, Type>();
            ReloadVariables();

            _senders = new Dictionary<string, Type>
            {
                {"Email", typeof (EmailSender)},
                {"Client", typeof (ClientSender)}
            };
        }

        /// <summary>
        ///     固定变量列表,当遇到的相同的就会替换到
        /// </summary>
        public IDictionary<string, string> Variables
        {
            get { return _variables ?? (_variables = new Dictionary<string, string>()); }
        }

        public IDictionary<string, Type> SenderTypes
        {
            get { return _senders; }
        }

        /// <summary>
        ///     localVariable和GloablVariable进行合并，localVariable优先
        /// </summary>
        /// <param name="localVariables"></param>
        /// <returns>localVariables</returns>
        public IDictionary<string,string> MergnGloablVariable(IDictionary<string, string> localVariables)
        {
            foreach (string key in Variables.Keys)
            {
                if (!localVariables.ContainsKey(key))
                {
                    localVariables.Add(key, Variables[key]);
                }
            }
            return localVariables;
        }

        /// <summary>
        ///     添加发送器
        /// </summary>
        public void Add(string name, Type senderType)
        {
            if (senderType == null) throw new ArgumentNullException("senderType");


            _senders.Add(name, senderType);
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