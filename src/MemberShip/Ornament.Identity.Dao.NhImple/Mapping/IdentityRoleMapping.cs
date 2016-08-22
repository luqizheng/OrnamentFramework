﻿using System;
using FluentNHibernate.Mapping;

namespace Ornament.Identity.Dao.NhImple.Mapping
{
    public abstract class IdentityRoleMapping<TRole, TKey> : ClassMap<TRole>
        where TRole : IdentityRole<TKey>
        where TKey : IEquatable<TKey>
    {
        protected IdentityRoleMapping()
        {
            Table("mbs_roles");
            Map(x => x.Name).Unique().Length(255).Not.Nullable();

            Map(x => x.Remark).Length(255);

            ExtendSetting();
        }

        public abstract void ExtendSetting();
    }
}