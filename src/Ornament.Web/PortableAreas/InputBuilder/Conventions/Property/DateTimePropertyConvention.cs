using System;
using System.Reflection;
using Ornament.Web.PortableAreas.InputBuilder.Views;

namespace Ornament.Web.PortableAreas.InputBuilder.Conventions.Property
{
	public class DateTimePropertyConvention : DefaultPropertyConvention
	{
		public override bool CanHandle(PropertyInfo propertyInfo)
		{
			return propertyInfo.PropertyType == typeof(DateTime);
		}

		public override PropertyViewModel CreateViewModel<T>()
		{
			return new PropertyViewModel<DateTime> {};
		}
	}
}