using System;

namespace Ornament.Web.InputBuilder.Attributes
{
    public class DisplayOrderAttribute : Attribute
    {
        public DisplayOrderAttribute(int order)
        {
            Order = order;
        }

        public int Order { get; set; }
    }
}