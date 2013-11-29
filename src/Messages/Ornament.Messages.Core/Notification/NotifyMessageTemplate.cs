using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Qi.Domain;
using Qi.Text;

namespace Ornament.Messages.Notification
{
    public class NotifyMessageTemplate : DomainObject<NotifyMessageTemplate, string>
    {
        private IDictionary<string, Content> _contents;


        /// <summary>
        ///     jsut for Nhibernate.
        /// </summary>
        /// <exception cref="ArgumentNullException">type or publisher are null</exception>
        protected NotifyMessageTemplate()
        {
        }

        public NotifyMessageTemplate(NotifyType notifyType)
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
        ///     如果是内置message，那么Name是不允许修改的
        /// </summary>
        public virtual bool Inside { get; set; }

        /// <summary>
        ///     Gets or sets Name of  message template.
        /// </summary>
        public virtual string Name { get; set; }

        /// <summary>
        ///     Gets or sets remark
        /// </summary>
        public virtual string Remark { get; set; }

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
                throw new ArgumentOutOfRangeException("Message do not have any content.");

            string lang = user.Language;
            if (String.IsNullOrEmpty(lang))
            {
                lang = Thread.CurrentThread.CurrentUICulture.EnglishName;
            }
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

        /// <summary>
        /// 用template生成sinple message
        /// </summary>
        /// <param name="daoFactory"></param>
        /// <param name="replaceVariabled"></param>
        /// <param name="performers"></param>
        public virtual void Publish(
            IMemberShipFactory daoFactory,
            CreateVariablesHandler replaceVariabled,
            params IPerformer[] performers)
        {
            var targetuser = new HashSet<User>();
            foreach (IPerformer performer in performers)
            {
                foreach (User user in performer.GetUsers(daoFactory))
                    targetuser.Add(user);
            }

            var helper = new NamedFormatterHelper();
            foreach (User u in targetuser)
            {
                Content content = GetContent(u);
                Dictionary<string, string> variable = replaceVariabled(u);

                var simpleMessage = new SimpleMessage(u)
                    {
                        Content = new Content
                            {
                                Language = content.Language,
                                Subject = helper.Replace(content.Subject, variable),
                                Value = helper.Replace(content.Value, variable)
                            }
                    };
                Type.Send(simpleMessage);
            }
        }
    }
}