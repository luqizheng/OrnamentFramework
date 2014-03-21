using System;
using System.IO;
using System.Security.Cryptography;
using Ornament.MemberShip;
using Qi;
using Qi.Domain;

namespace Ornament.Files
{
    public class FileRecord : DomainObject<FileRecord, string>
    {
        protected FileRecord()
        {
        }

        public FileRecord(string filepath, User creator, string name)
        {
            if (File.Exists(filepath))
            {
                throw new FileNotFoundException(filepath);
            }

            Creator = creator;
            SignCode = Sign(filepath);
            CreateTime = DateTime.Now;
            this.Name = name;
        }

        public FileRecord(string filepath, User creator)
            : this(filepath, creator, (new FileInfo(filepath).Name))
        {
        }

        public virtual string Name { get; set; }
        public virtual DateTime? CreateTime { get; set; }
        public virtual User Creator { get; set; }
        public virtual string SignCode { get; protected set; }

        /// <summary>
        ///     并不保存扩展名
        /// </summary>
        public virtual string FullPath { get; set; }

        public static string Sign(string file)
        {
            using (FileStream reader = File.OpenRead(file))
            {
                return SignFile(reader);
            }
        }

        public static string SignFile(Stream stream)
        {
            HashAlgorithm algorithm;
            algorithm = MD5.Create();
            byte[] bytes = algorithm.ComputeHash(stream);
            return bytes.ToStringEx();
        }
    }
}