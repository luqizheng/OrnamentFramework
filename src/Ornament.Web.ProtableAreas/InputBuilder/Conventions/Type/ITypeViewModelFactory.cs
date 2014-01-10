using Ornament.Web.PortableAreas.InputBuilder.Views;

namespace Ornament.Web.PortableAreas.InputBuilder.Conventions.Type
{
    public interface ITypeViewModelFactory
    {
        bool CanHandle(System.Type type);
        TypeViewModel Create(System.Type type);
    }
}