using System;
using System.Linq;
using System.Reflection;

namespace Ornament.Web.PortableAreas.InputBuilder.Conventions.Property
{
	public static class PropertyInfoExtensions
	{
		public static bool AttributeExists<T>(this PropertyInfo propertyInfo) where T : class
		{
			var attribute = propertyInfo.GetCustomAttributes(typeof(T), false)
			                	.FirstOrDefault() as T;
			if(attribute == null)
			{
				return false;
			}
			return true;
		}

		public static bool AttributeExists<T>(this System.Type type) where T : class
		{
			var attribute = type.GetCustomAttributes(typeof(T), false).FirstOrDefault() as T;
			if(attribute == null)
			{
				return false;
			}
			return true;
		}

        public static T GetAttribute<T>(this System.Type type) where T : class
		{
			return type.GetCustomAttributes(typeof(T), false).FirstOrDefault() as T;
		}

		public static T GetAttribute<T>(this PropertyInfo propertyInfo) where T : class
		{
			return propertyInfo.GetCustomAttributes(typeof(T), false).FirstOrDefault() as T;
		}
	}
}