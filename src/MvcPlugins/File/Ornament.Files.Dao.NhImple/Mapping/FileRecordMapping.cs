using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentNHibernate.Mapping;

namespace Ornament.Files.Dao.Mapping
{
    public class FileRecordMapping:ClassMap<FileRecord>
    {
        public FileRecordMapping()
        {
            this.Table("Files_FileRecord");
            this.Id(s => s.Id).GeneratedBy.UuidHex("N").Length(32);
            this.Map(s => s.Name);
            this.Map(s => s.FullPath);
            this.Map(s => s.CreateTime).Unique().Index("idx_createTime").Not.Update();
            this.Map(s => s.SignCode).Unique().Index("idx_signCode").Not.Update();

            this.References(s => s.Creator).ForeignKey("fr_creator_userFK");
        }
    }
}
