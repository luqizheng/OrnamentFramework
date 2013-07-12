using System;
using System.Collections;
using System.Collections.Generic;
using FluentNHibernate.Mapping;
using NHibernate.Collection;
using NHibernate.Collection.Generic;
using NHibernate.Engine;
using NHibernate.Persister.Collection;
using NHibernate.UserTypes;

namespace Ornament.MemberShip.Dao.NHibernateImple.Mappings
{
    public class OrgMapping : SubclassMap<Org>
    {
        public OrgMapping()
        {
            Extends(typeof (IPerformer));
            DiscriminatorValue("org");
            Join("MBS_ORG",_=>
            {
                _.KeyColumn("Id");
                _.Map(s => s.OrderId).Length(4000);
                _.HasMany(s => s.Childs).CollectionType<OrgListType>()
                                      .Access.ReadOnlyPropertyThroughCamelCaseField(Prefix.Underscore);

                _.References(s => s.Parent);
            });
            
        }

        public class OrgListPersistent : PersistentGenericSet<Org>, IOrgCollection
        {
            public OrgListPersistent(ISessionImplementor session)
                : base(session)
            {
            }

            public OrgListPersistent(ISessionImplementor session, OrgCollection list)
                : base(session, list)
            {
            }

            public Org Parent { get; set; }

            public void ResetOrderId()
            {
                foreach (Org c in this)
                {
                    SetOrderId(Parent, c);
                }
            }

            private void SetOrderId(Org parent, Org newChild)
            {
                if (String.IsNullOrEmpty(parent.OrderId))
                    newChild.OrderId = parent.Id;
                else
                    newChild.OrderId = parent.OrderId + "." + parent.Id;
            }
        }

        public class OrgListType : IUserCollectionType
        {
            public IPersistentCollection Instantiate(ISessionImplementor session, ICollectionPersister persister)
            {
                return new OrgListPersistent(session);
            }

            public IPersistentCollection Wrap(ISessionImplementor session, object collection)
            {
                return new OrgListPersistent(session, (OrgCollection) collection);
            }

            public IEnumerable GetElements(object collection)
            {
                return (OrgCollection) collection;
            }

            public bool Contains(object collection, object entity)
            {
                return ((OrgCollection) collection).Contains((Org) entity);
            }

            public object IndexOf(object collection, object entity)
            {
                throw new NotImplementedException();
            }

            public object ReplaceElements(object original, object target, ICollectionPersister persister, object owner,
                                          IDictionary copyCache, ISessionImplementor session)
            {
                var result = (OrgCollection) target;
                result.Clear();
                foreach (Org item in (IEnumerable<Org>) original)
                {
                    result.Add(item);
                }
                return result;
            }

            public object Instantiate(int anticipatedSize)
            {
                return new OrgCollection();
            }
        }
    }
}