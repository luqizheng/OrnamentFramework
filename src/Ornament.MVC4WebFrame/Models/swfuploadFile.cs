using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Ornament.MVCWebFrame.Models
{
    public class SwfuploadFile
    {
        public SwfuploadFile()
        {
            this.FileSizeKB = 1024;
        }
        public int FileSizeKB { get; set; }

        public string UploadFileUrl { get; set; }

        public string UploadSuccessCallbackFuncName { get; set; }
    }
}