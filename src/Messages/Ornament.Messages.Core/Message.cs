using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Iesi.Collections.Generic;
using Ornament.MemberShip;
using Ornament.Messages.Contents;
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
        /// </summary>
        /// <param name="publisher"></param>
        /// <param name="type"></param>
        public Message(User publisher, MessageType type)
            : this()
        {
            if (publisher == null)
                throw new ArgumentNullException("publisher");

            if (type == null)
                throw new ArgumentNullException("type");

            Publisher = publisher;
            Type = type;
        }

        protected Message()
        {

            CreateTime = DateTime.Now;
            EffectTime = null;
            State = MessageState.Draft;
        }




        /// <summary>
        /// </summary>
        public virtual Priority Priority { set; get; }


        /// <summary>
        ///     Gets or sets the Message State.
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
        ///     Gets or sets the type
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
        /// </summary>
        public virtual DateTime CreateTime { get; protected set; }

        /// <summary>
        ///     发布人
        /// </summary>
        public virtual User Publisher { get; protected set; }

        /// <summary>
        ///     获取或设定信息发生时间
        /// </summary>
        public virtual DateTime? EffectTime { get; set; }

        /// <summary>
        /// </summary>
        public virtual DateTime? PublishTime { get; set; }

        /// <summary>
        /// </summary>
        public virtual IDictionary<string, Content> Contents
        {
            get { return _contents ?? (_contents = new Dictionary<string, Content>()); }
        }

        /// <summary>
        ///     Gets the the MessageReader.
        /// </summary>
        public virtual Iesi.Collections.Generic.ISet<MessageReader> Readers
        {
            get { return _readers ?? (_readers = new HashedSet<MessageReader>()); }
        }

        /// <summary>
        /// </summary>
        /// <param name="addReaders"></param>
        public virtual void AddReaders(params IPerformer[] addReaders)
        {
            if (addReaders == null || addReaders.Length == 0)
                throw new ArgumentException("could not set reader to null or emtpy", "addReaders");
            foreach (IPerformer member in addReaders)
            {
                var infReader = new MessageReader(member) { Message = this };
                Readers.Add(infReader);
            }
        }

        /// <summary>
        /// </summary>
        /// <param name="language"></param>
        /// <returns></returns>
        public virtual Content Show(string language)
        {
            if (!this.Contents.ContainsKey(language))
                throw new ArgumentOutOfRangeException("language", "can't find language(" + language + ") defined.");
            Content content = Contents[language];
            return content;
        }

        /// <summary>
        /// </summary>
        /// <para name="manager"></para>
        /// <returns></returns>
        public virtual Content Show()
        {
            if (this.Contents.Count == 0)
                throw new ArgumentOutOfRangeException("Message do not have any content");
            string lang = CultureInfo.CurrentUICulture.Name;
            if (Contents.ContainsKey(lang))
                return Show(lang);
            if (lang.IndexOf("-", System.StringComparison.Ordinal) != -1)
            {
                lang = lang.Substring(2);
                if (Contents.ContainsKey(lang))
                    return Show(lang);
            }
            return this.Contents.Values.First();
        }

    }
}