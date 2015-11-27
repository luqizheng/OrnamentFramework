#if !DNXCORE50

using Microsoft.AspNet.Identity;
using NHibernate;
using NHibernate.Linq;
using Ornament.Domain.Uow;
using Ornament.NHibernate;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Ornament.Identity.Dao
{
    public class RoleStore<TRole> : Store, IQueryableRoleStore<TRole>,
        IRoleStore<TRole> where TRole : IdentityRole
    {
        public RoleStore(IUnitOfWork context) : base(context)
        {
        }

        public IQueryable<TRole> Roles
        {
            get
            {
                ThrowIfDisposed();
                return Context.Query<TRole>();
            }
        }

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
            throw new NotImplementedException();
        }

        public Task<string> GetRoleNameAsync(TRole role, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task SetRoleNameAsync(TRole role, string roleName, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetNormalizedRoleNameAsync(TRole role, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
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

#endif