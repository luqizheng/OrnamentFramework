using System;
using Ornament.Messages;
using Ornament.Messages.Dao;

namespace Ornament.Models.Messages
{
    public class MessageTypeModel
    {
        public MessageTypeModel()
        {
        }

        public MessageTypeModel(MessageType type)
        {
            if (type == null) throw new ArgumentNullException("type");
            Id = type.Id;
            Parent = type.Parent;
            Name = type.Name;
            Remark = type.Remark;
        }

        public string Id { get; set; }
        public MessageType Parent { get; set; }
        public string Name { get; set; }
        public string Remark { get; set; }

        public void Save(IMessageDaoFactory dao)
        {
            MessageType type;
            if (Id != null)
            {
                type = dao.MessageTypeDao.Get(Id);
            }
            else
            {
                type = Parent != null ? new MessageType(Name, Parent) : new MessageType(Name);
            }
            type.Remark = Remark;
            dao.MessageTypeDao.SaveOrUpdate(type);
        }


        public override string ToString()
        {
            return Name;
        }
    }
}