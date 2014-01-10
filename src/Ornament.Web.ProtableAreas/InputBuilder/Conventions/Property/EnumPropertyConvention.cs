using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web.Mvc;
using Ornament.Web.PortableAreas.InputBuilder.Views;

namespace Ornament.Web.PortableAreas.InputBuilder.Conventions.Property
{
    public class EnumPropertyConvention : DefaultPropertyConvention
    {
        public override bool CanHandle(PropertyInfo propertyInfo)
        {
            return propertyInfo.PropertyType.IsEnum;
        }

        public override PropertyViewModel Create(PropertyInfo propertyInfo, object model, string name, System.Type type)
        {
            object value = base.ValueFromModelPropertyConvention(propertyInfo, model, name);

            SelectListItem[] selectListItems = Enum.GetNames(propertyInfo.PropertyType).Select(
                s => new SelectListItem {Text = s, Value = s, Selected = s == value.ToString()}).ToArray();

            PropertyViewModel viewModel = base.Create(propertyInfo, model, name, type);
            viewModel.Value = selectListItems;
            viewModel.PartialName = "Enum";

            return viewModel;
        }

        public override PropertyViewModel CreateViewModel<T>()
        {
            return new PropertyViewModel<IEnumerable<SelectListItem>>();
        }
    }
}