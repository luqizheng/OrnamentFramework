using System;
using System.Linq;
using NHibernate;
using NHibernate.Linq;
using Ornament.Domain.Entities;
using Ornament.Domain.Stores;
using Ornament.Domain.Uow;
using Ornament.NHibernate.Uow;

namespace Ornament.NHibernate
{
    public abstract class Store<T, TId> : StoreBase<T, TId>,
        IDisposable
        where T : EntityWithTypedId<TId>
        where TId : IEquatable<TId>

    {
        protected Store(IUnitOfWork context) : base(context)
        {
            ShouldDisposeSession = true;
            var nhUow = (NhUow) context;
            Context = nhUow.Session;
        }


        protected ISession Context { get; }

        /// <summary>
        ///     If true then disposing this object will also dispose (close) the session. False means that external code is
        ///     responsible for disposing the session.
        /// </summary>
        public bool ShouldDisposeSession { get; set; }

        public override IQueryable<T> Entities => Context.Query<T>();

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public override void SaveOrUpdate(T t)
        {
            Context.SaveOrUpdate(t);
        }

        public override void Delete(T t)
        {
            Context.Delete(t);
        }

        public override T Get(TId id)
        {
            return Context.Get<T>(id);
        }

        public override T Load(TId id)
        {
            return Context.Load<T>(id);
        }
    }
}