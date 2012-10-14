using System;
using System.IO;
using Ornament.Messages.Contents;
using Qi;

namespace Ornament.Messages.Stores
{
    public class FileStore : Store
    {
        private readonly string _parentPath;

        protected FileStore()
        {
            Name = "File";
        }

        /// <summary>
        /// 
        /// </summary>
        public FileStore(string mainFolder) : this()
        {
            _parentPath = ApplicationHelper.MapPath(mainFolder);
            _parentPath = Path.Combine(_parentPath, "Data");

            if (!Directory.Exists(_parentPath))
            {
                Directory.CreateDirectory(_parentPath);
            }
        }


        public override void Write(Content content, Message message)
        {
            string filePath = Path.Combine(_parentPath, message.Id);
            if (!Directory.Exists(filePath))
            {
                Directory.CreateDirectory(filePath);
            }

            string file = String.Format("content{0}.txt", content.Language);
            using (var w = new StreamWriter(Path.Combine(filePath, file)))
            {
                w.Write(content.Value);
            }
        }

        public override object ReadIn(Content content, Message message)
        {
            string filePath = Path.Combine(_parentPath, message.Id);
            if (!Directory.Exists(filePath))
            {
                Directory.CreateDirectory(filePath);
            }

            string file = String.Format("content{0}.txt", content.Language);
            using (var w = new StreamReader(Path.Combine(filePath, file)))
            {
                return w.ReadToEnd();
            }
        }


        public override void Delete(Content content, Message message)
        {
            string filePath = Path.Combine(_parentPath, message.Id);
            if (Directory.Exists(filePath))
            {
                Directory.Delete(filePath, true);
            }
        }
    }
}