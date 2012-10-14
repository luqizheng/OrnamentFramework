using System;
using System.Collections.Generic;
using NHibernate;
using NHibernate.Criterion;
using Qi.Domain.NHibernates;

namespace Ornament.Messages.Dao.NHibernateImple
{
    public class InfoTypeDao : DaoBase<string, MessageType>, IInfoTypeDao
    {
        #region IInfoTypeDao Members

        public IList<MessageType> GetFirstLevel()
        {
            return CreateCriteria().Add(Restrictions.IsNull("OrderId")).List<MessageType>();
        }

        public MessageType GetByName(string name)
        {
            if (String.IsNullOrEmpty(name))
                throw new ArgumentNullException("name");
            ICriteria criteria = CreateCriteria();
            IList<MessageType> list = criteria.Add(Restrictions.Eq("Name", name)).List<MessageType>();
            if (list.Count == 0)
            {
                return null;
            }
            return list[0];
        }

        #endregion
    }
}