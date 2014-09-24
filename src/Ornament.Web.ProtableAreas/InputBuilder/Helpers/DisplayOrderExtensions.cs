using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Ornament.Web.InputBuilder.Attributes;
using Ornament.Web.PortableAreas.InputBuilder.Conventions.Property;

namespace Ornament.Web.PortableAreas.InputBuilder.Helpers
{
    public static class DisplayOrderExtensions
    {
        public static PropertyInfo[] ReOrderProperties(this PropertyInfo[] properties)
        {
            var orderableProperties = new Dictionary<int, PropertyInfo>();
            var nonOrderableProperties = new List<PropertyInfo>();

            foreach (PropertyInfo property in properties)
            {
                if (property.AttributeExists<DisplayOrderAttribute>())
                {
                    int order = property.GetAttribute<DisplayOrderAttribute>().Order;
                    orderableProperties.Add(order, property);
                }
                else
                {
                    nonOrderableProperties.Add(property);
                }
            }

            var result = new List<PropertyInfo>();

            foreach (var property in orderableProperties.OrderBy(x => x.Key).ToList())
            {
                result.Add(property.Value);
            }

            foreach (PropertyInfo property in nonOrderableProperties.ToList())
            {
                result.Add(property);
            }

            return result.ToArray();
        }
    }
}