using System;
using System.Web.Http;
using System.Web.UI.WebControls;
using Ornament.Files.Dao;
using Qi.Web.Http;

namespace Ornament.Files.Plugin.Api
{
    [ApiSession]
    public class UploadFilesController : ApiController
    {
        private readonly IFileDaoFactory _fileDaoFactory;

        public UploadFilesController(IFileDaoFactory fileDaoFactory)
        {
            _fileDaoFactory = fileDaoFactory;
        }

        //
        // GET: /UploadFiles/
        [HttpGet]
        public System.Collections.Generic.IEnumerable<FileRecord> Index(FileRecordSearcher search)
        {
            int total;
            return _fileDaoFactory.CreateFileDao().Find(search.Name, search.PageIndex.Value, search.PageSize.Value, out total);
        }
    }

    public class FileRecordSearcher
    {
        private int? _pageIndex;
        private int? _pageSize;
        public string Name { get; set; }
        public string SignCode { get; set; }

        public int? PageSize
        {
            get
            {
                if (_pageSize == null)
                    _pageSize = 40;
                if (_pageSize > 100)
                {
                    _pageSize = 100;
                }
                return _pageSize;
            }
            set { _pageSize = value; }
        }

        public int? PageIndex
        {
            get { return _pageIndex ?? 0; }
            set { _pageIndex = value; }
        }
    }
}