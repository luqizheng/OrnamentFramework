using System.IO;
using System.Linq;
using System.Web.Mvc;
using Ornament.MVCWebFrame.Areas.Docs.Models;
using Qi.IO;

namespace Ornament.MVCWebFrame.Areas.Docs.Controllers
{
    [Authorize]
    public class PluginController : Controller
    {
        //
        // GET: /Sample/Plugin/

        public ActionResult FileManager()
        {
            return View();
        }
        public ActionResult DatePicker()
        {
            return View(new DateTimePickerModel());
        }
        public ActionResult UpliadFile()
        {
            return Content(Request.Files[0].FileName);
        }

        public ActionResult GetFiles(string dir)
        {
            var f = new DirectoryInfo(dir ?? "/");
            FileInfo[] files = f.GetFilesEx("*.jpg|*.jpeg|*.png|*.gif");
            var result = from file in files
                         select new
                             {
                                 name = file.Name,
                                 contentType = "image/" + file.Extension.Substring(1),
                                 url = Url.Content(Url.Content(dir + "/images"))
                             };
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public ActionResult Editor()
        {
            return View();
        }
    }
}