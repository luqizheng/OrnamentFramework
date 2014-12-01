using System;
using Ornament.Messages.Dao;
using Ornament.Messages.Notification;

namespace Ornament.Messages.Retrives
{
    public class SimpleMessageFactoryRetrive : Retrive<NotifyMessageTemplate, string>
    {
        private readonly Content[] _contents;

       // private readonly NotifyType _notifyType;
        private readonly string _remark;

        public SimpleMessageFactoryRetrive(string name, string remark, params Content[] contents)
            : base(name)
        {
            if (remark == null)
                throw new ArgumentNullException("remark");
        
            _remark = remark;
         
            _contents = contents;
        }
        /// <summary>
        /// 根据Id获取NotifyMessageTemplate
        /// </summary>
        /// <param name="id"></param>
        /// <param name="messageDaoFactory"></param>
        /// <returns></returns>
        protected override NotifyMessageTemplate GetById(string id, IMessageDaoFactory messageDaoFactory)
        {
            return messageDaoFactory.MessageTemplateDao.Get(id);
        }
        /// <summary>
        /// 根据名字获取NotifymessageTemplate
        /// </summary>
        /// <param name="name"></param>
        /// <param name="messageDaoFactory"></param>
        /// <returns></returns>
        protected override NotifyMessageTemplate CreateInstance(string name, IMessageDaoFactory messageDaoFactory)
        {
            var result = new NotifyMessageTemplate()
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