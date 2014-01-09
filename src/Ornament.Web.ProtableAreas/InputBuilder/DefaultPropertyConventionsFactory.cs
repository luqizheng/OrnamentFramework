using System.Collections.Generic;
using Ornament.Web.PortableAreas.InputBuilder.Conventions.Property;

namespace Ornament.Web.PortableAreas.InputBuilder
{
	public class DefaultPropertyConventionsFactory : List<IPropertyViewModelFactory>
	{
		public DefaultPropertyConventionsFactory()
		{
			Add(new ArrayPropertyConvention());
			Add(new GuidPropertyConvention());
			Add(new EnumPropertyConvention());
			Add(new DateTimePropertyConvention());
			Add(new DefaultPropertyConvention());
		}
	}
}