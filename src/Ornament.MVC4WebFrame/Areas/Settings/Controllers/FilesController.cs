using System.IO;
using System.Web.Mvc;

using ElFinder;
using Ornament.MemberShip.Dao;
using Ornament.Web;
using Qi;
using Qi.IO;

namespace Ornament.MVCWebFrame.Areas.Settings.Controllers
{
    /// <summary>
    ///     For elfinder 用于管理Elfinder文件controller
    /// </summary>
    [Authorize]
    public class FilesController : Controller
    {
        private readonly IMemberShipFactory _factory;

        private Connector _connector;

        public FilesController(IMemberShipFactory factory)
        {
            _factory = factory;
        }

        public Connector Connector
        {
            get
            {
                DirectoryInfo uploadFolder = OrnamentContext.Configuration.ApplicationSetting.UploadFilesFolder;
                if (_connector == null)
                {
                    var driver = new FileSystemDriver();
                    var thumbsStorage = new DirectoryInfo(Path.Combine(uploadFolder.FullName, "_Thumbnails"));
                    if (!thumbsStorage.Exists)
                    {
                        thumbsStorage.CreateEx();
                    }
                    if (IsAdmin())
                    {
                        driver.AddRoot(
                            new Root(new DirectoryInfo(ApplicationHelper.PhysicalApplicationPath.TrimEnd('\\')))
                                {
                                    Alias = "Site",
                                    IsLocked = true,
                                    IsReadOnly = true,
                                    IsShowOnly = true,
                                    ThumbnailsStorage = thumbsStorage,
                                    ThumbnailsUrl = "Thumbnails/"
                                });
                    }
                    var privateFolder =
                        new DirectoryInfo(Path.Combine(uploadFolder.FullName,
                                                       OrnamentContext.MemberShip.CurrentUser().LoginId));

                    if (!privateFolder.Exists)
                        IoExtender.CreateDirectories(privateFolder.FullName);

                    var privateThumbsStorage = new DirectoryInfo(Path.Combine(privateFolder.FullName, "_Thumbnails"));
                    if (!privateThumbsStorage.Exists)
                    {
                        privateThumbsStorage.CreateEx();
                    }
                    driver.AddRoot(new Root(privateFolder, "/Files/")
                        {
                            Alias = "My documents",
                            StartPath = privateFolder,
                            ThumbnailsStorage = privateThumbsStorage,
                            MaxUploadSizeInMb = 2.2,
                            ThumbnailsUrl = "Thumbnails/"
                        });
                    _connector = new Connector(driver);
                }
                return _connector;
            }
        }

        public bool IsAdmin()
        {
            return OrnamentContext.MemberShip.CurrentUser().InRole(OrnamentContext.MemberShip.RoleAdmin);
        }

        public ActionResult Index()
        {
            return Connector.Process(HttpContext.Request);
        }

        public ActionResult SelectFile(string target)
        {
            return Json(Connector.GetFileByHash(target).FullName);
        }

        public ActionResult Thumbs(string tmb)
        {
            return Connector.GetThumbnail(Request, Response, tmb);
        }
    }
}