using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Ornament.MemberShip;
using Qi.Domain;

namespace Ornament.Messages.Notification
{
    public abstract class MessageHeaderBase<T> : DomainObject<T, string> where T : DomainObject<T, string>
    {
        private IDictionary<string, Content> _contents;


        /// <summary>
        /// </summary>
        /// <exception cref="ArgumentNullException">type or publisher are null</exception>
        protected MessageHeaderBase()
        {
        }

        protected MessageHeaderBase(NotifyType notifyType)
        {
            if (notifyType == null)
                throw new ArgumentNullException("notifyType");
            Type = notifyType;
            ModifyTime = DateTime.Now;
        }

        /// <summary>
        ///     Gets Notify Message DateTime
        /// </summary>
        public virtual DateTime ModifyTime { get; protected set; }

        /// <summary>
        /// </summary>
        public virtual IDictionary<string, Content> Contents
        {
            get { return _contents ?? (_contents = new Dictionary<string, Content>()); }
        }

        /// <summary>
        /// </summary>
        public virtual NotifyType Type { get; set; }

        /// <summary>
        /// </summary>
        /// <param name="language"></param>
        /// <returns></returns>
        protected virtual Content GetContent(string language)
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
        protected virtual Content GetContent(User user)
        {
            if (Contents.Count == 0)
                throw new ArgumentOutOfRangeException("Message do not have any content");

            string lang = user.Language;
            Content result = Get(lang);
            if (result == null)
            {
                lang = CultureInfo.CurrentUICulture.Name;
                result = Get(lang);
            }
            if (result != null)
                return result;
            return Contents.Values.First();
        }

        private Content Get(string lang)
        {
            if (Contents.ContainsKey(lang))
                return GetContent(lang);
            if (lang.IndexOf("-", StringComparison.Ordinal) != -1)
            {
                lang = lang.Substring(2);
                if (Contents.ContainsKey(lang))
                    return GetContent(lang);
            }
            return null;
        }
    }
}