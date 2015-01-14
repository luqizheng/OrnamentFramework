using System.Collections.Generic;
using Ornament.MemberShip;
using Ornament.Messages.Config;
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
            Dictionary<string, string> globalValir = NotifySenderManager.Instance.Variables;
            foreach (Content content in template.Contents.Values)
            {
                var value = new NamedFormatterHelper();
                var dictionary = new Dictionary<string, string>();
                Variables.Add(content.Language, dictionary);

                foreach (string variable in value.CollectVariable(content.Value))
                {
                    if (globalValir.ContainsKey(variable))
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
    }
}