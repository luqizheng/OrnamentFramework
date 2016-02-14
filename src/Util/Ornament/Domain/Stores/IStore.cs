using System.Linq;
using Ornament.Domain.Entities;

namespace Ornament.Domain.Stores
{
    public interface IStore<T, TId> 
        where T : EntityWithTypedId<TId>
    {
        IQueryable<T> Entities { get; }

        void SaveOrUpdate(T t);

        void Delete(T t);

        T Get(TId id
            );

        T Load(TId id);
    }
}