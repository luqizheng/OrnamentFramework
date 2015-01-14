using System;
using System.ComponentModel.DataAnnotations;
using Ornament.Messages.Dao;
using Ornament.Messages.Newses;

namespace Ornament.Messages.Plugin.Areas.Messages.Models.Messages
{
    public class NewsTypeModel
    {
        public NewsTypeModel()
        {
        }

        /// <summary>
        /// </summary>
        /// <param name="type"></param>
        /// <exception cref="ArgumentNullException">input type is null.</exception>
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

        /// <summary>
        /// </summary>
        /// <param name="dao"></param>
        /// <exception cref="ArgumentNullException">dao is null</exception>
        public void Save(IMessageDaoFactory dao)
        {
            if (dao == null)
                throw new ArgumentNullException("dao");
            NewsType type = Id != null ? dao.NewsTypeDao.Get(Id) : new NewsType(Name);
            type.Name = Name;
            type.Remark = Remark;
            dao.NewsTypeDao.SaveOrUpdate(type);
        }


        public override string ToString()
        {
            return Name;
        }
    }
}