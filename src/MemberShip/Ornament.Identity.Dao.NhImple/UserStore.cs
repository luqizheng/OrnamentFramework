using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using NHibernate.Criterion;
using NHibernate.Linq;
using Ornament.Domain.Uow;
using Ornament.NHibernate;
using Ornament.NHibernate.Uow;

namespace Ornament.Identity.Dao.NhImple
{
    public class UserStore<TUser, TKey, TRole, TRokeKey> :
        Store<TUser, TKey>,
        IUserLoginStore<TUser>,
        IQueryableUserStore<TUser>,
        IUserClaimStore<TUser>,
        IUserRoleStore<TUser>,
        IUserPasswordStore<TUser>,
        IUserSecurityStampStore<TUser>,
        IUserEmailStore<TUser>,
        IUserPhoneNumberStore<TUser>,
        IUserLockoutStore<TUser>
        where TUser : IdentityUser<TKey, TRole>
        where TRole : IdentityRole<TRokeKey>
        where TKey : IEquatable<TKey>
        where TRokeKey : IEquatable<TRokeKey>


    {

        public UserStore(NhUow provider) : base(provider)
        {
        }


        public IQueryable<TUser> Users => Context.Query<TUser>();

        public Task<IList<Claim>> GetClaimsAsync(TUser user, CancellationToken cancellationToken)
        {
            ThrowIfDisposed();
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }
            return Task.Run<IList<Claim>>(() =>
            {
                var r = user.Claims.Select(v => new Claim(v.ClaimType, v.ClaimValue));
                return r.ToList();
            }, cancellationToken);
        }

        public Task AddClaimsAsync(TUser user, IEnumerable<Claim> claims, CancellationToken cancellationToken)
        {
            ThrowIfDisposed();
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }
            if (claims == null)
            {
                throw new ArgumentNullException(nameof(claims));
            }

