using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;
using Ornament.Messages.Dao;
using Ornament.Messages.Notification;

namespace Ornament.Messages.Plugin.Areas.Messages.Models.Messages
{
    public class MessageTemplateModel
    {
        private IDictionary<string, Content> _contents;

        public MessageTemplateModel()
        {
        }

        public MessageTemplateModel(NotifyMessageTemplate template)
        {
            if(template==null)
                throw new ArgumentNullException("template");
            Name = template.Name;
            Remark = template.Remark;
            foreach (string key in template.Contents.Keys)
            {
                Contents.Add(key, template.Contents[key]);
            }

        }

        /// <summary>
        /// </summary>
        [Editable(false)]
        public string Id { get; set; }

        //[UIHint("string"), Required]
        //[DisplayName("Notify Type")]
        //public NotifyType Notify { get; set; }

        /// <summary>
        /// </summary>
        [Required]
        [Remote("IsNotDuplicateName", "Template", "Messages", AdditionalFields = "Id")]
        public string Name { get; set; }

        /// <summary>
        /// </summary>
        [UIHint("Textarea")]
        public string Remark { get; set; }

        /// <summary>
        /// </summary>
        [AllowHtml]
        public virtual IDictionary<string, Content> Contents
        {
            get { return _contents ?? (_contents = new Dictionary<string, Content>()); }
            set { _contents = value; }
        }



        public void Save(IMessageTemplateDao dao)
        {
            if (dao == null)
                throw new ArgumentNullException("dao");

            NotifyMessageTemplate type = Id != null
                ? dao.Get(Id)
                : new NotifyMessageTemplate();
            type.Name = Name;
            type.Remark = Remark;
            dao.SaveOrUpdate(type);
            foreach (string lang in Contents.Keys)
            {
                if (type.Contents.ContainsKey(lang))
                    type.Contents[lang] = Contents[lang];
                else
                    type.Contents.Add(lang, Contents[lang]);

            }
            dao.Flush();
        }
    }
}