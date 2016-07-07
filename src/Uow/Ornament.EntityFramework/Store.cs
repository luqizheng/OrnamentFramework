using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Ornament.Domain.Entities;
using Ornament.Domain.Stores;
using Ornament.Domain.Uow;
using Ornament.EntityFramework.Uow;

namespace Ornament.EntityFramework
{
    public abstract class Store<T, TId> : StoreBase<T, TId>,
        IDisposable
        where T : EntityWithTypedId<TId>
        where TId : IEquatable<TId>

    {
        protected Store(IUnitOfWork context) : base(context)
        {
            if (context == null)
                throw new ArgumentNullException(nameof(context));
            if (!(context is EfUnitOfWork))
            {
                throw new ArgumentOutOfRangeException(nameof(context), "context should be type of EfSessionUnitOfWork");
            }
            ShouldDisposeSession = true;
        }


        protected DbContext Context => ((EfUnitOfWork) Uow).DbContext;

        /// <summary>
        ///     If true then disposing this object will also dispose (close) the session. False means that external code is
        ///     responsible for disposing the session.
        /// </summary>
        public bool ShouldDisposeSession { get; set; }

        public override IQueryable<T> Entities => Context.Set<T>();

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public override void SaveOrUpdate(T t)
        {
            Context.Set<T>().Add(t);
        }

        public override void Delete(T t)
        {
            Context.Remove(t);
        }

        public override T Get(TId id)
        {
            var set = from a in Entities where id.Equals(id) select a;
            var s = set.FirstOrDefaultAsync();
            return s.Result;
        }

        public override T Load(TId id)
        {
            return Get(id);
        }
    }
}