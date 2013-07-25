using System;
using Ornament.Messages;
using Ornament.Messages.Notification;

namespace Ornament.Retrives
{
    internal class SimpleMessageFactoryRetrive : Retrive<MessageTemplate, string>
    {
        private readonly Content[] _contents;
        private readonly string _name;
        private readonly NotifyType _notifyType;
        private readonly string _remark;

        public SimpleMessageFactoryRetrive(string name, string remark, NotifyType notifyType, params Content[] contents)
            : base(name)
        {
            if (remark == null) throw new ArgumentNullException("remark");
            if (notifyType == null) throw new ArgumentNullException("notifyType");
            _name = name;
            _remark = remark;
            _notifyType = notifyType;
            _contents = contents;
        }

        protected override MessageTemplate GetById(string id)
        {
            return OrnamentContext.DaoFactory.MessageDaoFactory.MessageTemplateDao.Get(id);
        }

        protected override MessageTemplate CreateInstance(string name)
        {
            var result = new MessageTemplate(_notifyType)
                {
                    Name = name,
                    Remark = _remark,
                    Inside = true,
                };
            foreach (Content content in _contents)
            {
                result.Contents.Add(content.Language, content);
            }
            return result;
        }

        protected override MessageTemplate GetByName(string name)
        {
            return OrnamentContext.DaoFactory.MessageDaoFactory.MessageTemplateDao.GetByName(name);
        }

        protected override void SaveOrUpdate(MessageTemplate t)
        {
            OrnamentContext.DaoFactory.MessageDaoFactory.MessageTemplateDao.SaveOrUpdate(t);
        }
    }
}