using System.Collections.Generic;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.Messages.Config;
using Ornament.Messages.Dao;
using Ornament.Messages.Notification;
using Qi.Text;

namespace Ornament.Messages.Plugin.Areas.Messages.Models
{
    public class PublisherTemplate
    {
        public PublisherTemplate()
        {
            Variables = new Dictionary<string, IDictionary<string, string>>();
        }

        public PublisherTemplate(NotifyMessageTemplate template)
            : this()
        {
            Id = template.Id;
            IDictionary<string, string> lobalValir = NotifySenderManager.Instance.Variables;
            foreach (Content content in template.Contents.Values)
            {
                var value = new NamedFormatterHelper();
                var dictionary = new Dictionary<string, string>();
                Variables.Add(content.Language, dictionary);

                foreach (string variable in value.CollectVariable(content.Value))
                {
                    if (lobalValir.ContainsKey(variable))
                    {
                        continue;
                    }
                    if (!dictionary.ContainsKey(variable))
                    {
                        dictionary.Add(variable, "");
                    }
                }
            }
        }

        public User[] Users { get; set; }
        public UserGroup[] UserGroups { get; set; }
        public Org[] Orgs { get; set; }
        public Role[] Roles { get; set; }

        /// <summary>
        ///     key 是 language，value是key-map的 变量已经他们的对应值。
        /// </summary>
        public IDictionary<string, IDictionary<string, string>> Variables { get; set; }

        /// <summary>
        ///     template's id
        /// </summary>
        public string Id { get; set; }

        public void Publish(IMemberShipDaoFactory memberShipDaoFactory, IMessageDaoFactory daoFactory)
        {
            NotifyMessageTemplate template = daoFactory.MessageTemplateDao.Get(Id);
            var performers = new List<IPerformer>();
            if (UserGroups != null)
            {
                performers.AddRange(UserGroups);
            }

            if (Orgs != null)
            {
                performers.AddRange(Orgs);
            }
            if (Roles != null)
            {
                performers.AddRange(Roles);
            }

            template.Send(memberShipDaoFactory, s => NotifySenderManager.Instance.Variables, Users, performers.ToArray());
        }
    }
}