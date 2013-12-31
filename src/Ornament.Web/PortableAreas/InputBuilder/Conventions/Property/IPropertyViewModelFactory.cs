using System.Reflection;
using Ornament.Web.PortableAreas.InputBuilder.InputSpecification;
using Ornament.Web.PortableAreas.InputBuilder.Views;

namespace Ornament.Web.PortableAreas.InputBuilder.Conventions.Property
{
    public interface IPropertyViewModelFactory
    {
        bool CanHandle(PropertyInfo propertyInfo);
        PropertyViewModel Create(PropertyInfo propertyInfo, object model, string name, System.Type type);
    }

    public interface IRequireViewModelFactory
    {
        void Set(IViewModelFactory factory);
    }
}