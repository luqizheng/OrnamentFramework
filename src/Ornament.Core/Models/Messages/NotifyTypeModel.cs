using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;
using Ornament.Messages;
using Ornament.Messages.Dao;
using Ornament.Messages.Notification;

namespace Ornament.Models.Messages
{
    public class NotifyTypeModel
    {
        private IDictionary<string, Content> _contents;

        public NotifyTypeModel()
        {
        }

        public NotifyTypeModel(NotifyType type)
        {
            Name = type.Name;
            Remark = type.Remark;
            CommunicationType = type.CommunicationType;
            Contents = type.Contents;
        }

        /// <summary>
        /// </summary>
        [Editable(false)]
        public string Id { get; set; }

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
        [UIHint("EnumCheckBox"), Required]
        public CommunicationType CommunicationType { get; set; }

        /// <summary>
        /// </summary>
        [AllowHtml]
        public virtual IDictionary<string, Content> Contents
        {
            get { return _contents ?? (_contents = new Dictionary<string, Content>()); }
            set { _contents = value; }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="dao"></param>
        /// <exception cref="ArgumentNullException">dao is null.</exception>
        public void Save(INotifyTypeDao dao)
        {
            if (dao == null)
                throw new ArgumentNullException("dao");
            NotifyType type = Id != null ? dao.Get(Id) : new NotifyType();
            type.Name = Name;
            type.Remark = Remark;
            type.CommunicationType = CommunicationType;
            type.Contents.Clear();
            foreach (string key in Contents.Keys)
            {
                type.Contents.Add(key, Contents[key]);
            }
            dao.SaveOrUpdate(type);
            dao.Flush();
        }
    }
}