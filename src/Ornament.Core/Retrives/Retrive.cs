using Qi.Domain;

namespace Ornament.Retrives
{
    internal abstract class Retrive<T, TID> where T : DomainObject<T, TID>
    {
        private readonly string _name;

        private TID _id;

        protected Retrive(string name)
        {
            _name = name;
        }

        public T Get()
        {
            T result = _id == null ||
                       default(TID).Equals(_id)
                           ? CreateInstance(_name)
                           : GetById(_id);

            if (result == null)
            {
                _id = default(TID);
                return Get();
            }
            if (result.IsTransient())
            {
                SaveOrUpdate(result);
            }
            return result;
        }

        protected abstract T GetById(TID id);
        protected abstract T CreateInstance(string name);
        protected abstract void SaveOrUpdate(T t);
    }
}