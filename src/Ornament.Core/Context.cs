using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Castle.MicroKernel.Registration;
using Castle.Windsor;
using Castle.Windsor.Configuration.Interpreters;
using FluentNHibernate.Cfg;
using Ornament.Configurations;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.MemberShipProviders;
using Ornament.MemberShip.Permissions;

namespace Ornament
{
    public class Context
    {
        static Context()
        {
            
            Inner.Instance.GetContainer()
                .Register(Component.For<OperatorResourceMapping>());
        
        }
        protected Context()
        {
        }
        
        private static ApplicationSetting _setting;
        public static ApplicationSetting Setting
        {
            get { return _setting ?? (_setting = new ApplicationSetting()); }
        }
        private IList<Assembly> _hhAssemblies;
        private IList<Type> _nhTyhpes;
        /// <summary>
        ///     获取当前用户
        /// </summary>
        public virtual User CurrentUser { get; protected set; }
        /// <summary>
        /// 
        /// </summary>
        public virtual IMemberShipProvider MemberShipContext
        {
            get { return MembershipContext.Provider; }
        }
        /// <summary>
        /// 
        /// </summary>
        public IWindsorContainer Container
        {
            get { return Inner.Instance.GetContainer(); }
        }
        /// <summary>
        /// 
        /// </summary>
        public IList<Assembly> NhAssemblies { get { return _hhAssemblies ?? (_hhAssemblies = new List<Assembly>()); } }
        /// <summary>
        /// 
        /// </summary>
        public IList<Type> NHTypes { get { return _nhTyhpes ?? (_nhTyhpes = new List<Type>()); } }
        /// <summary>
        /// 
        /// </summary>
        public static OperatorResourceMapping OperatorResourceManager
        {
            get { return Inner.Instance.GetContainer().Resolve<OperatorResourceMapping>(); }
        }

        /// <summary>
        ///     检查当前用户是否有资源的操作权限
        /// </summary>
        /// <param name="resType">资源类型</param>
        /// <param name="id">资源的Id</param>
        /// <param name="operator">操作</param>
        /// <returns>有操作权限返回true，否则返回false</returns>
        /// <exception cref="OrnamentException">通过资源Id，无法找到资源的时候，就会发出这个异常</exception>
        /// <remarks>
        /// </remarks>
        public bool HasRight(Type resType, string id, Enum @operator)
        {
            var membershipFactory = GetDaoFactory<IMemberShipFactory>();
            object res;
            try
            {
                res = membershipFactory.CreateResourceDao().Load(resType, id);
            }
            catch (Exception ex)
            {
                throw new OrnamentException(String.Format("Can't find the resource {0}, id={1}", resType.FullName, id),
                                            ex);
            }
            return HasRight(res, @operator);
        }

        /// <summary>
        /// </summary>
        /// <param name="resource"></param>
        /// <param name="operators"></param>
        /// <returns></returns>
        public bool HasRight(object resource, Enum operators)
        {
            if (resource == null)
                throw new ArgumentNullException("resource");
            if (CurrentUser == null)
                return false;
            if (Convert.ToInt32(operators) == 0)
                return false;
            if (CurrentUser.LoginId == User.AdminLoginId)
                return true;
            IPermissionDao permissionDao = GetDaoFactory<IMemberShipFactory>().CreatePermissionDao();
            IList<Permission> permissions = permissionDao.GetUserPermissions(CurrentUser.LoginId, resource);
            return
                permissions.Any(permission => permission.Resource.Equals(resource) && permission.HasOperator(operators));
        }

        /// <summary>
        /// </summary>
        /// <param name="resType"></param>
        /// <param name="id"></param>
        /// <param name="operator"></param>
        /// <returns></returns>
        public bool HasRight(Type resType, object id, Enum @operator)
        {
            if (CurrentUser.LoginId == User.AdminLoginId)
                return true;
            var membershipFactory = GetDaoFactory<IMemberShipFactory>();
            object res;
            try
            {
                res = membershipFactory.CreateResourceDao().Load(resType, id);
            }
            catch (Exception ex)
            {
                throw new OrnamentException(String.Format("Can't find the resource {0}, id={1}", resType.FullName, id),
                                            ex);
            }
            return HasRight(res, @operator);
        }


        /// <summary>
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        public T GetDaoFactory<T>()
        {
            return Inner.Instance.GetContainer().Resolve<T>();
        }

        /// <summary>
        ///     根据resource获取operator's type
        /// </summary>
        /// <param name="resource"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentNullException">resource is null </exception>
        public static Type GetOperatorType(object resource)
        {
            if (resource == null)
                throw new ArgumentNullException("resource");
            OperatorResourceMapping mapping = OperatorResourceManager;

            var typeRes = resource as string;
            if (typeRes != null)
                return mapping.GetOperator(typeRes);
            return mapping.GetOperator(resource.GetType());
        }

        /// <summary>
        /// </summary>
        /// <returns></returns>
        public static string[] GetTypeResource()
        {
            var mapping = Inner.Instance.GetContainer().Resolve<OperatorResourceMapping>();
            return mapping.AllTypeResource;
        }

        /// <summary>
        /// </summary>
        /// <param name="resourceType"></param>
        /// <param name="operatorVal"></param>
        /// <returns></returns>
        public bool ExistPermission(Type resourceType, Enum operatorVal)
        {
            if (resourceType == null)
                throw new ArgumentNullException("resourceType");
            if (operatorVal == null)
                throw new ArgumentNullException("operatorVal");
            if (CurrentUser == null)
                throw new MemberShipException("Please login.");
            if (CurrentUser.LoginId == User.AdminLoginId)
                return true;
            IPermissionDao permissionDao = GetDaoFactory<IMemberShipFactory>().CreatePermissionDao();
            IList<Permission> permissions = permissionDao.GetUserPermissions(CurrentUser.LoginId, resourceType);
            return permissions.Any(permission => permission.Resource.Equals(resourceType)
                                                 && permission.HasOperator(operatorVal));
        }

        #region Nested type: Inner

        /// <summary>
        /// </summary>
        protected class Inner
        {
            // ReSharper disable MemberHidesStaticFromOuterClass
            public static readonly Inner Instance = new Inner();
            // ReSharper restore MemberHidesStaticFromOuterClass
            private readonly WindsorContainer _container;

            private Inner()
            {
                _container = new WindsorContainer(new XmlInterpreter());
            }

            public IWindsorContainer GetContainer()
            {
                return _container;
            }
        }

        #endregion
    }
}