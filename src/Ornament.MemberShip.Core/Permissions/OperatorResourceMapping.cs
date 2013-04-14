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

        /// <summary>
        ///     Key is operator Type, value is the resource's type.
        /// </summary>
        private readonly Dictionary<Type, Type> _operatorResourceTypeMapping = new Dictionary<Type, Type>();


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
            get { return this.TypeResourcesOperator.Resources; }
        }
        /// <summary>
        ///     Get the operatorType use the resourceType.
        /// </summary>
        /// <param name="resourceType"></param>
        /// <returns></returns>
        /// <exception cref="NotFindOperatorTypeException"></exception>
        public Type this[object resourceType]
        {
            get
            {
                if (resourceType == null)
                    throw new ArgumentNullException("resourceType");
                Type result;
                if (resourceType is string)
                    result = TypeResourcesOperator[resourceType.ToString()];
                else
                    result = NHibernateResourceOperator[resourceType.GetType()];
                if (result == null)
                    throw new NotFindOperatorTypeException(resourceType.GetType());
                return result;
            }
        }


        /// <summary>
        /// </summary>
        /// <param name="operatorVal"></param>
        /// <returns></returns>
        /// <exception cref="NotFindResourceDefinedException">if can't find resource which has this operator.</exception>
        public Type GetResource(Enum operatorVal)
        {
            if (_operatorResourceTypeMapping.Count == 0)
            {
                lock (_operatorResourceTypeMapping)
                {
                    foreach (Type key in ResourceMapping.Keys)
                    {
                        _operatorResourceTypeMapping.Add(ResourceMapping[key], key);
                    }
                }
            }
            Type type = operatorVal.GetType();
            if (_operatorResourceTypeMapping.ContainsKey(type))
            {
                return _operatorResourceTypeMapping[type];
            }
            throw new NotFindResourceDefinedException(type);
        }
    }
}