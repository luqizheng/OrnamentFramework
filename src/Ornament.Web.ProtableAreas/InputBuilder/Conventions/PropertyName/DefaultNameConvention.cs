using System.Reflection;

namespace Ornament.Web.PortableAreas.InputBuilder.Conventions.PropertyName
{
	public class DefaultNameConvention : IPropertyViewModelNameConvention
	{
		public virtual string PropertyName(PropertyInfo propertyInfo)
		{
			return propertyInfo.Name;
		}
	}
}