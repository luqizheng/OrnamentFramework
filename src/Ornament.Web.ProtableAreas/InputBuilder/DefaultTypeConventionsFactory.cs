using System.Collections.Generic;
using Ornament.Web.PortableAreas.InputBuilder.Conventions.Type;

namespace Ornament.Web.PortableAreas.InputBuilder
{
    public class DefaultTypeConventionsFactory : List<ITypeViewModelFactory>
    {
        public DefaultTypeConventionsFactory()
        {
            Add(new DefaultTypeViewModelFactoryConvention());
        }
    }
}