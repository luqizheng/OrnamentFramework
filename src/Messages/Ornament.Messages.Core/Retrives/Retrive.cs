using Ornament.Messages.Dao;
using Qi.Domain;

namespace Ornament.Messages.Retrives
{
    public abstract class Retrive<T, TId> where T : DomainObject<T, TId>
    {
        private readonly string _name;

        private TId _id;

        protected Retrive(string name)
        {
            _name = name;
        }

        public T Get(IMessageDaoFactory messageDaoFactory)
        {
            T result = null;
            if (!object.ReferenceEquals(_id, default(TId)) && _id != null)
            {
                result = GetById(_id, messageDaoFactory);
            }

            if (result == null)
            {
                result = GetByName(_name, messageDaoFactory);
                if (result == null)
                {
                    result = CreateInstance(_name, messageDaoFactory);
                    SaveOrUpdate(result, messageDaoFactory);
                }
                _id = result.Id;
            }
            return result;
        }

        protected abstract T GetById(TId id, IMessageDaoFactory messageDaoFactory);
        protected abstract T CreateInstance(string name, IMessageDaoFactory messageDaoFactory);
        protected abstract T GetByName(string name, IMessageDaoFactory messageDaoFactory);
        protected abstract void SaveOrUpdate(T t, IMessageDaoFactory messageDaoFactory);
    }
}