﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ornament.Messages.Notification;
using Ornament;
namespace Ornament.Retrives
{
    internal class NotifyTypeRetrive : Retrive<NotifyType, string>
    {
        public NotifyTypeRetrive(string name)
            : base(name)
        {

        }

        protected override NotifyType GetById(string id)
        {
            if (id == null) 
                throw new ArgumentNullException("id");
            if(id.Length!=32)
                throw new ArgumentOutOfRangeException("id","Id should be 32 length.");
            return OrnamentContext.DaoFactory.MessageDaoFactory.NotifyTypeDao.Get(id);
        }

        protected override NotifyType CreateInstance(string name)
        {
            if (name == null) throw new ArgumentNullException("name");
            return new NotifyType()
                {
                    CommunicationType = CommunicationType.Email,
                    Name = name
                };
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        protected override NotifyType GetByName(string name)
        {
            if (name == null) throw new ArgumentNullException("name");
            return OrnamentContext.DaoFactory.MessageDaoFactory.NotifyTypeDao.GetByName(name);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="t"></param>
        protected override void SaveOrUpdate(NotifyType t)
        {
            if (t == null) throw new ArgumentNullException("t");
            OrnamentContext.DaoFactory.MessageDaoFactory.NotifyTypeDao.SaveOrUpdate(t);
        }
    }
}
