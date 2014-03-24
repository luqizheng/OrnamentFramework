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
    public enum NotifyTemplateOperator
    {
        None,
        Read = 1,
        Modify = 2 | Read,
        Delete = 4 | Modify,
    }

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
        ///     ”√template…˙≥…sinple message
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


            foreach (User u in targetuser)
            {
                var d = replaceVariabled;
                Publish(daoFactory, d, u);
            }
        }

        public virtual void Publish(IMemberShipFactory daoFactory, IDictionary<string, string> variable,
            User performers)
        {
            if (daoFactory == null) throw new ArgumentNullException("daoFactory");
            if (variable == null) throw new ArgumentNullException("variable");
            if (performers == null) throw new ArgumentNullException("performers");
            var helper = new NamedFormatterHelper();
            Content content = GetContent(performers);

            foreach (var key in Config.NotifySenderManager.Instance.Variables.Keys)
            {
                if (!variable.ContainsKey(key))
                {
                    variable.Add(key, Config.NotifySenderManager.Instance.Variables[key]);
                }
            }

            var simpleMessage = new SimpleMessage(performers)
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