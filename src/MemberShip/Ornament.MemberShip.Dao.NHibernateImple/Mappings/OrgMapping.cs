﻿using System;
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
            Join("MBS_ORG", _ =>
            {
                _.KeyColumn("Id");
                _.Map(s => s.OrderId).Length(4000).Access.CamelCaseField(Prefix.Underscore);
                ;
                _.HasMany(s => s.Childs)
                    .CollectionType<OrgListType>().KeyColumn("OrgParentId").Cascade.Delete();


                _.References(s => s.Parent).Column("OrgParentId").ForeignKey("OrgParentFK");
            });
        }

        public class OrgListPersistent : PersistentGenericSet<Org>, IOrgCollection
        {
            private readonly OrgCollection _list;
            private Org _self;

            public OrgListPersistent(ISessionImplementor session)
                : base(session)
            {
            }

            public OrgListPersistent(ISessionImplementor session, OrgCollection list)
                : base(session, list)
            {
                _list = list;
            }

            public Org Self
            {
                get
                {
                    if (_list != null)
                        return _list.Self;
                    return _self;
                }
                set
                {
                    _self = value;
                    if (_list != null)
                    {
                        _list.Self = value;
                    }
                }
            }

            public void ResetOrderId()
            {
                if (Self == null)
                    return;
                foreach (object c in this)
                {
                    SetOrderId(Self, (Org) c);
                }
            }

            public override void BeforeInitialize(ICollectionPersister persister, int anticipatedSize)
            {
                base.BeforeInitialize(persister, anticipatedSize);
                
                var d = this as IOrgCollection;
                d.Self = Self;
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
                ICollectionPersister s = persister;
                return new OrgListPersistent(session);
            }

            public IPersistentCollection Wrap(ISessionImplementor session, object collection)
            {
                return new OrgListPersistent(session, (OrgCollection) collection);
            }

            public IEnumerable GetElements(object collection)
            {
                return (IOrgCollection) collection;
            }

            public bool Contains(object collection, object entity)
            {
                return ((IOrgCollection) collection).Contains((Org) entity);
            }

            public object IndexOf(object collection, object entity)
            {
                throw new NotImplementedException();
            }

            public object ReplaceElements(object original, object target, ICollectionPersister persister, object owner,
                IDictionary copyCache, ISessionImplementor session)
            {
                var result = (IOrgCollection) target;
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