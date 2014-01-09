using System.Reflection;

namespace Ornament.Web.PortableAreas.InputBuilder.Conventions.PropertyName
{
	public interface IPropertyViewModelNameConvention
	{
		string PropertyName(PropertyInfo propertyInfo);
	}
}