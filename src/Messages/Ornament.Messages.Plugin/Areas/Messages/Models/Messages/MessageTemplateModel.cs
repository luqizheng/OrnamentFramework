using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;
using Ornament.Messages.Dao;
using Ornament.Messages.Notification;

namespace Ornament.Messages.Plugin.Areas.Messages.Models.Messages
{
    public class MessageTemplateModel
    {
        private List<Content> _contents;

        public MessageTemplateModel()
        {
        }

        public MessageTemplateModel(NotifyMessageTemplate template)
        {
            if (template == null)
                throw new ArgumentNullException("template");
            Name = template.Name;
            Remark = template.Remark;
            Contents.AddRange(template.Contents.Values);
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
        public string Remark { get; set; }

        /// <summary>
        /// </summary>
        [AllowHtml]
        public virtual List<Content> Contents
        {
            get { return _contents ?? (_contents = new List<Content>()); }
            set { _contents = value; }
        }

        [UIHint("Editor")]
        public virtual string Content
        {
            get { return ""; }
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

            foreach (var content in Contents)
            {

                if (content == null)
                    continue;
                var lang = content.Language;
                if (type.Contents.ContainsKey(lang))
                {
                    type.Contents[lang] = content;
                }
                else
                    type.Contents.Add(lang, content);
            }
            dao.Flush();
        }
    }
}