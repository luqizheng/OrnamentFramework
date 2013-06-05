using System;
using System.Collections.Generic;
using System.Linq;
using Castle.Core.Resource;

namespace Ornament.Web
{
    /// <summary>
    /// 
    /// </summary>
    public class ResourceDescriptionManager
    {
        private const string NhProxyType =
            "{0}Proxy, {0}ProxyAssembly, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null";

        private readonly IList<ResourceDescription> _resourcesSelector;

        public ResourceDescriptionManager()
        {
            _resourcesSelector = new List<ResourceDescription>();
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="resources"></param>
        /// <exception cref="ArgumentNullException">resources is null</exception>
        public ResourceDescriptionManager(IList<ResourceDescription> resources)
        {
            if (resources == null)
                throw new ArgumentNullException("resources");
            _resourcesSelector = resources;
        }

        /// <summary>
        /// 
        /// </summary>
        public IList<ResourceDescription> ResourceSettings
        {
            get { return _resourcesSelector; }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="name">name of the resource descript.</param>
        /// <returns></returns>
        /// <exception cref="ResourceException">Can not find ResourceDescription</exception>
        public ResourceDescription Get(string name)
        {
            ResourceDescription result = (from a in ResourceSettings where a.Name == name select a).FirstOrDefault();
            if (result == null)
                throw new ResourceException(String.Format("can't find the {0} from setting.", name));
            return result;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="valueOfResource"></param>
        /// <exception cref="ArgumentNullException">valueOfResource is null</exception>
        /// <returns></returns>
        public ResourceDescription GetResourceSettingByType(Type valueOfResource)
        {
            if (valueOfResource == null)
                throw new ArgumentNullException("valueOfResource");
            foreach (ResourceDescription resDesc in _resourcesSelector)
            {
                if (resDesc.ValueType == valueOfResource ||
                    valueOfResource.AssemblyQualifiedName == String.Format(NhProxyType, resDesc.ValueType.Name))
                    return resDesc;
            }

            throw new ResourceException(string.Format("cant' find the Type of {0} setting infromation",
                                                                valueOfResource.FullName));
        }
    }
}