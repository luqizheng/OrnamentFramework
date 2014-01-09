using System.ComponentModel.DataAnnotations;

namespace Ornament.Web.PortableAreas.InputBuilder.Attributes
{
	public class PartialViewAttribute : UIHintAttribute
	{
		public PartialViewAttribute(string partialView) : base(partialView)
		{
			PartialView = partialView;
		}

		public string PartialView { get; private set; }
	}
}