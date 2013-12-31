using System;
using MvcContrib.UI.InputBuilder.Views;
using Ornament.Web.PortableAreas.InputBuilder.Views;

namespace MvcContrib.UI.InputBuilder.InputSpecification
{
	public interface ITypeViewModelFactory {
		bool CanHandle(Type type);
		TypeViewModel Create(Type type);
	}
}