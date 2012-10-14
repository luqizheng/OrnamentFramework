using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Ornament.Web;
using Qi.Web;

namespace Ornament.MVCWebFrame.Controllers
{
    [Authorize]
    public class FileManagerController : Controller
    {
        ////
        //// GET: /FileManager/

        //public ActionResult Index(string id, string folder)
        //{
        //    var s = (id ?? OrnamentContext.Current.CurrentUser.LoginId);
        //}

        public ActionResult Index(string folder)
        {
            string phyPath =
                Path.Combine("~/Files", OrnamentContext.Current.CurrentUser.LoginId);
            var folderManager = new FolderManager(Request.MapPath(phyPath));
            var list = new ArrayList();
            foreach (OrnamentFolder dir in folderManager.ListFolder(folder ?? "/"))
            {
                if (dir.Name == "mini") //filte the mini folder.
                    continue;
                list.Add(new
                    {
                        alterImage = Url.Content("~/Images/FileTypes/Folder-Blank-icon.png"),
                        name = dir.Name,
                        file = false,
                        fullPath = dir.FullPath
                    });
            }

            foreach (OrnamentFile file in folderManager.List(folder ?? "/"))
            {
                list.Add(new
                    {
                        fullPath = file.FullPath,
                        alterImage = AlterImager(file.FullPath).Replace("\\", "/"),
                        name = file.Name,
                        file = true,
                    });
            }


            return Json(list, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="folder"></param>
        /// <returns></returns>
        public ActionResult CreateFolder(string folder)
        {
            var folderManager =
                new FolderManager(Request.MapPath(Path.Combine("~/Files", OrnamentContext.Current.CurrentUser.LoginId)));
            OrnamentFolder dir;
            var result = folderManager.CreateFolder(folder, out dir);
            var data = new
                {
                    alterImage = Url.Content("~/Images/FileTypes/Folder-Blank-icon.png"),
                    name = dir.Name,
                    file = false,
                    fullPath = dir.FullPath
                };
            if (result)
            {
                return Json(new { success = true, message = "Create success", data = data }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, message = "Was exist", data = data }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult Get(string filePath)
        {
            var folderManager =
                new FolderManager(Request.MapPath(Path.Combine("~/Files", OrnamentContext.Current.CurrentUser.LoginId)));
            FileInfo fileInfo = folderManager.GetFile(filePath);
            string contentType = FileTypeHelper.GetContentType(fileInfo.Name);
            if (fileInfo.Exists)
            {
                return File(fileInfo.OpenRead(), contentType, fileInfo.Name);
            }
            throw new HttpException(404, "can't find the " + filePath);
        }

        public ActionResult Download(string file)
        {
            var folderManager =
                new FolderManager(Request.MapPath(Path.Combine("~/Files", OrnamentContext.Current.CurrentUser.LoginId)));
            FileInfo fileInfo = folderManager.GetFile(file);
            //var contentType = FileTypeHelper.GetContentType(fileInfo.Name);
            if (fileInfo.Exists)
            {
                return File(fileInfo.OpenRead(), "application/octet-stream", fileInfo.Name);
            }
            throw new HttpException(404, "can't find the " + file);
        }

        public ActionResult Mini(string filePath)
        {
            var folderManager =
                new FolderManager(Request.MapPath(Path.Combine("~/Files", OrnamentContext.Current.CurrentUser.LoginId)));
            FileInfo fileInfo = folderManager.Resize(filePath, 32, 32);
            return File(fileInfo.OpenRead(), FileTypeHelper.GetContentType(fileInfo.Name), fileInfo.Name);
        }

        public ActionResult Save(string folder)
        {
            try
            {
                var folderManager =
                    new FolderManager(
                        Request.MapPath(Path.Combine("~/Files", OrnamentContext.Current.CurrentUser.LoginId)));
                string f = folderManager.SaveAs(Request.Files[0], folder);
                return Content(f);
            }
            catch (Exception ex)
            {
                throw new HttpException(500, ex.Message);
            }
        }

        public ActionResult Delete(string file)
        {
            var folderManager =
                new FolderManager(Request.MapPath(Path.Combine("~/Files", OrnamentContext.Current.CurrentUser.LoginId)));

            folderManager.Delete(file);

            return Json(new { success = true, message = "delete success" }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult DeleteFolder(string folder)
        {
            var folderManager =
                new FolderManager(Request.MapPath(Path.Combine("~/Files", OrnamentContext.Current.CurrentUser.LoginId)));
            try
            {
                folderManager.DeleteFolder(folder);

                return Json(new { success = true, message = "delete success" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        public string AlterImager(string name)
        {
            var f = new FileInfo(name);
            if ((".gif.jpeg.jpg.png").IndexOf(f.Extension.ToLower(), StringComparison.Ordinal) != -1)
                return Url.Action("Mini", new { filePath = name });
            ;
            string extentions = (new FileInfo(name)).Extension.Substring(1).ToLower();
            if (extentions == "jpg")
            {
                extentions = "jpeg";
            }
            var info = new DirectoryInfo(Request.MapPath("~/Images/FileTypes/"));
            IEnumerable<FileInfo> files = from file in info.GetFiles("*.png")
                                          where file.Name.ToLower().StartsWith(extentions)
                                          select file;
            if (files.Count() == 0)
            {
                return "/Images/FileTypes/unknow.png";
            }
            return files.First().FullName.Replace(Request.PhysicalApplicationPath, "/");
        }
    }
}