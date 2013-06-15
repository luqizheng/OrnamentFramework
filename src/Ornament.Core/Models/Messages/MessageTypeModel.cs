using System;
using Ornament.Messages;
using Ornament.Messages.Dao;
using Ornament.Messages.Newses;

namespace Ornament.Models.Messages
{
    public class MessageTypeModel
    {
        public MessageTypeModel()
        {
        }

        public MessageTypeModel(NewsType type)
        {
            if (type == null) throw new ArgumentNullException("type");
            Id = type.Id;
            Name = type.Name;
            Remark = type.Remark;
        }

        public string Id { get; set; }
        public NewsType Parent { get; set; }
        public string Name { get; set; }
        public string Remark { get; set; }

        public void Save(IMessageDaoFactory dao)
        {
            NewsType type;
            if (Id != null)
            {
                type = dao.MessageTypeDao.Get(Id);
            }
            else
            {
                type =new NewsType(Name);
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