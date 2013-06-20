using System;
using System.ComponentModel.DataAnnotations;
using Ornament.Messages;
using Ornament.Messages.Dao;
using Ornament.Messages.Newses;

namespace Ornament.Models.Messages
{
    public class NewsTypeModel
    {
        public NewsTypeModel()
        {
        }

        public NewsTypeModel(NewsType type)
        {
            if (type == null) throw new ArgumentNullException("type");
            Id = type.Id;
            Name = type.Name;
            Remark = type.Remark;
        }

        public string Id { get; set; }
        [UIHint("string")]
        public string Name { get; set; }
        [UIHint("Textarea")]
        public string Remark { get; set; }

        public void Save(IMessageDaoFactory dao)
        {
            NewsType type;
            if (Id != null)
            {
                type = dao.NewsTypeDao.Get(Id);
            }
            else
            {
                type = new NewsType(Name);
            }
            type.Name = this.Name;
            type.Remark = Remark;
            dao.NewsTypeDao.SaveOrUpdate(type);
        }


        public override string ToString()
        {
            return Name;
        }
    }
}