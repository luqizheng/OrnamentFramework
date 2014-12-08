using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
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
        public virtual IList<ISender> Senders
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

        /// <summary>
        /// </summary>
        /// <param name="cultureInfo"></param>
        /// <returns></returns>
        public virtual Content Get(CultureInfo cultureInfo)
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

        public virtual void Send(IMemberShipDaoFactory memberShipDaoFactory,
            IDictionary<string, string> variable, params User[] performers)
        {
            foreach (var sender in this.Senders)
            {
                sender.Send(memberShipDaoFactory, this, variable, performers);
            }
        }
        public virtual void Send(IMemberShipDaoFactory memberShipDaoFactory, CreateVariablesHandler dynamicCreateVariablesHandler, User[] user, IPerformer[] performers)
        {
            foreach (var sender in this.Senders)
            {
                sender.Send(memberShipDaoFactory, this, dynamicCreateVariablesHandler, user, performers);
            }
        }
    }
}