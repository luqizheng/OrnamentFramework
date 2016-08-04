using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using NHibernate.Linq;
using Ornament.Domain.Uow;
using Ornament.NHibernate;

namespace Ornament.Identity.Dao.NhImple
{
    

    public class RoleStore<TRole, TKey> :
        Store<TRole, TKey>,
        IQueryableRoleStore<TRole>
        where TKey : IEquatable<TKey>
        where TRole : IdentityRole<TKey>
    {
        public RoleStore(IUnitOfWorkProvider context) : base(context)
        {
        }

        public IQueryable<TRole> Roles => Entities;

        public Task SetNormalizedRoleNameAsync(TRole role, string normalizedName, CancellationToken cancellationToken)
        {
            if (role == null) throw new ArgumentNullException(nameof(role));
            if (normalizedName == null) throw new ArgumentNullException(nameof(normalizedName));
            ThrowIfDisposed();
            role.NormalizedName = normalizedName;
            return Task.FromResult(0);
        }

        public Task<TRole> FindByIdAsync(string roleId, CancellationToken cancellationToken)
        {
            ThrowIfDisposed();
            return Task.Run(() => Context.Get<TRole>(roleId), cancellationToken);
        }

        public virtual Task<TRole> FindByNameAsync(string roleName, CancellationToken cancellationToken)
        {
            ThrowIfDisposed();
            if (string.IsNullOrEmpty(roleName)) throw new ArgumentNullException(nameof(roleName));
            return
                Task.Run(() => Context.Query<TRole>().FirstOrDefault(u => u.Name.ToUpper() == roleName.ToUpper()),
                    cancellationToken);
        }

        public Task<string> GetRoleIdAsync(TRole role, CancellationToken cancellationToken)
        {
            return Task.FromResult(role.Id.ToString());
        }

        public Task<string> GetRoleNameAsync(TRole role, CancellationToken cancellationToken)
        {
            return Task.FromResult(role.Name);
        }

        public Task SetRoleNameAsync(TRole role, string roleName, CancellationToken cancellationToken)
        {
            return Task.Run(() => { role.Name = roleName; }, cancellationToken);
        }

        public Task<string> GetNormalizedRoleNameAsync(TRole role, CancellationToken cancellationToken)
        {
            return Task.FromResult(role.NormalizedName);
        }

        public Task<IdentityResult> CreateAsync(TRole role, CancellationToken cancellationToken)
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

        public virtual Task<IdentityResult> DeleteAsync(TRole role, CancellationToken cancellationToken)
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

        public virtual Task<IdentityResult> UpdateAsync(TRole role, CancellationToken cancellationToken)
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