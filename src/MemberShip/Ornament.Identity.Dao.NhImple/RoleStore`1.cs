using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using NHibernate.Linq;
using Ornament.Domain.Uow;
using Ornament.NHibernate;

namespace Ornament.Identity.Dao
{
    public abstract class RoleStore<TKey> :
        Store<IdentityRole<TKey>, TKey>,
        IQueryableRoleStore<IdentityRole<TKey>>
        where TKey : IEquatable<TKey>
    {
        protected RoleStore(IUnitOfWork context) : base(context)
        {
        }

        public IQueryable<IdentityRole<TKey>> Roles => Entities;

        public Task SetNormalizedRoleNameAsync(IdentityRole<TKey> role, string normalizedName, CancellationToken cancellationToken)
        {
            if (role == null) throw new ArgumentNullException(nameof(role));
            if (normalizedName == null) throw new ArgumentNullException(nameof(normalizedName));
            ThrowIfDisposed();
            role.NormalizedName = normalizedName;
            return Task.FromResult(0);
        }

        public Task<IdentityRole<TKey>> FindByIdAsync(string roleId, CancellationToken cancellationToken)
        {
            ThrowIfDisposed();
            return Task.Run(() => Context.Get<IdentityRole<TKey>>(roleId), cancellationToken);
        }

        public virtual Task<IdentityRole<TKey>> FindByNameAsync(string roleName, CancellationToken cancellationToken)
        {
            ThrowIfDisposed();
            if (string.IsNullOrEmpty(roleName)) throw new ArgumentNullException(nameof(roleName));
            return
                Task.Run(() => Context.Query<IdentityRole<TKey>>().FirstOrDefault(u => u.Name.ToUpper() == roleName.ToUpper()),
                    cancellationToken);
        }

        public Task<string> GetRoleIdAsync(IdentityRole<TKey> role, CancellationToken cancellationToken)
        {
            return Task.FromResult(role.Id.ToString());
        }

        public Task<string> GetRoleNameAsync(IdentityRole<TKey> role, CancellationToken cancellationToken)
        {
            return Task.FromResult(role.Name);
        }

        public Task SetRoleNameAsync(IdentityRole<TKey> role, string roleName, CancellationToken cancellationToken)
        {
            return Task.Run(() => { role.Name = roleName; }, cancellationToken);
        }

        public Task<string> GetNormalizedRoleNameAsync(IdentityRole<TKey> role, CancellationToken cancellationToken)
        {
            return Task.FromResult(role.NormalizedName);
        }

        public Task<IdentityResult> CreateAsync(IdentityRole<TKey> role, CancellationToken cancellationToken)
        {
            ThrowIfDisposed();
            if (role == null)
                throw new ArgumentNullException(nameof(role));
            return Task.Run(() =>
            {
                Context.Save(role);
                Context.Flush();
                return IdentityResult.Success;
            }, cancellationToken);
        }

        public virtual Task<IdentityResult> DeleteAsync(IdentityRole<TKey> role, CancellationToken cancellationToken)
        {
            ThrowIfDisposed();
            if (role == null)
            {
                throw new ArgumentNullException(nameof(role));
            }
            return Task.Run(() =>
            {
                Context.Delete(role);
                Context.Flush();
                return IdentityResult.Success;
            }, cancellationToken);
        }

        public virtual Task<IdentityResult> UpdateAsync(IdentityRole<TKey> role, CancellationToken cancellationToken)
        {
            ThrowIfDisposed();
            if (role == null)
                throw new ArgumentNullException(nameof(role));

            return Task.Run(() =>
            {
                Context.Update(role);
                Context.Flush();
                return IdentityResult.Success;
            }, cancellationToken);
        }
    }
}