using System.Web.Mvc;

namespace Friends.Areas.Friends
{
    public class FriendsAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Friends";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "Friends_default",
                "Friends/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
