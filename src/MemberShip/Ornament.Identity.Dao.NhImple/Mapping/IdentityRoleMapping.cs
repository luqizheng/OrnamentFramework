using System;
using System.Linq.Expressions;
using FluentNHibernate.Conventions.Inspections;
using FluentNHibernate.Mapping;
using NHibernate.Type;
using Ornament.NHibernate;

namespace Ornament.Identity.Dao.Mapping
{
    public abstract class IdentityRoleMapping<T, TId> : ClassMap<T> where T : IdentityRole<TId>
    {
        protected IdentityRoleMapping(string table = "orn_mbs_roles")
        {
            Table(table);
            Map(x => x.Name).Unique().Length(255).Not.Nullable();
            Identity(this.Id);
        }

        protected abstract void Identity(Func<Expression<Func<T, object>>, IdentityPart> id);




    }
}