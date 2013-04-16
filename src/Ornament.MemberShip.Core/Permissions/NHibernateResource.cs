using System;
using System.Collections.Generic;

namespace Ornament.MemberShip.Permissions
{
    public class NHibernateResourceOperator : IResourceOperatorManager<Type>
    {
        private const string NHProxyType =
            "{0}Proxy, {0}ProxyAssembly, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null";

        private readonly TypeResourceOperatorMapping _typeMapping = new TypeResourceOperatorMapping();

        /// <summary>
        ///     Key is the actual type, and the the value is the prosxytyp.
        /// </summary>
        /// <returns></returns>
        private readonly IDictionary<string, Type> _proxyTypeAndActualTypeMapping = new Dictionary<string, Type>();

        public Type GetOperatorType(Type res)
        {
            string key = string.Format(NHProxyType, res.Name);
            return _typeMapping.GetOperatorType(key);
        }

        public IResourceOperatorManager<Type> Add(Type resourceInstance, Type enumType)
        {

            string key = string.Format(NHProxyType, resourceInstance.Name);
            _typeMapping.Add(key, enumType);
            _proxyTypeAndActualTypeMapping.Add(key, resourceInstance);
            return this;
        }

        public Type GetResourceByType(Type operatorType)
        {
            string proxyName = _typeMapping.GetResourceByType(operatorType);
            return _proxyTypeAndActualTypeMapping[proxyName];
        }
    }
}