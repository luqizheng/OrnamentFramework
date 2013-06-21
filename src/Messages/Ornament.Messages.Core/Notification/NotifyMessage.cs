using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Iesi.Collections.Generic;
using Ornament.MemberShip;
using Qi.Domain;

namespace Ornament.Messages.Notification
{
    public class NotifyMessage : DomainObject<NotifyMessage, string>
    {
        private IDictionary<string, Content> _contents;
        private Iesi.Collections.Generic.ISet<Reader> _readers;


        /// <summary>
        /// </summary>
        /// <param name="publisher"></param>
        /// <param name="type"></param>
        /// <exception cref="ArgumentNullException">type or publisher are null</exception>
        public NotifyMessage(User publisher)
            : this()
        {
            Publisher = publisher;
            if (publisher == null)
                throw new ArgumentNullException("publisher");
        }

        protected NotifyMessage()
        {
            CreateTime = DateTime.Now;
            State = EditState.Draft;
        }

        public virtual User Publisher { get; set; }

        /// <summary>
        ///     Gets or sets the Message State.
        /// </summary>
        public virtual EditState State { get; set; }


        /// <summary>
        /// </summary>
        public virtual DateTime CreateTime { get; protected set; }


        /// <summary>
        /// </summary>
        public virtual IDictionary<string, Content> Contents
        {
            get { return _contents ?? (_contents = new Dictionary<string, Content>()); }
        }

        /// <summary>
        ///     Gets the the MessageReader.
        /// </summary>
        public virtual Iesi.Collections.Generic.ISet<Reader> Readers
        {
            get { return _readers ?? (_readers = new HashedSet<Reader>()); }
        }

        public NotifyType Type { get; set; }


        /// <summary>
        /// </summary>
        /// <param name="language"></param>
        /// <returns></returns>
        public virtual Content Show(string language)
        {
            if (!Contents.ContainsKey(language))
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
            if (Contents.Count == 0)
                throw new ArgumentOutOfRangeException("Message do not have any content");
            string lang = CultureInfo.CurrentUICulture.Name;
            if (Contents.ContainsKey(lang))
                return Show(lang);
            if (lang.IndexOf("-", StringComparison.Ordinal) != -1)
            {
                lang = lang.Substring(2);
                if (Contents.ContainsKey(lang))
                    return Show(lang);
            }
            return Contents.Values.First();
        }
    }
}