using System;
using FluentNHibernate.Mapping;

namespace Ornament.Identity.Dao.Mapping
{
    //public class IdentityUserMapping :
    //    IdentityUserMapping<string,IdentityRole>
    //{

    //}

    //public class IdentityUserMapping<TKey,TRole>
    //    : IdentityUserMapping<IdentityUser<TKey, TRole>, TKey, TRole>
    //    where TKey : IEquatable<TKey>

    //{
    //}


    public abstract class IdentityUserMapping<TUser, TKey, TRole>
        : ClassMap<TUser>
        where TUser : IdentityUser<TKey, TRole>
        where TKey : IEquatable<TKey>


    {
        protected IdentityUserMapping()
        {
            Table("mbs_user");

            ExtendSetting();

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
                })
                .ForeignKeyConstraintName("FK_Cliaims_ID");

            HasMany(x => x.Logins)
                .Table("mbs_user_Logins")
                .Component(x =>
                {
                    x.Map(a => a.LoginProvider).Length(64);
                    x.Map(a => a.ProviderDisplayName).Length(64);
                    x.Map(a => a.ProviderKey).Length(32);
                }).ForeignKeyConstraintName("FK_User_Login_ID"); ;

            HasManyToMany(x => x.Roles)
                .Table("mbs_user_roles")
                .ParentKeyColumn("UserId")
                .ForeignKeyConstraintNames("FK_user_role_userId","FK_user_role_roleId");
        }

        protected abstract void ExtendSetting();
    }
}