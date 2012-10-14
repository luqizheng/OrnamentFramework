using System;
using System.Collections.Generic;

namespace Ornament.MemberShip.Permissions
{
    /// <summary>
    /// Defined which resource has thire operator.
    /// </summary>
    public class OperatorResourceMapping
    {
        private const string NHProxyType =
            "{0}Proxy, {0}ProxyAssembly, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null";


        /// <summary>
        /// Key is operator Type, value is the resource's type.
        /// </summary>
        private readonly Dictionary<Type, Type> _operatorResourceTypeMapping = new Dictionary<Type, Type>();

        private readonly Dictionary<Type, string> _operatorTypeResourceMap
            = new Dictionary<Type, string>();

        private Dictionary<string, Type> _resourceMappingProxy;


        /// <summary>
        /// Key is the resourceType, value is operator Type,
        /// </summary>
        public Dictionary<Type, Type> ResourceMapping { get; set; }

        /// <summary>
        /// Key is the resource, value is operatorType;
        /// </summary>
        public Dictionary<string, Type> TypeResourceMapping { get; set; }

        /// <summary>
        /// Gets mapping of nhibernate proxy type, It's count should be same as <see cref="ResourceMapping"/>
        /// </summary>
        private Dictionary<string, Type> ResourceMappingProxy
        {
            get { return _resourceMappingProxy ?? (_resourceMappingProxy = new Dictionary<string, Type>()); }
        }
        /// <summary>
        /// Get the operatorType use the resourceType.
        /// </summary>
        /// <param name="resourceType"></param>
        /// <returns></returns>
        /// <exception cref="NotFindOperatorTypeException"></exception>
        public Type this[Type resourceType]
        {
            get
            {
                if (resourceType == null)
                    throw new ArgumentNullException("resourceType");

                if (ResourceMapping.ContainsKey(resourceType))
                {
                    return ResourceMapping[resourceType];
                }

                if (!ResourceMappingProxy.ContainsKey(resourceType.AssemblyQualifiedName))
                {
                    lock (_resourceMappingProxy)
                    {
                        BuildTheProxyMapping();
                    }
                }

                if (ResourceMappingProxy.ContainsKey(resourceType.AssemblyQualifiedName))
                {
                    return ResourceMappingProxy[resourceType.AssemblyQualifiedName];
                }

                throw new NotFindOperatorTypeException(resourceType);
            }
        }

        /// <summary>
        /// Gets operator type from type resource.
        /// </summary>
        /// <param name="resourceKey"> type resource, such as user, role.</param>
        /// <returns></returns>
        public Type this[string resourceKey]
        {
            get { return TypeResourceMapping[resourceKey]; }
        }

        /// <summary>
        /// 根据Operator 获取类型资源。
        /// </summary>
        /// <param name="operator"></param>
        /// <returns></returns>
        /// <exception cref="NotFindResourceDefinedException">Can't </exception>
        public string GetTypeResource(Enum @operator)
        {
            if (_operatorTypeResourceMap.Count == 0)
            {
                lock (_operatorTypeResourceMap)
                {
                    if (_operatorTypeResourceMap.Count == 0)
                    {
                        foreach (string key in TypeResourceMapping.Keys)
                        {
                            _operatorTypeResourceMap.Add(this[key], key);
                        }
                    }
                }
            }
            if (_operatorTypeResourceMap.ContainsKey(@operator.GetType()))
                return _operatorTypeResourceMap[@operator.GetType()];
            throw new NotFindResourceDefinedException(@operator.GetType());
        }

        /// <summary>
        /// 
        /// </summary>
        private void BuildTheProxyMapping()
        {
            foreach (Type key in ResourceMapping.Keys)
            {
                string proxyTypeName = String.Format(NHProxyType, key.Name);
                if (!ResourceMappingProxy.ContainsKey(proxyTypeName))
                {
                    ResourceMappingProxy.Add(String.Format(NHProxyType, key.Name), ResourceMapping[key]);
                }
            }
        }
        /// <summary>
        /// 
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