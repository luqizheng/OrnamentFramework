using System;
using Qi.Domain;

namespace Ornament.Files.FieldSettings
{
    public class FieldSetting : DomainObject<FieldSetting, int>
    {
        public virtual string Name { get; set; }

        public virtual string GetValue(object obj)
        {
            
        }
    }
}