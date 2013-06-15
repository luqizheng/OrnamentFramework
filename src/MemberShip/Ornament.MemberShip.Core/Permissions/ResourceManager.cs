using System;

namespace Ornament.MemberShip.Permissions
{
    /// <summary>
    ///     Defined which resource has thire operator.
    /// </summary>
    public class ResourceManager
    {
        private readonly NHibernateResourceManager _nhResourceManager = new NHibernateResourceManager();

        private readonly TypeResourceManager _typeResourcesOperator = new TypeResourceManager();

        /// <summary>
        ///     Key is the resource, value is operatorType;
        /// </summary>
        private TypeResourceManager TypeResourcesOperator
        {
            get { return _typeResourcesOperator; }
        }

        /// <summary>
        /// </summary>
        private NHibernateResourceManager NHibernateResourceManager
        {
            get { return _nhResourceManager; }
        }

        /// <summary>
        /// </summary>
        public string[] AllTypeResource
        {
            get { return TypeResourcesOperator.Resources; }
        }

        public Type[] AllNHibernateResources
        {
            get { return NHibernateResourceManager.Resources; }
        }


        /// <summary>
        /// </summary>
        /// <param name="resType"></param>
        /// <returns></returns>
        public Type GetOperator(Type resType)
        {
            if (resType == null)
                throw new ArgumentNullException("resType");
            return NHibernateResourceManager.GetOperatorType(resType);
        }

        /// <summary>
        ///     根据resource获取operator's type
        /// </summary>
        /// <param name="resource"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentNullException">resource is null </exception>
        public Type GetOperatorType(object resource)
        {
            if (resource == null)
                throw new ArgumentNullException("resource");

            var typeRes = resource as string;
            if (typeRes != null)
                return GetOperator(typeRes);
            return GetOperator(resource.GetType());
        }

        /// <summary>
        /// 根据资源获取资源的操作
        /// </summary>
        /// <param name="resources"></param>
        /// <returns></returns>
        public Type GetOperator(string resources)
        {
            return TypeResourcesOperator.GetOperatorType(resources);
        }
        /// <summary>
        /// 添加资源和资源操作
        /// </summary>
        /// <param name="resource"></param>
        /// <param name="operatorType"></param>
        /// <returns></returns>
        public ResourceManager Add(string resource, Type operatorType)
        {
            TypeResourcesOperator.Add(resource, operatorType);
            return this;
        }
    }
}