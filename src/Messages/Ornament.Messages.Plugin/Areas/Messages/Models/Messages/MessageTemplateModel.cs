using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web.Mvc;
using Ornament.Messages.Dao;
using Ornament.Messages.Notification;
using Ornament.Messages.Notification.Senders;

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
            this.Senders=new Sender[template.Senders.Count];
            for (var i = 0; i < Senders.Length; i++)
            {
                this.Senders[i] = (Sender)template.Senders[i];
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
        /// <summary>
        ///
        /// </summary>
        /// <remarks>
        ///  這裡只能使用 Abstract類型而不能是ISender,因為NH-mapping的是Sender
        /// 因此NHModelBiner並不知道ISender是NH映射類型，無法從String類型轉換為Sender對象
        /// </remarks>
        public  Sender[] Senders { get; set; }


        public void Save(IMessageTemplateDao dao)
        {
            if (dao == null)
                throw new ArgumentNullException("dao");

            NotifyMessageTemplate template = Id != null
                ? dao.Get(Id)
                : new NotifyMessageTemplate();
            template.Name = Name;
            template.Remark = Remark;
            template.Senders.Clear();
            foreach (var sender in this.Senders)
            {
                template.Senders.Add(sender);
            }
            dao.SaveOrUpdate(template);

            foreach (var content in Contents)
            {

                if (content == null)
                    continue;
                var lang = content.Language;
                if (template.Contents.ContainsKey(lang))
                {
                    template.Contents[lang] = content;
                }
                else
                    template.Contents.Add(lang, content);
            }
            dao.Flush();
        }
    }
}