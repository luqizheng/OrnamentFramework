using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;
using Ornament.Messages;
using Ornament.Messages.Dao;
using Ornament.Messages.Notification;

namespace Ornament.Models.Messages
{
    public class MessageTemplateModel
    {
        public MessageTemplateModel()
        {
        }
        private IDictionary<string, Content> _contents;
        public MessageTemplateModel(MessageTemplate template)
        {
            this.Name = template.Name;
            this.Remark = template.Remark;
            foreach (var key in template.Contents.Keys)
            {
                this.Contents.Add(key, template.Contents[key]);
            }
            this.Inside = template.Inside;

        }
        /// <summary>
        /// </summary>
        [Editable(false)]
        public string Id { get; set; }
        [UIHint("string"), Required]
        [DisplayName("Notify Type")]
        public NotifyType Notify { get; set; }

        /// <summary>
        /// </summary>
        [UIHint("string"), Required]
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
        [DisplayName("Inside Template")]
        public bool Inside { get; private set; }

        public void Save(IMessageTemplateDao dao)
        {
            if (dao == null)
                throw new ArgumentNullException("dao");

            MessageTemplate type = Id != null ?
                dao.Get(Id) : new MessageTemplate(Notify);
            type.Name = Name;
            type.Remark = Remark;
            dao.SaveOrUpdate(type);
            foreach (var lang in Contents.Keys)
            {
                type.Contents.Add(lang, Contents[lang]);
            }
            dao.Flush();
        }
    }
}