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

        public FileRecord(string fileFullPath, User creator, string showName)
        {
            if (!File.Exists(fileFullPath))
            {
                throw new FileNotFoundException(fileFullPath);
            }

            Creator = creator;
            SignCode = Sign(fileFullPath);
            CreateTime = DateTime.Now;
            Name = showName;
            this.FullPath = fileFullPath;
        }

        public FileRecord(string fileFullPath, User creator)
            : this(fileFullPath, creator, (new FileInfo(fileFullPath).Name))
        {
        }

        /// <summary>
        ///     文件名字。会吧FullPath中的文件，按照这个文件输出。
        /// </summary>
        public virtual string Name { get; set; }

        /// <summary>
        ///     创建时间。
        /// </summary>
        public virtual DateTime? CreateTime { get; set; }

        /// <summary>
        ///     创建人
        /// </summary>
        public virtual User Creator { get; set; }

        /// <summary>
        ///     Md5 文件内容签名
        /// </summary>
        public virtual string SignCode { get; protected set; }

        /// <summary>
        ///     并不保存扩展名
        /// </summary>
        public virtual string FullPath { get; set; }

        /// <summary>
        ///     md5
        /// </summary>
        /// <param name="file"></param>
        /// <returns></returns>
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