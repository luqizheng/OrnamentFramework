using System.IO;
using Qi;

namespace Ornament.Web.Bundles
{
    public class SeajsModual
    {
        
        private readonly string _requirePath;
        private string _id;
        /// <summary>
        /// 
        /// </summary>
        /// <param name="requirePath"></param>
        /// <param name="combinPath"></param>
        public SeajsModual(string requirePath, string combinPath)
        {
            _requirePath = requirePath;
            CombinePath = combinPath;
        }
        public string CombinePath { get; set; }
        public string Id
        {
            get
            {
                if (_id == null)
                {
                    if (IsCombine)
                    {
                        int post = _requirePath.LastIndexOf('/')+1;
                        Id = _requirePath.Substring(post);
                    }
                    else
                    {
                        Id = _requirePath;
                    }
                }
                return _id;
            }
            set { _id = value; }
        }

        public string PhysicPath
        {
            get
            {
                return ApplicationHelper.MapPath(_requirePath);
            }
        }

        public string Content
        {
            get
            {
                if (IsCombine)
                {
                    using (var reader = new StreamReader(PhysicPath))
                    {
                        return reader.ReadToEnd();
                    }
                }
                return "";
            }
        }

        /// <summary>
        ///     是否合并。
        /// </summary>
        public bool IsCombine
        {
            get { return _requirePath.StartsWith(CombinePath); }
        }
    }
}