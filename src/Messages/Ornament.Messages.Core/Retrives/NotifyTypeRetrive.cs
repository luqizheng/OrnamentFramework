using System;
using Ornament.Messages.Dao;
using Ornament.Messages.Notification;

namespace Ornament.Messages.Retrives
{
    //public class NotifyTypeRetrive : Retrive<NotifyType, string>
    //{
    //    public NotifyTypeRetrive(string name)
    //        : base(name)
    //    {
    //    }

    //    protected override NotifyType GetById(string id, IMessageDaoFactory messageDaoFactory)
    //    {
    //        if (id == null)
    //            throw new ArgumentNullException("id");
    //        if (id.Length != 32)
    //            throw new ArgumentOutOfRangeException("id", "Id should be 32 length.");
    //        return messageDaoFactory.NotifyTypeDao.Get(id);
    //    }

    //    protected override NotifyType CreateInstance(string name, IMessageDaoFactory messageDaoFactory)
    //    {
    //        if (name == null) throw new ArgumentNullException("name");
    //        return new NotifyType
    //        {
    //            Name = name
    //        };
    //    }

    //    /// <summary>
    //    /// </summary>
    //    /// <param name="name"></param>
    //    /// <returns></returns>
    //    protected override NotifyType GetByName(string name, IMessageDaoFactory messageDaoFactory)
    //    {
    //        if (name == null) throw new ArgumentNullException("name");
    //        return messageDaoFactory.NotifyTypeDao.GetByName(name);
    //    }

    //    /// <summary>
    //    /// </summary>
    //    /// <param name="t"></param>
    //    protected override void SaveOrUpdate(NotifyType t, IMessageDaoFactory messageDaoFactory)
    //    {
    //        if (t == null) throw new ArgumentNullException("t");
    //        messageDaoFactory.NotifyTypeDao.SaveOrUpdate(t);
    //    }
    //}
}