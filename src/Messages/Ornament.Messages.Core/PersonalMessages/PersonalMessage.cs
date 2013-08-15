﻿using System;
using Ornament.MemberShip;
using Ornament.Messages.Dao;
using Qi.Domain;

namespace Ornament.Messages.PersonalMessages
{
    public class PersonalMessage : DomainObject<PersonalMessage, int>
    {
        protected PersonalMessage()
        {
        }

        public PersonalMessage(User publisher)
        {
            CreateTime = DateTime.Now;
            Publisher = publisher;
        }

        public virtual PersonalMessageStatus ReadStatus { get; set; }

        /// <summary>
        /// </summary>
        public virtual string Content { get; set; }

        /// <summary>
        /// </summary>
        public virtual DateTime CreateTime { get; set; }

        /// <summary>
        ///     接收人
        /// </summary>
        public virtual User Receiver { get; set; }

        /// <summary>
        ///     发布人
        /// </summary>
        public virtual User Publisher { get; protected set; }
        /// <summary>
        /// 删除标记。
        /// </summary>
        public virtual PersonalMessageStatus DeleteStatus { get; set; }
        /// <summary>
        /// 至少有当Receiver和Publisher都要求删除的时候。db中才会真正删除
        /// </summary>
        /// <param name="currentUser"></param>
        /// <param name="personalMessageDao"></param>
        public virtual void Delete(User currentUser, IPersonalMessageDao personalMessageDao)
        {
            if (currentUser == null) throw new ArgumentNullException("currentUser");
            if (personalMessageDao == null) throw new ArgumentNullException("personalMessageDao");
            if (Receiver.Id == currentUser.Id)
            {
                DeleteStatus |= PersonalMessageStatus.Receiver;
            }
            else
            {
                DeleteStatus |= PersonalMessageStatus.Publisher;
            }

            if (this.DeleteStatus.HasFlag(PersonalMessageStatus.Publisher) && this.DeleteStatus.HasFlag(PersonalMessageStatus.Receiver))
            {
                personalMessageDao.Delete(this);
            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="currentUser"></param>
        /// <param name="personalMessageDao"></param>
        public virtual void HasRead(User currentUser, IPersonalMessageDao personalMessageDao)
        {
            if (currentUser == null) throw new ArgumentNullException("currentUser");
            if (personalMessageDao == null) throw new ArgumentNullException("personalMessageDao");
            ReadStatus = Receiver.Id == currentUser.Id ? PersonalMessageStatus.Receiver : PersonalMessageStatus.Publisher;
            personalMessageDao.SaveOrUpdate(this);
        }
    }
    [Flags]
    public enum PersonalMessageStatus
    {
        Publisher = 1, Receiver = 2
    }
}