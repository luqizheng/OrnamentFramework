using System.Web.Mvc;
using Ornament.Files.Dao;
using Ornament.Web.MemberShips;
using Qi.Web.Mvc;

namespace Ornament.Files.Plugin.Areas.Files.Controllers
{
    [Session]
    public class SettingController : Controller
    {
        private readonly IFileDaoFactory _daoFactory;

        public SettingController(IFileDaoFactory daoFactory)
        {
            _daoFactory = daoFactory;
        }

        //
        // GET: /Files/Setting/
        [OrnamentMvcSiteMapNode(Title = "$resources:membership.sitemap,userListTitle",
            ParentKey = "System", Key = "FileFormatSetting", Order = 1)
        ]
        public ActionResult Index()
        {
            return View(_daoFactory.CreateFileFormatSettingDao().GetAll());
        }

        [OrnamentMvcSiteMapNode(Title = "$resources:membership.sitemap,userListTitle",
            ParentKey = "FileFormatSetting", Key = "Modify_FileFormatSetting", Order = 1)
        ]
        public ActionResult Edit(int? id)
        {
            if (id == null)
                return View();
            return View(_daoFactory.CreateFileFormatSettingDao().Get(id.Value));
        }
    }
}