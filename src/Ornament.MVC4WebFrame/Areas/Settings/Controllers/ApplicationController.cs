using System.Configuration;
using System.Linq;
using System.Web.Configuration;
using System.Web.Mvc;
using System.Web.Security;
using Ornament.MVCWebFrame.Models.DataInit;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.Web;
using Ornament.Web.MemberShips;
using Ornament.Web.Models;
using Qi.Web.Mvc;

namespace Ornament.MVCWebFrame.Areas.Settings.Controllers
{
    [Session]
    [Authorize(Roles = "admin")]
    public class ApplicationController : Controller
    {
        //
        // GET: /System/Application/

        public ActionResult Index()
        {
            return View();
        }

        //
        // GET: /Settings/Init/
        public ActionResult DatabaseInit()
        {
            var initializer = GlobalInitializer.GetContainer().Resolve<IDataInitializer>("MembershipInit") as MembershipInit;
            if (initializer == null)
            {
                throw new OrnamentException("Can't find the MembershipInit.");
            }
            var data = new InitData();
            return View(data);
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult DatabaseInit(InitData data)
        {
            if (ModelState.IsValid)
            {
                var globalInitializer = new GlobalInitializer();
                globalInitializer.BuildData();
                return View("Success", (object)"Database initializatio is successful.");
            }
            return View(data);
        }

        public ActionResult ResetPasswrodFormat()
        {
            return View(Membership.Provider.PasswordFormat);
        }

        // I think use hash is better than another, so comment following code.
        //[AcceptVerbs(HttpVerbs.Post)]
        //public ActionResult ResetPasswrodFormat(MembershipPasswordFormat format)
        //{
        //    MembershipPasswordFormat srcSetting = Membership.Provider.PasswordFormat;
        //    if (srcSetting != format)
        //    {
        //        Configuration config = WebConfigurationManager.OpenWebConfiguration("~");
        //        var memberShip = (MembershipSection)config.GetSection("system.web/membership");
        //        string name = memberShip.DefaultProvider;
        //        ProviderSettings s = memberShip.Providers[name];
        //        s.Parameters.Add("passwordFormat", format.ToString());
        //        config.Save();

        //        var privider = Membership.Provider as MemberShipProvider;
        //        if (privider == null)
        //        {
        //            throw new MemberShipException("Ornament only support provider " +
        //                                          typeof(MemberShipProvider).FullName);
        //        }

        //        //Reset all user's Password
        //        IQueryable<User> allUsers =
        //            from user in OrnamentContext.Current.GetDaoFactory<IMemberShipFactory>().Users
        //            select user;
        //        bool srcFormatIsHashed = srcSetting != MembershipPasswordFormat.Hashed;
        //        foreach (User user in allUsers)
        //        {
        //            string newPassword = srcFormatIsHashed
        //                                     ? Membership.GeneratePassword(6, 1)
        //                                     : privider.DecodeString(user.Password, srcSetting);
        //            user.ChangePassword(privider.EncodeString(newPassword, format));
        //        }
        //    }
        //    return View("Success", (object)"Switch password's format is success.");
        //}

        public ActionResult Success(string messages)
        {
            return View(messages);
        }
    }
}