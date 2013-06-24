using Ornament.Messages;
using Ornament.Messages.Dao;
using Ornament.Messages.Notification;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

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
            this.Contents = type.Contents;
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
        [UIHint("EnumCheckBox"), Required()]
        public CommunicationType CommunicationType { get; set; }

        /// <summary>
        /// </summary>
        [System.Web.Mvc.AllowHtml]
        public virtual IDictionary<string, Content> Contents
        {
            get { return _contents ?? (_contents = new Dictionary<string, Content>()); }
            set { _contents = value; }
        }

        public void Save(INotifyTypeDao dao)
        {
            NotifyType type = Id != null ? dao.Get(Id) : new NotifyType();
            type.Name = Name;
            type.Remark = Remark;
            type.CommunicationType = CommunicationType;
            type.Contents.Clear();
            foreach (var key in Contents.Keys)
            {
                type.Contents.Add(key, Contents[key]);
            }
            dao.SaveOrUpdate(type);
            dao.Flush();
        }
    }
}