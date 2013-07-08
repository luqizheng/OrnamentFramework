using System;
using System.Collections.Generic;
using System.Linq;

namespace Ornament.MemberShip.Permissions
{
    /// <summary>
    /// </summary>
    public class NHibernateResourceManager : IResourceOperatorManager<Type>
    {
        private const string NHProxyType =
            "{0}Proxy, {0}ProxyAssembly, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null";

        /// <summary>
        ///     Key is the actual type, and the the value is the prosxytyp.
        /// </summary>
        /// <returns></returns>
        private readonly IDictionary<string, Type> _proxyTypeAndActualTypeMapping = new Dictionary<string, Type>();

        private readonly TypeResourceManager _typeMapping = new TypeResourceManager();

        /// <summary>
        /// </summary>
        public Type[] Resources
        {
            get { return _proxyTypeAndActualTypeMapping.Values.ToArray(); }
        }

        /// <summary>
        /// </summary>
        /// <param name="res"></param>
        /// <returns></returns>
        /// <exception cref="NotFoundOperatorTypeException">Can't find the res type.</exception>
        public Type GetOperatorType(Type res)
        {
            try
            {
                if (res == null)
                    throw new ArgumentNullException("res");
                string key = res.Assembly.FullName.Contains("ProxyAssembly")
                                 ? res.AssemblyQualifiedName
                                 : string.Format(NHProxyType, res.Name);
                return _typeMapping.GetOperatorType(key);
            }
            catch (NotFoundOperatorTypeException ex)
            {
                throw new NotFoundOperatorTypeException(res, ex);
            }
        }

        /// <summary>
        /// </summary>
        /// <param name="mappingClass"></param>
        /// <param name="enumType"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentNullException">mappingClass is null or enumType is null</exception>
        public IResourceOperatorManager<Type> Add(Type mappingClass, Type enumType)
        {
            if (mappingClass == null)
                throw new ArgumentNullException("mappingClass");
            if (enumType == null)
                throw new ArgumentNullException("enumType");
            string key = string.Format(NHProxyType, mappingClass.Name);
            _typeMapping.Add(key, enumType);
            _proxyTypeAndActualTypeMapping.Add(key, mappingClass);
            return this;
        }

        /// <summary>
        /// </summary>
        /// <param name="operatorType"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentNullException">operatorType is null</exception>
        public Type GetResource(Type operatorType)
        {
            if (operatorType == null)
                throw new ArgumentNullException("operatorType");
            string proxyName = _typeMapping.GetResource(operatorType);
            return _proxyTypeAndActualTypeMapping[proxyName];
        }
    }
}