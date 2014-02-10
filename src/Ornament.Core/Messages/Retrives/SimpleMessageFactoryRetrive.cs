using System;
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
            if (remark == null) throw new ArgumentNullException("remark");
            if (notifyType == null) throw new ArgumentNullException("notifyType");
            _remark = remark;
            _notifyType = notifyType;
            _contents = contents;
        }

        protected override NotifyMessageTemplate GetById(string id)
        {
            return OrnamentContext.DaoFactory.MessageDaoFactory.MessageTemplateDao.Get(id);
        }

        protected override NotifyMessageTemplate CreateInstance(string name)
        {
            var result = new NotifyMessageTemplate(_notifyType)
                {
                    Name = name,
                    Remark = _remark,
                };
            foreach (Content content in _contents)
            {
                result.Contents.Add(content.Language, content);
            }
            return result;
        }

        protected override NotifyMessageTemplate GetByName(string name)
        {
            return OrnamentContext.DaoFactory.MessageDaoFactory.MessageTemplateDao.GetByName(name);
        }

        protected override void SaveOrUpdate(NotifyMessageTemplate t)
        {
            OrnamentContext.DaoFactory.MessageDaoFactory.MessageTemplateDao.SaveOrUpdate(t);
        }
    }
}