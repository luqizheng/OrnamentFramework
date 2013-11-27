using System.Web.Mvc;
using MvcContrib.PortableAreas;

namespace Doc.Areas.Doc
{
    public class DocAreaRegistration : PortableAreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Doc";
            }
        }
        public override void RegisterArea(AreaRegistrationContext context, IApplicationBus bus)
        {
            context.MapRoute(
               "Doc_default",
               "Doc/{controller}/{action}/{id}",
               new { action = "Index", id = UrlParameter.Optional }
           );
        }

      
    }
}
