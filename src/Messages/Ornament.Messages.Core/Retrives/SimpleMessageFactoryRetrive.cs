using System;
using Ornament.Messages.Dao;
using Ornament.Messages.Notification;

namespace Ornament.Messages.Retrives
{
    public class SimpleMessageFactoryRetrive : Retrive<NotifyMessageTemplate, string>
    {
        private readonly Content[] _contents;

        private readonly NotifyType _notifyType;
        private readonly string _remark;

        public SimpleMessageFactoryRetrive(string name, string remark, NotifyType notifyType, params Content[] contents)
            : base(name)
        {
            if (remark == null) 
                throw new ArgumentNullException("remark");
            if (notifyType == null)
                throw new ArgumentNullException("notifyType");
            _remark = remark;
            _notifyType = notifyType;
            _contents = contents;
        }

        protected override NotifyMessageTemplate GetById(string id, IMessageDaoFactory messageDaoFactory)
        {
            return messageDaoFactory.MessageTemplateDao.Get(id);
        }

        protected override NotifyMessageTemplate CreateInstance(string name, IMessageDaoFactory messageDaoFactory)
        {
            var result = new NotifyMessageTemplate(_notifyType)
            {
                Name = name,
                Remark = _remark,
                Type = _notifyType
            };
            foreach (Content content in _contents)
            {
                result.Contents.Add(content.Language, content);
            }
            return result;
        }

        protected override NotifyMessageTemplate GetByName(string name, IMessageDaoFactory messageDaoFactory)
        {
            return messageDaoFactory.MessageTemplateDao.GetByName(name);
        }


        protected override void SaveOrUpdate(NotifyMessageTemplate t, IMessageDaoFactory messageDaoFactory)
        {
            messageDaoFactory.MessageTemplateDao.SaveOrUpdate(t);
        }
    }
}