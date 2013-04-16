using System;
using System.Collections.Generic;

namespace Ornament.MemberShip.Permissions
{
    /// <summary>
    ///     Defined which resource has thire operator.
    /// </summary>
    public class OperatorResourceMapping
    {
        private readonly NHibernateResourceOperator _nResourceOperator = new NHibernateResourceOperator();

        private readonly TypeResourceOperatorMapping _typeResourcesOperator = new TypeResourceOperatorMapping();

        /// <summary>
        ///     Key is the resourceType, value is operator Type,
        /// </summary>
        public Dictionary<Type, Type> ResourceMapping { get; set; }

        /// <summary>
        ///     Key is the resource, value is operatorType;
        /// </summary>
        private TypeResourceOperatorMapping TypeResourcesOperator
        {
            get { return _typeResourcesOperator; }
        }

        private NHibernateResourceOperator NHibernateResourceOperator
        {
            get { return _nResourceOperator; }
        }

        public string[] AllTypeResource
        {
            get { return TypeResourcesOperator.Resources; }
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
                    result = NHibernateResourceOperator.GetOperatorType(resourceType.GetType());
                if (result == null)
                    throw new NotFoundOperatorTypeException(resourceType.GetType());
                return result;
            }
        }


        public Type GetOperator(Type resType)
        {
            return NHibernateResourceOperator.GetOperatorType(resType);
        }

        /// <summary>
        /// </summary>
        /// <param name="typeResources"></param>
        /// <returns></returns>
        public Type GetOperator(string typeResources)
        {
            return TypeResourcesOperator.GetOperatorType(typeResources);
        }

        public OperatorResourceMapping Add(string user, Type operatorType)
        {
            this.TypeResourcesOperator.Add(user, operatorType);
            return this;
        }
    }
}