            return Task.Run(() =>
            {
                foreach (var claim in claims)
                {
                    var claimEntity = CreateUserClaim(user, claim);
                    user.Claims.Add(claimEntity);
                }
            }, cancellationToken);
        }

        public Task ReplaceClaimAsync(TUser user, Claim claim, Claim newClaim,
            CancellationToken cancellationToken)
        {
            ThrowIfDisposed();
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }
            if (claim == null)
            {
                throw new ArgumentNullException(nameof(claim));
            }
            if (newClaim == null)
            {
                throw new ArgumentNullException(nameof(newClaim));
            }

            var matchedClaims = user.Claims.Where(uc => uc.ClaimValue == claim.Value && uc.ClaimType == claim.Type);
            foreach (var matchedClaim in matchedClaims)
            {
                matchedClaim.ClaimValue = newClaim.Value;
                matchedClaim.ClaimType = newClaim.Type;
            }
            return Task.FromResult(0);
        }

        public Task RemoveClaimsAsync(TUser user, IEnumerable<Claim> claims, CancellationToken cancellationToken)
        {
            ThrowIfDisposed();
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }
            if (claims == null)
            {
                throw new ArgumentNullException(nameof(claims));
            }

            foreach (var claim in claims)
            {
                foreach (var identityUserClaim in user.Claims.Where(uc =>
                {
                    if (uc.ClaimValue == claim.Value)
                    {
                        return uc.ClaimType == claim.Type;
                    }
                    return false;
                }).ToList())
                {
                    user.Claims.Remove(identityUserClaim);
                }
            }

            return Task.FromResult(0);
        }

        public Task<IList<TUser>> GetUsersForClaimAsync(Claim claim, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task SetEmailAsync(TUser user, string email, CancellationToken cancellationToken)
        {
            ThrowIfDisposed();
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }
            user.Email = email;
            return Task.FromResult(0);
        }

        public Task<string> GetEmailAsync(TUser user, CancellationToken cancellationToken)
        {
            ThrowIfDisposed();
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            return Task.FromResult(user.Email);
        }

        public Task<bool> GetEmailConfirmedAsync(TUser user, CancellationToken cancellationToken)
        {
            ThrowIfDisposed();
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }
            return Task.FromResult(user.EmailConfirmed);
        }

        public Task SetEmailConfirmedAsync(TUser user, bool confirmed, CancellationToken cancellationToken)
        {
            ThrowIfDisposed();
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }
            user.EmailConfirmed = confirmed;
            return Task.FromResult(0);
        }

        public Task<TUser> FindByEmailAsync(string normalizedEmail, CancellationToken cancellationToken)
        {
            ThrowIfDisposed();
            return GetUserAggregateAsync(u => u.Email.ToUpper() == normalizedEmail.ToUpper(),
                cancellationToken);
        }

        public Task<string> GetNormalizedEmailAsync(TUser user, CancellationToken cancellationToken)
        {
            ThrowIfDisposed();
            return Task.FromResult(user.Email);
        }

        public Task SetNormalizedEmailAsync(TUser user, string normalizedEmail, CancellationToken cancellationToken)
        {
            if (user == null) throw new ArgumentNullException(nameof(user));
            ThrowIfDisposed();
            user.Email = normalizedEmail;
            return Task.FromResult(0);
        }

        public Task AddLoginAsync(TUser user, UserLoginInfo login,
            CancellationToken cancellationToken)
        {
            ThrowIfDisposed();
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }
            if (login == null)
            {
                throw new ArgumentNullException(nameof(login));
            }

            user.Logins.Add(CreateIdentityUserLogin(login.ProviderKey, login.LoginProvider));
            return Task.Run(() => { Context.SaveOrUpdate(user); }, cancellationToken);
        }

        public Task<IdentityResult> CreateAsync(TUser user, CancellationToken cancellationToken)
        {
            ThrowIfDisposed();
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }
            return Task.Run(() =>
            {
                Context.Save(user);
                Context.Flush();
                return IdentityResult.Success;
            }, cancellationToken);
        }

        public Task<IdentityResult> DeleteAsync(TUser user, CancellationToken cancellationToken)
        {
            ThrowIfDisposed();
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            return Task.Run(() =>
            {
                Context.Save(user);
                Context.Flush();
                return IdentityResult.Success;
            }, cancellationToken);
        }

        public Task<TUser> FindByLoginAsync(string loginProvider,
            string providerKey,
            CancellationToken cancellationToken)
        {
            ThrowIfDisposed();
            if (loginProvider == null)
            {
                throw new ArgumentNullException(nameof(loginProvider));
            }

            var query = from u in Context.Query<TUser>()
                        from l in u.Logins
                        where l.LoginProvider == loginProvider
                              && l.ProviderKey == providerKey
                        select u;

            return Task.Run(() => query.SingleOrDefault(), cancellationToken);
        }


        public Task<TUser> FindByNameAsync(string normalizedUserName, CancellationToken cancellationToken)
        {
            ThrowIfDisposed();
            //return Task.FromResult<TUser>(Queryable.FirstOrDefault<TUser>(Queryable.Where<TUser>(this.Context.Query<TUser>(), (Expression<Func<TUser, bool>>)(u => u.UserName.ToUpper() == userName.ToUpper()))));
            return Task.Run(() =>
            {
                var normalUserNameProp = Projections.Property<TUser>(s => s.LoginId);
                var user = DetachedCriteria.For<TUser>()
                    .Add(Restrictions.Eq(normalUserNameProp, normalizedUserName).IgnoreCase())
                    .GetExecutableCriteria(Context).UniqueResult<TUser>();
                return user;
            });
        }

        public Task<IList<UserLoginInfo>>
            GetLoginsAsync(TUser user, CancellationToken cancellationToken)
        {
            ThrowIfDisposed();
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            return Task.Run(() =>
            {
                IList<UserLoginInfo> result = new List<UserLoginInfo>();
                foreach (var identityUserLogin in user.Logins)
                {
                    result.Add(new UserLoginInfo(identityUserLogin.LoginProvider, 
                        identityUserLogin.ProviderKey,
                        user.LoginId));
                }
                return result;
            }, cancellationToken);
        }

        public Task<string> GetNormalizedUserNameAsync(TUser user, CancellationToken cancellationToken)
        {
            ThrowIfDisposed();
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            return Task.Run(() =>
            {
                var result = user.LoginId;

                return result;
            }, cancellationToken);
        }

        public Task<string> GetUserIdAsync(TUser user, CancellationToken cancellationToken)
        {
            ThrowIfDisposed();
            return Task.FromResult(user?.Id.ToString());
        }

        public Task<string> GetUserNameAsync(TUser user, CancellationToken cancellationToken)
        {
            ThrowIfDisposed();
            return Task.FromResult(user.LoginId);
        }

        public Task RemoveLoginAsync(TUser user,
            string loginProvider, string providerKey,
            CancellationToken cancellationToken)
        {
            ThrowIfDisposed();
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }
            if (loginProvider == null)
            {
                throw new ArgumentNullException(nameof(loginProvider));
            }

            if (providerKey == null)
            {
                throw new ArgumentNullException(nameof(providerKey));
            }

            var info =
                user.Logins.SingleOrDefault(
                    x => x.LoginProvider == loginProvider && x.ProviderKey == providerKey);
            if (info != null)
            {
                user.Logins.Remove(info);
                Context.Update(user);
            }

            return Task.FromResult(0);
        }

        public Task SetNormalizedUserNameAsync(TUser user, string normalizedName, CancellationToken cancellationToken)
        {
            ThrowIfDisposed();
            if (user == null) throw new ArgumentNullException(nameof(user));
            user.LoginId = normalizedName;
            return Task.FromResult(0);
        }

        public Task SetUserNameAsync(TUser user, string userName,
            CancellationToken cancellationToken)
        {
            ThrowIfDisposed();
            if (user == null) throw new ArgumentNullException(nameof(user));
            user.LoginId = userName;
            return Task.FromResult(0);
        }

        public Task<IdentityResult> UpdateAsync(TUser user, CancellationToken cancellationToken)
        {
            ThrowIfDisposed();
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            return Task.Run(() =>
            {
                Context.Update(user);
                Context.Flush();
                return IdentityResult.Success;
            }, cancellationToken);
        }

        public Task<TUser> FindByIdAsync(string userId, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            ThrowIfDisposed();
            //return Task.FromResult(this.Context.Get<TUser>((object)userId));
            //return GetUserAggregateAsync(u => u.Id.Equals(userId), cancellationToken);
            return Task.Run(() =>
            {


                var id = Restrictions.Eq(Projections.Id(), userId);
                var c = DetachedCriteria.For<TUser>().Add(id)
                .GetExecutableCriteria(this.Context);
                return c.UniqueResult<TUser>();
            });

        }

        public Task SetPasswordHashAsync(TUser user, string passwordHash, CancellationToken cancellationToken)
        {
            ThrowIfDisposed();
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }
            user.PasswordHash = passwordHash;
            return Task.FromResult(0);
        }

        public Task<string> GetPasswordHashAsync(TUser user, CancellationToken cancellationToken)
        {
            ThrowIfDisposed();
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            return Task.FromResult(user.PasswordHash);
        }

        public Task<bool> HasPasswordAsync(TUser user, CancellationToken cancellationToken)
        {
            ThrowIfDisposed();
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }
            return Task.FromResult(user.PasswordHash != null);
        }

        public Task SetPhoneNumberAsync(TUser user, string phoneNumber, CancellationToken cancellationToken)
        {
            ThrowIfDisposed();
            if (user == null) throw new ArgumentNullException(nameof(user));
            if (phoneNumber == null) throw new ArgumentNullException(nameof(phoneNumber));

            user.PhoneNumber = phoneNumber;
            return Task.FromResult(0);
        }

        public Task<string> GetPhoneNumberAsync(TUser user, CancellationToken cancellationToken)
        {
            ThrowIfDisposed();
            if (user == null) throw new ArgumentNullException(nameof(user));

            return Task.FromResult(user.PhoneNumber);
        }

        public Task<bool> GetPhoneNumberConfirmedAsync(TUser user, CancellationToken cancellationToken)
        {
            ThrowIfDisposed();
            if (user == null) throw new ArgumentNullException(nameof(user));

            return Task.FromResult(user.PhoneNumberConfirmed);
        }

        public Task SetPhoneNumberConfirmedAsync(TUser user, bool confirmed, CancellationToken cancellationToken)
        {
            ThrowIfDisposed();
            if (user == null) throw new ArgumentNullException(nameof(user));

            user.PhoneNumberConfirmed = confirmed;
            return Task.FromResult(0);
        }

        public Task AddToRoleAsync(TUser user, string roleName, CancellationToken cancellationToken)
        {
            ThrowIfDisposed();
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }
            if (string.IsNullOrWhiteSpace(roleName))
            {
                throw new ArgumentException("role is emtpy", nameof(roleName));
            }
            return Task.Run(() =>
            {
                var identityRole =
                    Context.Query<TRole>().SingleOrDefault(r => r.Name.ToUpper() == roleName.ToUpper());
                if (identityRole == null)
                {
                    throw new InvalidOperationException(string.Format("Can't find the name " + roleName));
                }
                user.Roles.Add(identityRole);

                return Task.FromResult(0);
            }, cancellationToken);
        }

        public Task RemoveFromRoleAsync(TUser user, string roleName, CancellationToken cancellationToken)
        {
            ThrowIfDisposed();
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }
            if (string.IsNullOrWhiteSpace(roleName))
            {
                throw new ArgumentException("role is emtpy", nameof(roleName));
            }
            return Task.Run(() =>
            {
                var identityRole =
                    Context.Query<TRole>().SingleOrDefault(r => r.Name.ToUpper() == roleName.ToUpper());
                if (identityRole == null)
                {
                    throw new InvalidOperationException(string.Format("Can't find the name " + roleName));
                }
                user.Roles.Remove(identityRole);

                return Task.FromResult(0);
            }, cancellationToken);
        }

        public Task<IList<string>> GetRolesAsync(TUser user, CancellationToken cancellationToken)
        {
            ThrowIfDisposed();
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            return Task.Run(() => (IList<string>)user.Roles.Select(u => u.Name).ToList(), cancellationToken);
        }

        public Task<bool> IsInRoleAsync(TUser user, string roleName, CancellationToken cancellationToken)
        {
            ThrowIfDisposed();
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }
            if (string.IsNullOrWhiteSpace(roleName))
            {
                throw new ArgumentException("role is emtpy", nameof(roleName));
            }
            return Task.FromResult(user.Roles.Any(r => r.Name.ToUpper() == roleName.ToUpper()));
        }

        public Task<IList<TUser>> GetUsersInRoleAsync(string roleName, CancellationToken cancellationToken)
        {
            ThrowIfDisposed();
            if (string.IsNullOrWhiteSpace(roleName))
            {
                throw new ArgumentException("role is emtpy", nameof(roleName));
            }

            return Task.Run(() => DetachedCriteria.For<TUser>()
                .CreateCriteria("Roles")
                .Add(Restrictions.Eq("Name", roleName).IgnoreCase())
                .GetExecutableCriteria(Context).List<TUser>(), cancellationToken);
        }

        public Task SetSecurityStampAsync(TUser user, string stamp, CancellationToken cancellationToken)
        {
            ThrowIfDisposed();
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }
            user.SecurityStamp = stamp;
            return Task.FromResult(0);
        }

        public Task<string> GetSecurityStampAsync(TUser user, CancellationToken cancellationToken)
        {
            ThrowIfDisposed();
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }
            return Task.FromResult(user.SecurityStamp);
        }

        protected IdentityUserClaim CreateUserClaim(TUser user, Claim claim)
        {
            var r = new IdentityUserClaim();
            r.InitializeFromClaim(claim);
            return r;
        }

        protected IdentityUserLogin CreateIdentityUserLogin(string providerKey, string loginProvider)
        {
            return new IdentityUserLogin
            {
                LoginProvider = loginProvider,
                ProviderKey = providerKey
            };
        }

        private Task<TUser> GetUserAggregateAsync(Expression<Func<TUser, bool>> filter,
            CancellationToken cancellationToken)
        {
            return Task.Run(() =>
            {
                // no cartesian product, batch call. Don't know if it's really needed: should we eager load or let lazy loading do its stuff?
                var query = Context.Query<TUser>().Where(filter);
                return query.ToFuture().FirstOrDefault();
            }, cancellationToken);
        }

        public Task<DateTimeOffset?> GetLockoutEndDateAsync(TUser user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.LockoutEnd);
        }

        public Task SetLockoutEndDateAsync(TUser user, DateTimeOffset? lockoutEnd, CancellationToken cancellationToken)
        {
            user.LockoutEnd = lockoutEnd;
            return Task.Run(() =>
            {
                this.SaveOrUpdate(user);

            }, cancellationToken);
        }

        public Task<int> IncrementAccessFailedCountAsync(TUser user, CancellationToken cancellationToken)
        {
            user.AccessFailedCount++;
            return Task.Run(() =>
            {
                this.SaveOrUpdate(user);
                return user.AccessFailedCount;
            }, cancellationToken);
        }

        public Task ResetAccessFailedCountAsync(TUser user, CancellationToken cancellationToken)
        {


            user.LockoutEnabled = false;
            user.AccessFailedCount = 0;
            return Task.Run(() =>
            {
                this.SaveOrUpdate(user);
            }, cancellationToken);
        }

        public Task<int> GetAccessFailedCountAsync(TUser user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.AccessFailedCount);

        }

        public Task<bool> GetLockoutEnabledAsync(TUser user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.LockoutEnabled);
        }

        public Task SetLockoutEnabledAsync(TUser user, bool enabled, CancellationToken cancellationToken)
        {
            user.LockoutEnabled = enabled;
            return Task.Run(() =>
            {
                this.SaveOrUpdate(user);

            }, cancellationToken);
        }
    }
}