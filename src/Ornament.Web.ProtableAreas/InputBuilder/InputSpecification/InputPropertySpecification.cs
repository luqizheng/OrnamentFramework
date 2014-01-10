using System;
using System.Web.Mvc;
using Ornament.Web.PortableAreas.InputBuilder.InputSpecification;
using Ornament.Web.PortableAreas.InputBuilder.Views;

namespace Ornament.Web.InputBuilder.InputSpecification
{
    public class InputPropertySpecification : IInputSpecification<PropertyViewModel>, IInputSpecification<TypeViewModel>
    {
        public Func<HtmlHelper, PropertyViewModel, string> Render =
            (helper, model) =>
            {
                helper.RenderPartial(model.PartialName, model, model.Layout);
                return "";
            };

        public HtmlHelper HtmlHelper { get; set; }


        public PropertyViewModel Model { get; set; }


        TypeViewModel IInputSpecification<TypeViewModel>.Model
        {
            get { return Model; }
        }

        public override string ToString()
        {
            return Render(HtmlHelper, Model);
        }
    }
}