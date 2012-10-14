using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Iesi.Collections.Generic;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.Messages.Contents;
using Ornament.Messages.Stores;
using Qi.Domain;

namespace Ornament.Messages
{
    public class Message : DomainObject<Message, string>
    {
        private IDictionary<string, Content> _contents;
        private Iesi.Collections.Generic.ISet<MessageReader> _readers;
        private MessageState _state;
        private MessageType _type;


        /// <summary>
        /// 
        /// </summary>
        /// <param name="publisher"></param>
        /// <param name="type"></param>
        /// <param name="store"></param>
        public Message(User publisher, MessageType type, Store store)
            : this()
        {
            if (publisher == null)
                throw new ArgumentNullException("publisher");

            if (type == null)
                throw new ArgumentNullException("type");

            Publisher = publisher;
            Type = type;

            StoreType = store.Name;
        }

        protected Message()
        {
            Version = 0;
            CreateTime = DateTime.Now;
            EffectTime = null;
            State = MessageState.Draft;
        }

        public virtual string StoreType { get; set; }

        private int Version { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public virtual Priority Priority { set; get; }


        /// <summary>
        /// ����
        /// </summary>
        public virtual string Subject { get; set; }

        /// <summary>
        /// Gets or sets the Message State.
        /// </summary>
        public virtual MessageState State
        {
            get { return _state; }
            set
            {
                if (_state == MessageState.Published)
                {
                    if (Readers.Count == 0)
                    {
                        throw new ApplicationException("Please set the Message's reader");
                    }

                    PublishTime = DateTime.Now;
                }
                _state = value;
            }
        }

        /// <summary>
        /// Gets or sets the type
        /// </summary>
        public virtual MessageType Type
        {
            get { return _type; }
            set
            {
                if (value == null)
                    throw new ArgumentNullException("value", "Type can't be null");
                _type = value;
            }
        }


        /// <summary>
        /// ��ȡ����Info��ʱ��
        /// </summary>
        public virtual DateTime CreateTime { get; protected set; }

        /// <summary>
        /// ������
        /// </summary>
        public virtual User Publisher { get; protected set; }

        /// <summary>
        /// ��ȡ���趨��Ϣ����ʱ��
        /// </summary>
        public virtual DateTime? EffectTime { get; set; }

        /// <summary>
        /// ��ȡ���趨����ʱ��
        /// </summary>
        public virtual DateTime? PublishTime { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public virtual IDictionary<string, Content> Contents
        {
            get { return _contents ?? (_contents = new Dictionary<string, Content>()); }
        }

        /// <summary>
        /// Gets the the MessageReader.
        /// </summary>
        public virtual Iesi.Collections.Generic.ISet<MessageReader> Readers
        {
            get { return _readers ?? (_readers = new HashedSet<MessageReader>()); }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="addReaders"></param>
        public virtual void AddReaders(params IPerformer[] addReaders)
        {
            if (addReaders == null || addReaders.Length == 0)
                throw new ArgumentException("could not set reader to null or emtpy", "addReaders");
            foreach (IPerformer member in addReaders)
            {
                var infReader = new MessageReader(member) {Message = this};
                Readers.Add(infReader);
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="language"></param>
        /// <param name="manager"> </param>
        /// <returns></returns>
        public virtual string Show(string language, StoreManager manager)
        {
            Content content = Contents[language];
            if (content.Value == null)
            {
                manager.Get(StoreType).ReadIn(content, this);
            }
            return content.Value;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="key"></param>
        /// <param name="manager"> </param>
        /// <para name="manager"></para>
        /// <returns></returns>
        public virtual string Show(StoreManager manager)
        {
            string lang = CultureInfo.CurrentUICulture.Name;
            return Show(Contents.ContainsKey(lang) ? lang : Contents.Values.First().Language??"", manager);
        }

        public override int GetHashCode()
        {
            return Version.GetHashCode();
        }
    }
}