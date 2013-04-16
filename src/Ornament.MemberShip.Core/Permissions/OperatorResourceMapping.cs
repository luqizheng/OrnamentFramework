using System;
using System.Collections.Generic;

namespace Ornament.MemberShip.Permissions
{
    /// <summary>
    ///     Defined which resource has thire operator.
    /// </summary>
    public class OperatorResourceMapping
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
        /// 
        /// </summary>
        private NHibernateResourceManager NHibernateResourceManager
        {
            get { return _nhResourceManager; }
        }
        /// <summary>
        /// 
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
        ///     Get the operatorType use the resourceType.
        /// </summary>
        /// <param name="resourceType"></param>
        /// <returns></returns>
        /// <exception cref="NotFoundOperatorTypeException"></exception>
        public Type this[object resourceType]
        {
            get
            {
                if (resourceType == null)
                    throw new ArgumentNullException("resourceType");
                Type result;
                if (resourceType is string)
                    result = TypeResourcesOperator.GetOperatorType(resourceType.ToString());
                else
                    result = NHibernateResourceManager.GetOperatorType(resourceType.GetType());
                if (result == null)
                    throw new NotFoundOperatorTypeException(resourceType.GetType());
                return result;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="resType"></param>
        /// <returns></returns>
        public Type GetOperator(Type resType)
        {
            return NHibernateResourceManager.GetOperatorType(resType);
        }

        /// <summary>
        /// </summary>
        /// <param name="resources"></param>
        /// <returns></returns>
        public Type GetOperator(string resources)
        {
            return TypeResourcesOperator.GetOperatorType(resources);
        }

        public OperatorResourceMapping Add(string resource, Type operatorType)
        {
            this.TypeResourcesOperator.Add(resource, operatorType);
            return this;
        }
    }
}