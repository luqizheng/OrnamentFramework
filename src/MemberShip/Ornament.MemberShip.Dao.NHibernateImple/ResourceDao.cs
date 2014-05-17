using System;
using System.Collections.Generic;
using NHibernate;
using NHibernate.Criterion;
using NHibernate.Mapping;
using NHibernate.Metadata;
using NHibernate.Type;
using Ornament.MemberShip.Permissions;
using Qi.NHibernateExtender;
using Qi.NHibernateExtender.Criterion;

namespace Ornament.MemberShip.Dao.NHibernateImple
{
    public class ResourceDao : IResourceDao
    {
        protected ISession CurrentSession
        {
            get { return SessionManager.GetSessionWrapper().CurrentSession; }
        }

        #region IResourceDao Members

        public object Get(Type resourceType, string id)
        {
            if (resourceType == null)
                throw new ArgumentNullException("resourceType");
            if (id == null)
                throw new ArgumentNullException("id");
            if (typeof (string) == resourceType)
                return id;
            IType idType = GetIdType(resourceType);
            return Get(resourceType, ConvertIdFromStringValue(id, idType));
        }

        public object Get(Type resourceType, object id)
        {
            if (resourceType == null)
                throw new ArgumentNullException("resourceType");
            if (id == null)
                throw new ArgumentNullException("id");
            if (typeof (string) == resourceType)
                return id;
            return CurrentSession.Get(resourceType, id);
        }

        public object Load(Type resourceType, string id)
        {
            if (resourceType == null)
                throw new ArgumentNullException("resourceType");
            if (id == null)
                throw new ArgumentNullException("id");
            if (typeof (string) == resourceType)
                return id;

            IType idType = GetIdType(resourceType);
            return Load(resourceType, ConvertIdFromStringValue(id, idType));
        }

        public object Load(Type resourceType, object id)
        {
            if (resourceType == null)
                throw new ArgumentNullException("resourceType");
            if (id == null)
                throw new ArgumentNullException("id");
            return CurrentSession.Load(resourceType, id);
        }

        public object GetResourceByStringId(Type resource, string resId)
        {
            if (resource == typeof (string))
                return resId;
            IClassMetadata perisisteType = SessionManager.GetSessionWrapper()
                .SessionFactory.GetClassMetadata(resource);
            if (perisisteType == null)
                throw new OrnamentException("Resource type " + resource.GetType().Name +
                                            " is not belong to nhibernate mapping class");
            var identity = perisisteType.IdentifierType as PrimitiveType;
            object id;
            if (identity != null)
            {
                id = identity.FromStringValue(resId);
            }
            else
            {
                var emub = perisisteType.IdentifierType as ImmutableType;
                id = emub.FromStringValue(resId);
            }
            return CurrentSession.Get(resource, id);
        }

        public IList<T> FindResources<T>(User user, Enum @operator)
        {
            if (user.LoginId == User.AdminLoginId)
            {
                return CurrentSession.CreateCriteria(typeof (T)).List<T>();
            }

            DetachedCriteria userPermissionId =
                DetachedCriteria.For(typeof (User)).Add(Restrictions.Eq("LoginId", user.LoginId))
                    .CreateCriteria("Roles")
                    .CreateCriteria("Permissions", "permission")
                    .Add(BitwiseFlags.IsSet("Operator", Convert.ToInt32(@operator)))
                    .SetProjection(Projections.Distinct(Projections.Property("permission.Id")));

            DetachedCriteria orgPermissionId =
                DetachedCriteria.For<User>().Add(Restrictions.Eq("LoginId", user.LoginId))
                    .CreateCriteria("UserGroups", "ug")
                    .CreateCriteria("ug.Roles", "role")
                    .CreateCriteria("Permissions", "permission")
                    .Add(BitwiseFlags.IsSet("Operator", Convert.ToInt32(@operator)))
                    .SetProjection(Projections.Distinct(Projections.Property("permission.Id")));

            DetachedCriteria ugPermissionId =
                DetachedCriteria.For<User>().Add(Restrictions.Eq("LoginId", user.LoginId))
                    .CreateCriteria("UserGroups", "ug")
                    .CreateCriteria("ug.Roles", "role")
                    .CreateCriteria("Permissions", "permission")
                    .Add(BitwiseFlags.IsSet("Operator", Convert.ToInt32(@operator)))
                    .SetProjection(Projections.Distinct(Projections.Property("permission.Id")));

            return DetachedCriteria.For<GenericPermission<T>>()
                .Add(Restrictions.Disjunction()
                    .Add(Subqueries.PropertyIn("Id", userPermissionId))
                    .Add(Subqueries.PropertyIn("Id", orgPermissionId))
                    .Add(Subqueries.PropertyIn("Id", ugPermissionId))
                )
                .SetProjection(Projections.Property<GenericPermission<T>>(m => m.Resource))
                .GetExecutableCriteria(SessionManager.GetSessionWrapper().CurrentSession).List<T>();
        }

        #endregion

        private static object ConvertIdFromStringValue(string id, IType type)
        {
            var idType = type as NullableType;
            if (idType == null)
                throw new ApplicationException("Resource's Id only support mapping from  NullableType in nhibernate.");
            return idType.FromStringValue(id);
        }

        private IType GetIdType(Type resourceType)
        {
            IType idType = null;
            foreach (string key in SessionManager.SessionFactoryNames)
            {
                PersistentClass mappingClass =
                    SessionManager.GetSessionWrapperFactory(key).Configuration.GetClassMapping(resourceType);
                if (mappingClass != null)
                {
                    idType = mappingClass.Identifier.Type;
                    break;
                }
            }

            if (idType == null)
                throw new MemberShipException("can't find the " + resourceType.FullName +
                                              " in the mapping , resource tye should be a nhibernate mapping class or a string .");
            return idType;
        }
    }
}