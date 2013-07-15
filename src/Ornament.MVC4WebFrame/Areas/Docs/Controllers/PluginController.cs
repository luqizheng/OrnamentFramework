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
       
        public ActionResult DatePicker()
        {

            return View(new DateTimePickerModel());
        }
      
        public ActionResult BaseType()
        {
            var a = new BaseTypeModel();
            return View(a);
        }
    }
}