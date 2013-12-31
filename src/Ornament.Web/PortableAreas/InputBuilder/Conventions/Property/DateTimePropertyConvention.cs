using System;
using System.Reflection;
using MvcContrib.UI.InputBuilder.Views;
using Ornament.Web.PortableAreas.InputBuilder.Conventions.Property;

namespace MvcContrib.UI.InputBuilder.Conventions
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