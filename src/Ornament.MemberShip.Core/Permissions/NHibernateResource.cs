using System;

namespace Ornament.MemberShip.Permissions
{
    public class NHibernateResourceOperator : IResourceOperatorManager<Type>
    {
        private const string NHProxyType =
            "{0}Proxy, {0}ProxyAssembly, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null";

        private readonly TypeResourceOperatorMapping _typeMapping = new TypeResourceOperatorMapping();

        //public override ResourceOperatorManager<Type> Add(Type resourceInstance, Type enumType)
        //{

        //    return base.Add(resourceInstance, enumType);
        //}

        //public void AddTypes(Type resType, Type enumType)
        //{
        //    string proxyTypeName = String.Format(NHProxyType, resType.Name);
        //    _nhProxyTypeMapping.Add(proxyTypeName, enumType);
        //}
        ///// <summary>
        ///// Get the Operator
        ///// </summary>
        ///// <param name="resType"></param>
        ///// <returns></returns>
        //public Type this[Type resType]
        //{
        //    get
        //    {
        //        var key = String.Format(NHProxyType, resType.Name);
        //        if (_nhProxyTypeMapping.ContainsKey(key))
        //            return _nhProxyTypeMapping[key];
        //        return null;
        //    }
        //}
        public Type this[Type res]
        {
            get
            {
                string key = string.Format(NHProxyType, res.Name);
                return _typeMapping[key];
            }
        }

        public IResourceOperatorManager<Type> Add(Type resourceInstance, Type enumType)
        {
            string key = string.Format(NHProxyType, resourceInstance.Name);
            _typeMapping.Add(key, enumType);
            return this;
        }
    }
}