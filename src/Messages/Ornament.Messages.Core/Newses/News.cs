using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Ornament.MemberShip;
using Qi.Domain;

namespace Ornament.Messages.Newses
{
    public class News : DomainObject<News, string>
    {
        private IDictionary<string, Content> _contents;

        public News()
        {
            CreateTime = DateTime.Now;
        }

        public virtual NewsType Type { get; set; }

        /// <summary>
        ///     Gets or sets the Message State.
        /// </summary>
        public virtual EditState State { get; set; }

        /// <summary>
        /// </summary>
        public virtual DateTime CreateTime { get; protected set; }

        /// <summary>
        ///     发布人
        /// </summary>
        public virtual User Publisher { get; protected set; }

        /// <summary>
        /// </summary>
        public virtual IDictionary<string, Content> Contents
        {
            get { return _contents ?? (_contents = new Dictionary<string, Content>()); }
        }

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