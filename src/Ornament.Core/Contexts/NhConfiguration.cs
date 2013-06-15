using System;
using System.Collections.Generic;
using System.Reflection;

namespace Ornament.Contexts
{
    public class NhConfiguration
    {
        private IList<Assembly> _hhAssemblies;
        private IList<Type> _nhTyhpes;

        /// <summary>
        /// </summary>
        public IList<Assembly> NhAssemblies
        {
            get { return _hhAssemblies ?? (_hhAssemblies = new List<Assembly>()); }
        }

        /// <summary>
        /// </summary>
        public IList<Type> NHTypes
        {
            get { return _nhTyhpes ?? (_nhTyhpes = new List<Type>()); }
        }
    }
}