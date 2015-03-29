using System.IO;
using System.Web;
using System.Web.Mvc;
using Ornament.Files.Dao;
using Ornament.Web.MemberShips;
using Qi.IO;
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
        /// <summary>
        /// 上传的文件，其中sampleFile 是和 Dto一样的
        /// </summary>
        /// <param name="sampleFile"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult UploadFile(HttpPostedFileBase sampleFile, string id)
        {
            if (sampleFile == null)
                return Json(new { errorMessage = "upload file is null" });
            FileManager fileManager = new FileManager(_daoFactory);
            var serverPath = Request.MapPath("/files/sampleFile/") + sampleFile.FileName;

            var file = (new FileInfo(serverPath));
            if (file.Exists)
            {
                file.Delete();
            }
            else
            {
                file.Directory.CreateEx();
            }

            sampleFile.SaveAs(serverPath);

            var fileRecor = fileManager.SaveFileRecord(serverPath, sampleFile.FileName, OrnamentContext.MemberShip.CurrentUser(), id);
            return Json(new { fileName = fileRecor.Name, Id = fileRecor.Id });

        }
    }
}