using System.Configuration;
using System.Web;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;

namespace Ornament.Web
{
    /// <summary>
    /// </summary>
    public class OrnamentContext : Context
    {
        public static readonly OrnamentContext Current = new OrnamentContext();

        private OrnamentContext()
        {

        }
        public string SupportEmail { get { return ConfigurationManager.AppSettings["SupportEmail"]; } }
        /// <summary>
        /// 
        /// </summary>
        public override User CurrentUser
        {
            get
            {
                if (HttpContext.Current == null || HttpContext.Current.User == null ||
                    !HttpContext.Current.User.Identity.IsAuthenticated)
                    return null;
                IUserDao a = GetDaoFactory<IMemberShipFactory>().CreateUserDao();
                User user = a.GetByLoginId(HttpContext.Current.User.Identity.Name);
                if (user != null)
                {
                    base.CurrentUser = user;
                }
                return base.CurrentUser;
            }
        }


        /// <summary>
        /// 
        /// </summary>
        public static ResourceDescriptionManager Configuration
        {
            get { return Inner.Instance.GetContainer().Resolve<ResourceDescriptionManager>("Configuration"); }
        }
    }
}