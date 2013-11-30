using System;
using System.ComponentModel.DataAnnotations;
using Ornament.Messages.Dao;
using Ornament.Messages.Notification;

namespace Ornament.Models.Messages
{
    public class NotifyTypeModel
    {
        public NotifyTypeModel()
        {
        }

        public NotifyTypeModel(NotifyType type)
        {
            Name = type.Name;
            Remark = type.Remark;
            CommunicationType = type.CommunicationType;
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
            dao.SaveOrUpdate(type);
            dao.Flush();
        }
    }
}