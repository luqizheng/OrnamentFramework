using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.Messages.Config;
using Qi.Domain;

namespace Ornament.Messages.Notification
{
    public class NotifyMessageTemplate : DomainObject<NotifyMessageTemplate, string>
    {
        private IDictionary<string, Content> _contents;
        private IList<ISender> _senders;


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
        ///     Gets or sets Name of  message template.
        /// </summary>
        public virtual string Name { get; set; }

        /// <summary>
        ///     Gets or sets remark
        /// </summary>
        public virtual string Remark { get; set; }

        /// <summary>
        /// </summary>
        public IList<ISender> Senders
        {
            get { return _senders ?? (_senders = new List<ISender>()); }
        }

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
        public virtual Content GetContent(User user)
        {
            if (user == null) throw new ArgumentNullException("user");
            if (Contents.Count == 0)
                throw new ArgumentOutOfRangeException("Message do not have any content.");

            CultureInfo lang = user.GetLanguage();
            Content result = Get(lang);
            if (result != null)
                return result;
            return Contents.Values.First();
        }

        private Content Get(CultureInfo cultureInfo)
        {
            CultureInfo current = cultureInfo;
            do
            {
                if (Contents.ContainsKey(current.Name))
                    return Contents[current.Name];
                current = current.Parent;
            } while (current.Name != "");
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
            if (daoFactory == null)
                throw new ArgumentNullException("daoFactory");
            if (replaceVariabled == null)
                throw new ArgumentNullException("replaceVariabled");
            if (performers == null)
                throw new ArgumentNullException("performers");

            var targetuser = new HashSet<User>();
            foreach (IPerformer performer in performers)
            {
                foreach (User user in performer.GetUsers(daoFactory))
                    targetuser.Add(user);
            }


            foreach (User user in targetuser)
            {
                Dictionary<string, string> data = replaceVariabled(user);
                Publish(daoFactory, data, user);
            }
        }

        public virtual void Publish(IMemberShipFactory daoFactory, IDictionary<string, string> variable,
            User performers)
        {
            if (daoFactory == null)
            {
                throw new ArgumentNullException("daoFactory");
            }
            if (variable == null)
            {
                throw new ArgumentNullException("variable");
            }
            if (performers == null)
            {
                throw new ArgumentNullException("performers");
            }


            foreach (string key in NotifySenderManager.Instance.Variables.Keys)
            {
                if (!variable.ContainsKey(key))
                {
                    variable.Add(key, NotifySenderManager.Instance.Variables[key]);
                }
            }

            foreach (ISender sender in Senders)
            {
                sender.Send(this, daoFactory, variable, new IPerformer[] {performers});
            }
        }
    }
}