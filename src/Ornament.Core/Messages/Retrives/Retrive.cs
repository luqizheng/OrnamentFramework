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

        public T Get()
        {
            T result = null;
            if (!object.ReferenceEquals(_id, default(TId)) && _id != null)
            {
                result = GetById(_id);
            }

            if (result == null)
            {
                result = GetByName(_name);
                if (result == null)
                {
                    result = CreateInstance(_name);
                    SaveOrUpdate(result);
                }
                _id = result.Id;
            }
            return result;
        }

        protected abstract T GetById(TId id);
        protected abstract T CreateInstance(string name);
        protected abstract T GetByName(string name);
        protected abstract void SaveOrUpdate(T t);
    }
}