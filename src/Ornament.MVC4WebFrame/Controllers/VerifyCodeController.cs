using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;

using System.Web.Mvc;
using Ornament.Web.Models;
using Qi.Web.Mvc;

namespace Ornament.MVCWebFrame.Controllers
{
    
    public class VerifyCodeController : Controller
    {
        [Session()]
        public FileResult Index(int? fontSize)
        {
            var builder = new VerifyCodeBuilder();
            builder.FontSize = fontSize ?? 16;
            builder.EnableNoise = false;
            string code = builder.GenerateCode();
            Session["VerifyCode"] = code;
            Bitmap image = builder.CreateVerifyCodeImage(code);
            var stream = new MemoryStream();
            image.Save(stream, ImageFormat.Png);
            return File(stream.ToArray(), "image/png");
        }

    }
}
