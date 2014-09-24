using Ornament.Web.InputBuilder.Attributes;
using Ornament.Web.PortableAreas.InputBuilder.Conventions.Property;
using Ornament.Web.PortableAreas.InputBuilder.Helpers;
using Ornament.Web.PortableAreas.InputBuilder.Views;

namespace Ornament.Web.PortableAreas.InputBuilder.Conventions.Type
{
    public class DefaultTypeViewModelFactoryConvention : ITypeViewModelFactory
    {
        public bool CanHandle(System.Type type)
        {
            return true;
        }

        public TypeViewModel Create(System.Type type)
        {
            return new TypeViewModel
            {
                Label = LabelForTypeConvention(type),
                PartialName = "Form",
                Type = type,
            };
        }

        public string LabelForTypeConvention(System.Type type)
        {
            if (type.AttributeExists<LabelAttribute>())
            {
                return type.GetAttribute<LabelAttribute>().Label;
            }
            return type.Name.ToSeparatedWords();
        }
    }
}