using System;
using FluentNHibernate.Mapping;
using System.Linq.Expressions;

namespace Ornament.Identity.Dao.Mapping
{
    public class IdentityUserMaping<T> : ClassMap<IdentityUser<T>>
    {
        public IdentityUserMaping(string tableName = "orn_AspNetUsers")
        {
            Table(tableName);
            Id(x => x.Id).GeneratedBy.UuidHex("N");

            Map(x => x.AccessFailedCount);

            Map(x => x.Email);

            Map(x => x.NormalizedEmail);

            Map(x => x.EmailConfirmed);

            Map(x => x.LockoutEnabled);

            Map(x => x.LockoutEndDateUtc);

            Map(x => x.PasswordHash);

            Map(x => x.PhoneNumber);

            Map(x => x.PhoneNumberConfirmed);

            Map(x => x.TwoFactorEnabled);

            Map(x => x.NormalizedUserName).Length(64);

            Map(x => x.UserName).Unique().Not.Nullable().Length(64);

            Map(x => x.SecurityStamp);

            HasMany(x => x.Claims).Cascade.DeleteOrphan().Cascade.All()
                .Table("orn_AspNetUserClaims")
                .Component(x =>
                {
                    x.Map(_ => _.ClaimType).Length(64);
                    x.Map(_ => _.ClaimValue).Length(64);
                });

            HasMany(x => x.Logins)
                .Table("orn_AspNetUserLogins")
                .Component(x =>
                {
                    x.Map(a => a.LoginProvider).Length(64);
                    x.Map(a => a.ProviderDisplayName).Length(64);
                    x.Map(a => a.ProviderKey).Length(32);
                });

            HasManyToMany(x => x.Roles)
                .Table("orn_AspNetUserRoles")
                .ParentKeyColumn("UserId");
        }


        
    }
}