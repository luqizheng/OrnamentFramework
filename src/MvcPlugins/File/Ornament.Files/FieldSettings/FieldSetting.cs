using Qi.Domain;

namespace Ornament.Files.FieldSettings
{
    public class FieldSetting : DomainObject<FieldSetting, int>
    {
        public virtual string Name { get; set; }
    }
}