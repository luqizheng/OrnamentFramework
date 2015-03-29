using System;
using Ornament.Files.FieldSettings;

namespace Ornament.Files
{
    public class FieldSettingAttribute : Attribute
    {
        /// <summary>
        /// </summary>
        /// <param name="name">显示名称</param>
        public FieldSettingAttribute(string name)
        {
            if (String.IsNullOrEmpty(name))
                throw new ArgumentNullException("name");
            Name = name;
        }

        /// <summary>
        ///     显示名称
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        ///     创建FieldSetting
        /// </summary>
        /// <returns></returns>
        public FieldSetting GetFieldSetting()
        {
            return new FieldSetting
            {
                Name = Name
            };
        }
    }
}