using FluentNHibernate.Mapping;

namespace Ornament.Files.Dao.Mapping
{
    public class FileRecordMapping : ClassMap<FileRecord>
    {
        public FileRecordMapping()
        {
            Table("Files_FileRecord");
            Id(s => s.Id).GeneratedBy.UuidHex("N").Length(32);
            Map(s => s.Name);
            Map(s => s.FullPath);
            Map(s => s.CreateTime).Index("idx_createTime").Not.Update();
            Map(s => s.SignCode).Index("idx_signCode").Not.Update();

            References(s => s.Creator).ForeignKey("fr_creator_userFK");
        }
    }
}