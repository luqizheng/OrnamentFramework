using System;
using FluentNHibernate.Mapping;

namespace Ornament.Identity.Dao.Mapping
{
    public abstract class IdentityUserMaping<TUser, TKey, TUserClaim, TUserRole, TUserLogin>
        : ClassMap<TUser>
        where TUser : IdentityUser<TKey, TUserClaim, TUserRole, TUserLogin>
        where TKey : IEquatable<TKey>
        where TUserClaim : IdentityUserClaim<TKey>
        where TUserRole : IdentityUserRole<TKey>
        where TUserLogin : IdentityUserLogin<TKey>
    {
        protected IdentityUserMaping()
        {
            Table("mbs_user");

            IdSetting();

            Map(x => x.AccessFailedCount);

            Map(x => x.Email);

            Map(x => x.NormalizedEmail);

            Map(x => x.EmailConfirmed);

            Map(x => x.LockoutEnabled);

            Map(x => x.LockoutEnd);

            Map(x => x.PasswordHash);

            Map(x => x.PhoneNumber);

            Map(x => x.PhoneNumberConfirmed);

            Map(x => x.TwoFactorEnabled);

            Map(x => x.NormalizedUserName).Length(64);

            Map(x => x.UserName).Unique().Not.Nullable().Length(64);

            Map(x => x.SecurityStamp);

            HasMany(x => x.Claims).Cascade.DeleteOrphan().Cascade.All()
                .Table("mbs_user_claims")
                .Component(x =>
                {
                    x.Map(_ => _.ClaimType).Length(64);
                    x.Map(_ => _.ClaimValue).Length(64);
                });

            HasMany(x => x.Logins)
                .Table("mbs_user_Logins")
                .Component(x =>
                {
                    x.Map(a => a.LoginProvider).Length(64);
                    x.Map(a => a.ProviderDisplayName).Length(64);
                    x.Map(a => a.ProviderKey).Length(32);
                });

            HasManyToMany(x => x.Roles)
                .Table("mbs_user_roles")
                .ParentKeyColumn("UserId");
        }

        protected abstract void IdSetting();
    }
}