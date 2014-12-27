using System.Collections.Generic;
using Ornament.Messages.Notification;
using Qi.Text;

namespace Ornament.Messages.Plugin.Areas.Messages.Models
{
    public class PublisherTemplate
    {
        public PublisherTemplate()
        {
            Variables = new Dictionary<string,IDictionary<string, string>>();
            
        }

        public PublisherTemplate(NotifyMessageTemplate template)
            : this()
        {
            this.Id = template.Id;
            foreach (Content content in template.Contents.Values)
            {
                var value = new NamedFormatterHelper();
                var dictionary = new Dictionary<string, string>();
                Variables.Add(content.Language,dictionary);

                foreach (string v in value.CollectVariable(content.Value))
                {
                    if (!dictionary.ContainsKey(v))
                    {
                        dictionary.Add(v, "");
                    }
                }
            }
        }

        
        
        public IDictionary<string,IDictionary<string, string>> Variables { get; set; }
        public string Id
        { get; set; }
    }
}